import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception: HttpException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception.getStatus();

    const exceptionResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url
    };

    response.status(status).json(exceptionResponse);

  }

}

@Injectable()
@Catch(BadRequestException)
export class BadRequestException extends HttpException {

  constructor() {
    super({message: 'Bad Request'}, Number(HttpStatus.BAD_REQUEST));
}

}

@Injectable()
@Catch(NotFoundException)  
export class NotFoundException extends HttpException {

  constructor() {
    super({message: 'Not Found'}, Number(HttpStatus.NOT_FOUND));
  }

}

// Additional exceptions
