import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ConfigSettings } from '../config';

@Injectable()
export class DbConfigService implements MongooseOptionsFactory {
  private readonly dbUri: string;
  constructor(private readonly config: ConfigService) {
    this.dbUri = this.config.get<string>(ConfigSettings.DB_ATLAS_URI)!;
  }

  public createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    return { uri: this.dbUri, retryWrites: true, ignoreUndefined: true };
  }
}
