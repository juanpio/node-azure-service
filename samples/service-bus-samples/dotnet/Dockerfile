# Buidl and execute the docker image
#FROM microsoft/dotnet:6.0-sdk AS build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app

COPY ./ServiceBus.Emulator.Console.Sample/*.csproj ./

RUN dotnet restore

COPY . ./

RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/runtime:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

ENTRYPOINT ["dotnet", "ServiceBus.Emulator.Console.Sample.dll"]