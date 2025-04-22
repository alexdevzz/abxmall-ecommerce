import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { MongoError } from 'mongodb'
import { Request } from 'express'

interface ErrorResponse {
  message: string | object
  timestamp: string
  statusCode: HttpStatus
  path: string
  error: string
}

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error: MongoError | HttpException | Error) => {
        let message = 'An error occurred while processing your request.'
        const ctx = context.switchToHttp()
        const request = ctx.getRequest<Request>()
        const path = request.url
        const timestamp = new Date().toISOString()

        // duplicate entity error ...
        if (this.isMongoDuplicateError(error)) {
          const key = this.extractDuplicateKey(error.message)
          message = `The value '${key.value}' already exists in the field '${key.field}'.`

          const errorResponse: ErrorResponse = {
            message,
            timestamp,
            statusCode: HttpStatus.BAD_REQUEST,
            path,
            error: 'Duplicate Key Error',
          }

          return throwError(() => new BadRequestException(errorResponse))
        }

        // if already is a HttpException ...
        if (error instanceof HttpException) {
          const errorResponse: ErrorResponse = {
            message: error.getResponse()['message'] ? error.getResponse()['message'] : (error.message ?? message),
            timestamp,
            statusCode: error.getStatus(),
            path,
            error: error.name ?? 'Undefined error',
          }
          return throwError(() => new HttpException(errorResponse, errorResponse.statusCode))
        }

        // generic error ...
        const errorResponse: ErrorResponse = {
          message: 'Internal server error',
          timestamp,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          path,
          error: 'Internal server error',
        }

        return throwError(() => new HttpException(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR))
      })
    )
  }

  private isMongoDuplicateError(error: any): boolean {
    return error instanceof MongoError && error.code === 11000
  }

  private extractDuplicateKey(errorMessage: string): { field: string; value: string } {
    const regex = /index: (.+?) dup key: { (.+?): "(.+?)" }/
    const matches = errorMessage.match(regex)
    if (matches && matches.length >= 4) {
      return {
        field: matches[2],
        value: matches[3],
      }
    }

    return { field: 'unknown', value: 'unknown' }
  }
}
