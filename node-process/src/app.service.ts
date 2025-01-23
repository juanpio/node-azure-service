import { Injectable, Inject } from '@nestjs/common';
import { IServiceBus } from './common/interfaces/service-bus.interface';

@Injectable()
export class AppService {
  constructor(@Inject(IServiceBus) private readonly serviceBus: IServiceBus) {}

  getHello(): string {
    return 'Hello World!';
  }

  async postOnServiceBus(message: any): Promise<void> {
    return await this.serviceBus.sendMessage(message);
  }
}
