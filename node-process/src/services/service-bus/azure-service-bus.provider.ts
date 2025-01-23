import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { IServiceBus } from 'src/common/interfaces/service-bus.interface';
import { ServiceBusClient, ServiceBusMessage, ServiceBusSender } from '@azure/service-bus';

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

  sendMessage(message: ServiceBusMessage): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const azureMessage = await this.sender.createMessageBatch();
        if (!azureMessage.tryAddMessage(message)) {
          throw new Error('Message too big to fit in a batch');
        }
        await this.sender.sendMessages(azureMessage);
        console.debug('Message sent: ', azureMessage);
        resolve();
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