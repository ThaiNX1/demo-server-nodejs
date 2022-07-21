import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    //TODO: Log to Logstash
    //{
    //       statusCode: status,
    //       timestamp: new Date().toISOString(),
    //       path: request.url,
    //     }
    response.status(status).json({
      statusCode: status,
      message: 'Có lỗi xảy ra! Vui lòng kiểm tra lại thông tin!',
    });
  }
}
