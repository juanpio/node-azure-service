const { ServiceBusClient } = require("@azure/service-bus");

// Connection string and queue name
const connectionString = "Endpoint=sb://servicebus-emulator;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=SAS_KEY_VALUE;UseDevelopmentEmulator=true;";
const queueName = "queue.1";

// Create a ServiceBusClient
const sbClient = new ServiceBusClient(connectionString);

// Sending a message
async function sendMessage() {
  console.log(`Connecting to ${connectionString}`);
  const sender = sbClient.createSender(queueName);
  const message = { body: "Hello, Service Bus!" };
  await sender.sendMessages(message);
  console.log("Message sent!");
  await sender.close();
}

// Receiving a message
async function receiveMessage() {
  const receiver = sbClient.createReceiver(queueName);
  const messages = await receiver.receiveMessages(1, { maxWaitTimeInMs: 5000 });
  for (const message of messages) {
    console.log(`Received: ${message.body}`);
    await receiver.completeMessage(message);
  }
  await receiver.close();
}

// Main function to send and receive messages
async function main() {
  await sendMessage();
  await receiveMessage();
  await sbClient.close();
}

main().catch((err) => {
  console.error("Error occurred: ", err);
  process.exit(1);
});