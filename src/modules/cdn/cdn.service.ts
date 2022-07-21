import { BadRequestException, Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { extname } from 'path';
import { UploadResponseDto } from './dto/upload-response.dto';
import { randomUUID } from 'crypto';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CdnService {
  constructor(private configService: ConfigService) {}

  async uploadFile(req: FastifyRequest) {
    //Check request is multipart
    // @ts-ignore
    if (!req.isMultipart()) {
      throw new BadRequestException('Request is not multipart');
    }
    const files = [];
    // @ts-ignore
    const parts = req.files();
    const s3 = new S3();
    try {
      for await (const part of parts) {
        const filename = randomUUID().toString() + extname(part.filename);
        const uploadResult = await s3
          .upload({
            Bucket: this.configService.get('BIZFLY_STORAGE_BUCKET_NAME'),
            Body: part.file,
            Key: filename,
            ContentType: part.mimetype,
            ACL: 'public-read',
          })
          .promise();
        files.push(
          this.configService.get('BIZFLY_STORAGE_ENDPOINT') + uploadResult.Key,
        );
      }
      const response = new UploadResponseDto();
      response.files = files;
      return Promise.resolve(response);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  //Save files in directory
  // async handler(
  //   field: string,
  //   file: any,
  //   filename: string,
  //   encoding: string,
  //   mimetype: string,
  // ): Promise<void> {
  //   // const pipeline = util.promisify(stream.pipeline);
  //   const writeStream = fs.createWriteStream(
  //     join(
  //       __dirname,
  //       `../../../cdn/${randomUUID().toString() + extname(filename)}`,
  //     ),
  //   );
  //   try {
  //     await pipeline(file, writeStream);
  //   } catch (err) {
  //     console.error('Pipeline failed', err);
  //   }
  // }
}
