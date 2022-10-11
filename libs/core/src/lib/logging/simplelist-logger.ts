/* eslint-disable max-classes-per-file */
import { InjectPinoLogger, Logger, PinoLogger } from 'nestjs-pino';

export const InjectSimplelistLogger = InjectPinoLogger;

export class SimplelistLogger extends PinoLogger {}

export class NestSimplelistLogger extends Logger {}
