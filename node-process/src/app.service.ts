import { Injectable, Inject } from '@nestjs/common';
import { IServiceBus } from './common/interfaces/service-bus.interface';
import { ServiceBusMessage } from '@azure/service-bus';

@Injectable()
export class AppService {
  constructor(@Inject(IServiceBus) private readonly serviceBus: IServiceBus) {}

  getHello(): string {
    return 'Hello World!';
  }

  async postOnServiceBus(message: ServiceBusMessage): Promise<void> {
    return await this.serviceBus.sendMessage(message);
  }
}
