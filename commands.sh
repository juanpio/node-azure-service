#set environment variables
export SQL_PASSWORD=@Sqledge123$2025
export ACCEPT_EULA=Y
export CONFIG_PATH_SB='../service-bus/config/Config.json'
export CONFIG_PATH_EH='../event-hub/config/Config.json'
export COMPOSE_DOWN=n

export EVENTHUB_CONNECTION_STRING="Endpoint=sb://eventhubs-emulator;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=SAS_KEY_VALUE;UseDevelopmentEmulator=true;"
export EVENTHUB_NAME=iep-claim-ingetion
export PATH_INIT_DATA_FILE='path_to_your_file.csv'

env
#Run docker compose down
#docker compose -f "azure-service-bus-emulator-installer/Sample-Code-Snippets/docker-compose-js.yml" down --volumes --remove-orphans

#Run docker compose for azure event hub emulator
docker compose -p eventhub-emulator -f "node-azure-services/docker-compose-eventhub.yml" up -d --build

#Run docker compose file detached mode
docker compose -p iep-claim-ingestion -f "node-azure-services/docker-compose-js.yml" up -d --build

