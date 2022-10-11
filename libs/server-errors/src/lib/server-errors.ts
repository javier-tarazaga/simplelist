/* eslint-disable max-classes-per-file */
import { HttpException, HttpStatus } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import errors from './server-error-types';

export const ServerError = errors;

export interface ErrorType {
  type: ServerErrorCodes,
  statusCode: HttpStatus
}

let types: string[] = [];
Object.values(errors).forEach((value) => {
  types = [...types, ...Object.values(value).map((type) => type.type)];
});

export type ServerErrorCodes = typeof types[number];

export interface ServerExceptionProps {
  error: ErrorType,
  data?: any,
  message?: string
}

export class ServerException extends HttpException {
  constructor(props: ServerExceptionProps) {
    const { error, ...rest } = props;
    super({
      ...error,
      ...rest,
    }, error.statusCode);
  }
}

export class ServerApolloError extends ApolloError {
  constructor(props: ServerExceptionProps) {
    super(props.message, props.error.statusCode.toString(), {
      code: props.error.statusCode,
      type: props.error.type,
      data: props.data,
    });

    Object.defineProperty(this, 'name', { value: 'ServerApolloError' });
  }
}
