#set environment variables

export SERVICEBUS_CONNECTION_STRING="Endpoint=sb://localhost;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=SAS_KEY_VALUE;UseDevelopmentEmulator=true;"
export EVENTHUB_CONNECTION_STRING="Endpoint=sb://localhost;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=SAS_KEY_VALUE;UseDevelopmentEmulator=true;"
export EVENTHUB_NAME='eventhub'
export PATH_INIT_DATA_FILE='path_to_your_file.csv'

export SQL_PASSWORD='@Sqledge123$2025'
export ACCEPT_EULA=Y
export CONFIG_PATH_SB='./config/service-bus.config.json'
export CONFIG_PATH_EH='./config/event-hub.config.json'
export COMPOSE_DOWN=n

env

#Run docker compose file detached mode
docker compose -p event-services-compouse -f "docker-compose-js.yml" up -d --build

#Down docker compose file
#docker compose -p event-services-compouse -f "docker-compose-js.yml" down