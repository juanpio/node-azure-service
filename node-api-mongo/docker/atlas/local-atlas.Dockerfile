# Use the official MongoDB image as the base
FROM mongo:6.0

# Set environment variables for MongoDB root user
ENV MONGO_INITDB_ROOT_USERNAME=admin
ENV MONGO_INITDB_ROOT_PASSWORD=secret

# Expose default MongoDB port
EXPOSE 27017

COPY init.js /docker-entrypoint-initdb.d/
