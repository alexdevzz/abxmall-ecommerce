import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Response as ResponseExpress, Request as RequestExpress } from 'express'
import { ResponseMetadataOptions } from '../decorators/response.decorator'

interface Response<T> {
  message: string
  timestamp: string
  statusCode: number
  path: string
  data: Array<T> | T
  total?: number
  page?: number
  count?: number
  sort?: string
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const ctx = context.switchToHttp()
    const response = ctx.getResponse<ResponseExpress>()
    const request = ctx.getRequest<RequestExpress>()
    const metadata = Reflect.getMetadata('response-metadata', context.getHandler()) as ResponseMetadataOptions

    return next.handle().pipe(
      map((dataResult: Array<T> | T): Response<T> => {
        let message: string = ''

        if (request.method === 'GET') {
          if (!dataResult || (Array.isArray(dataResult) && dataResult.length === 0)) {
            message = 'There are no resources available'
          }
        }

        return {
          data: dataResult,
          statusCode: response.statusCode,
          path: request.url,
          message: message ? message : (metadata?.message ?? this.getMessageForStatus(response.statusCode)),
          timestamp: new Date().toISOString(),
          total: metadata?.total,
          page: metadata?.page,
          count: metadata?.count ?? (Array.isArray(dataResult) ? dataResult.length : 1),
          sort: metadata?.sort,
        }
      })
    )
  }

  private getMessageForStatus(status: number): string {
    const messages = {
      200: 'Success',
      201: 'Resource created successfully',
      204: 'No content available',
    } as { [key: number]: string }

    return messages[status] || 'Petition processed'
  }
}
