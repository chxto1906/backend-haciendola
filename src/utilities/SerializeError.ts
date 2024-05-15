import { ErrorLoggerMetadata, ProviderErrorInstance } from './../interfaces/General.interface';

export const serializeError = (error: unknown, metadata?: ErrorLoggerMetadata): ProviderErrorInstance => ({
  error,
  metadata,
});
