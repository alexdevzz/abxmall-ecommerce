import { SetMetadata } from '@nestjs/common';

export interface ResponseMetadataOptions {
  message?: string;
  total?: number;
  page?: number;
  count?: number;
  sort?: string;
}

export const ResponseMetadata = (options: string | ResponseMetadataOptions) => {
  const resOptions = typeof options === 'string' ? { message: options } : options;
  return SetMetadata('response-metadata', resOptions);
};
