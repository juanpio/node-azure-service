import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { IServiceBus } from 'src/common/interfaces/service-bus.interface';

@Injectable()
export class DevBusProvider implements IServiceBus, OnModuleDestroy {
  private client = null;
  private sender = {
    sendMessage: (message: string) => {
      console.log(`message sent: ${message}`);
    },
    close: () => {
      console.log(`closed bus Provider`);
    },
    isClosed: false,
  };
  constructor(
    private readonly config: { connectionString: string; queue: string },
  ) {}
  onModuleDestroy() {
    if (this.sender && !this.sender.isClosed) {
      this.sender.close();
      this.sender.isClosed = true;
    }
  }

  sendMessage(message: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        this.sender.sendMessage(message);
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
