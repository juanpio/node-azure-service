import { IepLogLevels } from 'iep-libs-common';
import { z } from 'zod';

export const configSchema = z.object({
  app: z.object({
    version: z.string(),
    port: z.number({ coerce: true }).int(),
    logLevel: z.enum([
      IepLogLevels.Info,
      IepLogLevels.Debug,
      IepLogLevels.Error,
      IepLogLevels.Trace,
      IepLogLevels.Warn,
      IepLogLevels.Fatal,
      IepLogLevels.Silent,
    ]),
    devMode: z.boolean(),
    debugDisableSslVerify: z.boolean(),
  }),
  azure: z.object({
    serviceBus: z.object({
      accountName: z.string(),
      devModeConnStr: z.string(),
      activityQueueName: z.string(),
      rewardQueueName: z.string(),
      maxActivityQueueMsgs: z.number({ coerce: true }).int().min(1).max(50),
    }),
  }),
  db: z.object({
    atlas: z.object({
      uri: z.string(),
    }),
  }),
  security: z.object({
    oidcEp: z.string(),
    tokenEp: z.string(),
  }),
});
