import { Module } from '@nestjs/common';
import { IServiceBus } from '../common/interfaces/service-bus.interface';
import { AzureServiceBusProvider } from 'src/services/service-bus/azure-service-bus.provider';
import { DevBusProvider } from 'src/services/service-bus/dev-bus.provider';
import { ConfigService } from '@nestjs/config';

const ServiceBusProvider = {
  provide: IServiceBus,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const type = process.env.SERVICE_BUS_TYPE;
    let provider;
    switch (type) {
      case 'azure':
        console.log('azure debug');
        provider = new AzureServiceBusProvider({
          connectionString: configService.get<string>(
            'AZURE_SERVICE_BUS_CONNECTION_STRING',
          ),
          queue: configService.get<string>('ACTIVITIES_QUEUE'),
        });
        break;
      case 'dev':
      default:
        provider = new DevBusProvider({
          connectionString: '',
          queue: configService.get<string>('ACTIVITIES_QUEUE'),
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