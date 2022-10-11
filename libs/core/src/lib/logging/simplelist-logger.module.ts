import { DynamicModule } from '@nestjs/common';
import { LoggerModule, LoggerModuleAsyncParams, Params } from 'nestjs-pino';
import { NestSimplelistLogger, SimplelistLogger } from './simplelist-logger';
import { IncomingMessage, ServerResponse } from 'http';

export class SimplelistLoggerModule extends LoggerModule {
  private static normalizeParams(params: Params = {}): Params {
    return {
      ...params,
      pinoHttp: {
        ...(params.pinoHttp ?? {}),
        customLogLevel: (_: IncomingMessage, res: ServerResponse) => {
          if (res.statusCode >= 400 && res.statusCode <= 499) {
            return 'warn';
          }

          if (res.statusCode >= 500) {
            return 'error';
          }

          return 'info';
        },
      },
      exclude: ['/health'],
    };
  }

  public static override forRoot(params: Params = {}): DynamicModule {
    const result = LoggerModule.forRoot(SimplelistLoggerModule.normalizeParams(params));
    const providers = result.providers ? result.providers : [];
    return {
      ...result,
      providers: [
        ...providers,
        SimplelistLogger,
        NestSimplelistLogger,
      ],
    };
  }

  public static override forRootAsync(params: LoggerModuleAsyncParams): DynamicModule {
    const result = LoggerModule.forRootAsync({
      ...params,
      useFactory: async (...args: any[]) => {
        const plainParams = await params.useFactory(...args);
        return SimplelistLoggerModule.normalizeParams(plainParams);
      },
    });

    const providers = result.providers ? result.providers : [];
    return {
      ...result,
      providers: [
        ...providers,
        SimplelistLogger,
        NestSimplelistLogger,
      ],
    };
  }
}
