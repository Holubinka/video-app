import { Injectable, UseGuards } from '@nestjs/common';
import { MD5 } from 'crypto-js';
import { Client } from 'minio';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { GqlThrottlerGuard } from 'src/decorators/throttler-guard.decorator';

@UseGuards(GqlThrottlerGuard)
@Injectable()
export class MinioService {
  private client = new Client({
    endPoint: '127.0.0.1',
    port: 9000,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
    pathStyle: true,
    useSSL: false,
  });

  async putFile(name: string, buffer: Buffer, userId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.client.putObject(userId, name, buffer, (err, res) => {
        if (err) reject(err);
        resolve(name);
      });
    });
  }

  async bucketExists(bucketName: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.client.bucketExists(bucketName, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  async makeBucket(userId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const name = userId;
      this.client.makeBucket(name, 'us-east-1', function (err) {
        if (err) return reject(err);
        resolve(name);
      });
    });
  }

  async listFiles(@CurrentUser() { userId }: { userId?: string }) {
    return this.client.listObjectsV2(userId);
  }

  async getFile(name: string, @CurrentUser() { userId }: { userId?: string }) {
    this.client.presignedUrl('GET', userId, name);
    return this.client.getObject(userId, name);
  }
}
