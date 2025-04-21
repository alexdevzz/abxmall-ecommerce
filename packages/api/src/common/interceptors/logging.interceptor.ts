import { CallHandler, ExecutionContext, HttpException, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { Request, Response } from 'express'
import { Observable, tap } from 'rxjs'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name)

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>()
    const method = request.method
    const url = request.url
    const now = Date.now()

    this.logger.log(`Starting request: ${method} ${url}`)

    if (request.body && Object.keys(request.body).length > 0) {
      const body = this.maskSensitiveData(request.body)
      this.logger.debug(`Body of request: ${JSON.stringify(body)}`)
    }

    return next.handle().pipe(
      tap({
        next: () => {
          const response = context.switchToHttp().getResponse<Response>()
          const statusCode = response.statusCode
          const delay = Date.now() - now

          this.logger.log(`Finishing request: ${method} ${url} - Code: ${statusCode} - Time: ${delay}ms`)
        },
        error: (err: HttpException | Error) => {
          const delay = Date.now() - now
          const statusCode = err instanceof HttpException ? err.getStatus() : 500

          if (statusCode >= 400 && statusCode < 500) {
            this.logger.warn(
              `Warning during request: ${method} ${url} - Code: ${statusCode} - Time: ${delay}ms`,
              err.stack
            )
          } else if (statusCode >= 500) {
            this.logger.error(
              `Error during request: ${method} ${url} - Code: ${statusCode} - Time: ${delay}ms`,
              err.stack
            )
          }
        },
      })
    )
  }

  private maskSensitiveData(data: any): any {
    if (data.password) data.password = '********'
    if (data.token) data.token = '********'
    return data
  }
}
