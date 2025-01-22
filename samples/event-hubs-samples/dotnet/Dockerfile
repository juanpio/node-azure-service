# Buidl and execute the docker image
#FROM microsoft/dotnet:6.0-sdk AS build
FROM mcr.microsoft.com/dotnet/sdk:6.0.428-1 AS build

WORKDIR /app

COPY ./EventHubs-Emulator-Demo/*.csproj ./

RUN dotnet restore

COPY . ./

RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/runtime:6.0.9 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

ENTRYPOINT ["dotnet", "EventHubs-Emulator-Demo.dll"]