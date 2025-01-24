const {
  EventHubProducerClient,
  EventHubConsumerClient,
} = require("@azure/event-hubs");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

// Environment variables or hardcoded fallback
const EVENTHUB_CONNECTION_STRING =
  process.env["EVENTHUB_CONNECTION_STRING"] ||
  "Endpoint=sb://localhost;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=SAS_KEY_VALUE;UseDevelopmentEmulator=true;";

const EVENTHUB_NAME = process.env["EVENTHUB_NAME"] || "eventhub";

const FILE_NAME =
  process.env["INITIALIZER_DATA_FILE_PATH"] || "path_to_your_file.csv";

const PATH_TO_FILE = path.join(__dirname, FILE_NAME);

const CONSUMER_GROUP =
  process.env["EVENTHUB_CONSUMER_GROUP"] ||
  EventHubConsumerClient.defaultCONSUMER_GROUPName; // "$Default"

console.log(
  EVENTHUB_CONNECTION_STRING,
  EVENTHUB_NAME,
  PATH_TO_FILE,
  CONSUMER_GROUP
);

// Main function to run either Producer or Consumer
async function main() {
  // ------ Run only Producer
  console.log("Starting Producer...");
  await runProducer();
  console.log("The Producer have finished.");

  // ------ Run both Producer and Consumer
  // console.log("Starting Producer and Consumer...");
  // await Promise.all([runProducer(), runConsumer()]);
  // console.log("Both Producer and Consumer have finished.");
}

main().catch((err) => {
  console.error("Fatal error:", err);
});

// Function to run the Producer
async function runProducer() {
  const producer = new EventHubProducerClient(
    EVENTHUB_CONNECTION_STRING,
    EVENTHUB_NAME
  );
  try {
    console.log("Reading data from file...");
    const data = await readCSVFile(PATH_TO_FILE, 10); // Wait for the CSV to be fully processed

    console.log("Preparing event data batch...");
    let eventDataBatch = await producer.createBatch();

    let errorCounter = 0;
    let messageCounter = 0;
    for (const row of data) {
      const message = { ...row };
      console.log("Message: ", message);

      const messageBuffer = Buffer.from(
        JSON.stringify(message, customFloatSerializer)
      );
      const messageSizeInBytes = messageBuffer.length;

      if (messageSizeInBytes > 256000) {
        // Default max size is 256KB on Azure Event Hubs Batch
        console.error(
          `Message exceeds the maximum allowed size: ${messageSizeInBytes} bytes`
        );
        errorCounter++;
        continue;
      }

      if (!eventDataBatch.tryAdd({ body: message })) {
        console.log("Batch is full, sending batch...");
        await producer.sendBatch(eventDataBatch);

        // Create a new batch
        eventDataBatch = await producer.createBatch();

        // Attempt to add the rejected message to the new batch
        if (!eventDataBatch.tryAdd({ body: message })) {
          console.error(`Message is too large even for a new batch.`);
          errorCounter++;
        }
      }

      messageCounter++;
    }

    console.log("Sending remaining batch...");
    if (eventDataBatch.count > 0) {
      await producer.sendBatch(eventDataBatch);
    }

    console.log("Message counter: ", messageCounter);
    console.log("Error counter: ", errorCounter);
    console.log("Success: ", messageCounter - errorCounter);
  } catch (err) {
    console.error("Error in producer:", err);
  } finally {
    await producer.close();
    console.log("Event Hub producer closed.");
  }
}

// Function to run the Consumer
async function runConsumer() {
  const consumer = new EventHubConsumerClient(
    CONSUMER_GROUP,
    EVENTHUB_CONNECTION_STRING,
    EVENTHUB_NAME
  );
  try {
    console.log("Starting the Event Hub consumer...");
    const subscription = consumer.subscribe(
      {
        processEvents: async (events, context) => {
          if (events.length === 0) {
            console.log(
              `No events received for partition ${context.partitionId}`
            );
            return;
          }

          for (const event of events) {
            // console.log(
            //   `Received event from partition ${
            //     context.partitionId
            //   }: ${JSON.stringify(event.body)} \n`
            // );
            console.log(
              `Received event from partition ${
                context.partitionId
              }: ${JSON.stringify(event.body.claimId)}, ${JSON.stringify(
                event.body.activityType
              )} \n\n`
            );
          }
        },
        processError: async (err, context) => {
          console.error(`Error in partition ${context.partitionId}:`, err);
        },
      },
      { startPosition: { sequenceNumber: 0 } }
    );

    // Run the consumer for 30 seconds
    await new Promise((resolve) => setTimeout(resolve, 50 * 1000));

    console.log("Stopping the Event Hub consumer...");
    await subscription.close();
  } catch (err) {
    console.error("Error in consumer:", err);
  } finally {
    await consumer.close();
    console.log("Event Hub consumer closed.");
  }
}

function customFloatSerializer(key, value) {
  if (typeof value === "number") {
    return parseFloat(value.toFixed(1)); // Force float representation
  }
  return value;
}

function safelyParseJSON(json) {
  try {
    const parsed = JSON.parse(json);

    // Ensure nested floats are preserved
    function ensureFloats(obj) {
      if (typeof obj === "object" && obj !== null) {
        Object.keys(obj).forEach((key) => {
          const value = obj[key];
          if (typeof value === "number") {
            obj[key] = parseFloat(value.toFixed(1)); // Force float representation
          } else if (typeof value === "object" && value !== null) {
            ensureFloats(value); // Recurse into nested objects
          }
        });
      }
    }

    ensureFloats(parsed);
    return parsed;
  } catch (e) {
    return null; // Return null if JSON parsing fails
  }
}

async function readCSVFile(filePath, maxRows = Infinity) {
  return new Promise((resolve, reject) => {
    const data = [];
    let rowCount = 0;

    const stream = fs
      .createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        if (rowCount < maxRows) {
          // Process each row
          Object.keys(row).forEach((key) => {
            // Check for JSON-like fields
            if (row[key].startsWith("{") && row[key].endsWith("}")) {
              const parsed = safelyParseJSON(row[key]) || row[key];
              row[key] = parsed; // Replace with the processed object
            }
          });

          data.push(row);
          rowCount++;

          // Stop reading if maxRows is reached
          if (rowCount >= maxRows) {
            stream.destroy(); // Close the stream
            resolve(data);
          }
        }
      })
      .on("end", () => {
        resolve(data); // Resolve the promise with the processed rows
      })
      .on("error", (error) => {
        reject(error); // Reject the promise if there's an error
      });
  });
}
