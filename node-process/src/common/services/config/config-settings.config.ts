export enum ConfigSettings {
  APP_VERSION = 'app.version',
  APP_PORT = 'app.port', // Port that claims-ai-svc service listens on
  APP_LOGLEVEL = 'app.logLevel', // Standard NestJS log levels: INFO, WARN, DEBUG, ERROR
  APP_DEVMODE = 'app.devMode',
  APP_DISABLESSLVERIFY = 'app.debugDisableSslVerify',
  AZURE_SB_ACCOUNT_NAME = 'azure.serviceBus.accountName',
  AZURE_SB_DEVMODE_CONNSTR = 'azure.serviceBus.devModeConnStr',
  AZURE_SB_ACTIVITY_QUEUE_NAME = 'azure.serviceBus.activityQueueName',
  AZURE_SB_REWARD_QUEUE_NAME = 'azure.serviceBus.rewardQueueName',
  AZURE_SB_MAX_ACTIVITY_QUEUE_MSGS = 'azure.serviceBus.maxActivityQueueMsgs',
  DB_ATLAS_URI = 'db.atlas.uri',
  SECURITY_OIDCEP = 'security.oidcEp',
  SECURITY_TOKENEP = 'security.tokenEp',
}
