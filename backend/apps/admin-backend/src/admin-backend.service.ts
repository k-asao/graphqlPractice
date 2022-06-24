import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminBackendService {
  getHello(): string {
    return 'Hello World!';
  }
}
