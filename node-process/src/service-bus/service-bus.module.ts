import { Module } from '@nestjs/common';
import { IServiceBus } from '../common/interfaces/service-bus.interface';
import { AzureServiceBusProvider } from 'src/services/service-bus/azure-service-bus.provider';
import { DevBusProvider } from 'src/services/service-bus/dev-bus.provider';

const ServiceBusProvider = {
  provide: IServiceBus,
  useFactory: () => {
    const type = process.env.SERVICE_BUS_TYPE;
    let provider;
    switch (type) {
      case 'azure':
        provider = new AzureServiceBusProvider({
          connectionString: process.env.AZURE_SERVICE_BUS_CONNECTION_STRING,
          queue: process.env.ACTIVITIES_QUEUE,
        });
        break;
      case 'dev':
      default:
        provider = new DevBusProvider({
          connectionString: '',
          queue: process.env.ACTIVITIES_QUEUE,
        });
    }
    return provider;
  },
};

@Module({
  providers: [ServiceBusProvider],
  exports: [ServiceBusProvider],
})
export class ServiceBusModule {}
