# From node image
FROM node:20.4.0 base
# Create app directory
# Install pnpm
RUN npm install -g pnpm

WORKDIR /usr/src/app
FROM base AS dependencies
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

COPY package*.json ./

RUN pnpm install
# If you are building your code for production
# RUN npm ci --only=production
FROM dependencies AS build
# Bundle app source
COPY . .
# Build the app
RUN pnpm run build

FROM dependencies AS test
# Test the app
RUN pnpm test

FROM build AS release

# Copy the build output to the app directory
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000
CMD [ "pnpm", "start:pord" ]