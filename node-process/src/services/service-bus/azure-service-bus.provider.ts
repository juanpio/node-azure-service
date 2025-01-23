import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { IServiceBus } from 'src/common/interfaces/service-bus.interface';
import { ServiceBusClient, ServiceBusSender } from '@azure/service-bus';

@Injectable()
export class AzureServiceBusProvider implements IServiceBus, OnModuleDestroy {
  private client: ServiceBusClient;
  private sender: ServiceBusSender;
  constructor(
    private readonly config: { connectionString: string; queue: string },
  ) {
    this.client = new ServiceBusClient(config.connectionString);
    this.sender = this.client.createSender(config.queue);
  }
  onModuleDestroy() {
    if (this.sender && !this.sender.isClosed) {
      this.sender.close();
    }
  }

  sendMessage(message: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.sender.sendMessages(message);
        resolve(message);
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }

  receiveMessage(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
