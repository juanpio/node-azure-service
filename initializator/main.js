// Implementation of a service that will send messages to a EnventHub, from a file in the current directory with the name 'path_to_your_file.csv' written in javascript.
// The file should have the following format: id,data1,data2,data3

const {
  EventHubProducerClient,
  EventHubConsumerClient,
} = require("@azure/event-hubs");
const fs = require("fs");
const path = require("path");

console.debug(process.env["EVENTHUB_CONNECTION_STRING"]);
console.debug(process.env["EVENTHUB_NAME"]);
console.debug(process.env["PATH_INIT_DATA_FILE"]);

const connectionString =
  "Endpoint=sb://localhost;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=SAS_KEY_VALUE;UseDevelopmentEmulator=true;";
const namespace = "ns-claim-activity";
const eventHubName = "eh-claim-activity";
const consumerGroup = "cg-claim-ingestion";
const partitionKey = "pk-claim-ingestion"; //"claim-activity";
const messagingEntity = "me-claim-activity";

const pathToFile = path.join(__dirname, "path_to_your_file.csv");

async function main() {
  const producer = new EventHubProducerClient(connectionString, consumerGroup );
  //const batch = await producer.createBatch();
  try {
    // Create a batch of events
    const eventDataBatch = await producer.createBatch();

    // Add a message to the batch with the partition key "eventHubName"
    const message = { body: "Hello, this is a message to claim-ingestion!" };

    // Add the message to the batch
    if (!eventDataBatch.tryAdd({ body: message.body, partitionKey })) {
      console.log("The message is too large to fit in the batch.");
    }

    // Send the batch of events to the Event Hub
    await producer.sendBatch(eventDataBatch);
    console.log("Message sent successfully to eventHubName!");
  } catch (err) {
    console.error("Error sending message: ", err);
  } finally {
    // Close the producer
    await producer.close();
  }

  // try {
  //   // Read the events from the eventhub and print them
  //   const consumer = new EventHubConsumerClient(
  //     consumerGroup, //EventHubConsumerClient.defaultConsumerGroupName,
  //     connectionString,
  //     eventHubName
  //   );

  //   // Subscribe to the events
  //   consumer.subscribe({
  //     processEvents: async (events, context) => {
  //       for (const event of events) {
  //         console.log(
  //           `Received event: '${event.body}' from partition: '${context.partitionId}' and consumer group: '${context.consumerGroup}'`
  //         );
  //       }
  //     },
  //     processError: async (err, context) => {
  //       console.error(`Error : ${err}`);
  //     },
  //   });

  //   // Wait for a few seconds
  //   await new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve();
  //     }, 10 * 1000);
  //   });

  //   // Close the consumer
  //   await consumer.close();

  //   console.log("Message read successfully to eventHubName!");
  // } catch (err) {
  //   console.error("Error sending message: ", err);
  // } finally {
  //   // Close the producer
  //   await producer.close();
  // }

  // const data =
  //     fs.readFileSync(pathToFile, 'utf8')
  //         .split('\n')
  //         .map(line => line.split(','));
  // for (const [id, data1, data2, data3] of data) {
  //     batch.tryAdd({ id, data1, data2, data3 });
  // }

  // await producer.sendBatch(batch);
  // await producer.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
