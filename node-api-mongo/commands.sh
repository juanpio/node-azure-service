#set environment variables

export DB_ATLAS_URI="mongodb://admin:pWwnymGCf5XEwNoK@mongodb:27017/iep-program-initialization?authSource=admin&directConnection=true"
export DB_ATLAS_MONGO_ADMIN_USER="admin"
export DB_ATLAS_MONGO_ADMIN_PASSWORD="pWwnymGCf5XEwNoK"
export ME_CONFIG_MONGODB_ADMINUSER="admin"
export ME_CONFIG_MONGODB_ADMINPASSWORD="pWwnymGCf5XEwNoK"
export ME_CONFIG_MONGODB_SERVER="mongodb"

env

#Run docker compose file detached mode
docker compose -p node-mongo-api-compouse -f "node-api-mongo/docker-compose.yml" up -d --build

#Down docker compose file
#docker compose -p event-services-compouse -f "docker-compose.yml" down