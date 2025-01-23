#set environment variables
export SQL_PASSWORD='@Sqledge123$2025'
export ACCEPT_EULA=Y
export CONFIG_PATH_SB='../node-azure-services/config/service-bus/Config.json'
export CONFIG_PATH_EH='../node-azure-services/config/event-hub/Config.json'
export COMPOSE_DOWN=n

export SERVICEBUS_CONNECTION_STRING="Endpoint=sb://localhost;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=SAS_KEY_VALUE;UseDevelopmentEmulator=true;"
export EVENTHUB_CONNECTION_STRING="Endpoint=sb://localhost;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=SAS_KEY_VALUE;UseDevelopmentEmulator=true;"
export EVENTHUB_NAME='eventhub'
export PATH_INIT_DATA_FILE='path_to_your_file.csv'

env
#Run docker compose down
#docker compose -f "azure-service-bus-emulator-installer/Sample-Code-Snippets/docker-compose-js.yml" down

#Run docker compose file detached mode
docker compose -p event-services-compouse -f "docker-compose-js.yml" up -d --build

