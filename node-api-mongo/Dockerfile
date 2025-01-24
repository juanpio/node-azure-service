# From node image
FROM node:20.4.0 AS base
# Create app directory
# Install pnpm
RUN npm install -g pnpm

WORKDIR /usr/src/app

FROM base AS dependencies
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

COPY package*.json ./
COPY pnpm-lock.yaml ./
#COPY ./libs ./libs
#COPY .npmrc ./

#RUN pnpm add file:libs\\iep-libs-common-0.0.1.tgz;  
RUN pnpm install 

# If you are building your code for production
# RUN npm ci --only=production
FROM dependencies AS build
# Bundle app source
COPY . .
# Build the app
RUN pnpm build


FROM build AS release

# Copy the build output to the app directory
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000
CMD [ "pnpm", "start:prod" ]