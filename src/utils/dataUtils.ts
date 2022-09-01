import { AES, enc, HmacSHA256 } from 'crypto-js';
import { ReadStream } from 'fs';

export default {
  decryptString: (encryptedString?: string | null): string => {
    if (!encryptedString) return '';
    return AES.decrypt(encryptedString, process.env.SECRET).toString(enc.Utf8);
  },
  encryptString: (str?: string | null): string => {
    if (!str) return '';
    return AES.encrypt(str, process.env.SECRET).toString();
  },
  hashString: (str?: string | null): string => {
    if (!str) return '';
    return HmacSHA256(str?.toLowerCase(), process.env.SECRET).toString();
  },
  streamToBuffer: (stream: ReadStream): Promise<Buffer> => {
    const chunks: Buffer[] = [];
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk: any) => {
        return chunks.push(Buffer.from(chunk));
      });
      stream.on('error', (err: Error) => reject(err));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
  },
};
