import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response as ResponseExpress } from 'express';

interface Response<T> {
  message: string;
  timestamp: string;
  statusCode: number;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<ResponseExpress>();

    return next.handle().pipe(
      map(
        (dataResult: T): Response<T> => ({
          data: dataResult,
          statusCode: response.statusCode,
          message: this.getMessageForStatus(response.statusCode),
          timestamp: new Date().toISOString(),
        }),
      ),
    );
  }

  private getMessageForStatus(status: number): string {
    const messages = {
      200: 'Success',
      201: 'Resource created successfully',
      204: 'No content available',
    } as { [key: number]: string };

    return messages[status] || 'Petition processed';
  }
}
