import mongoose from "mongoose";

// Define a type for the connection object
type ConnectionObject = {
  isConnection?: number;
};

// Initialize the connection object
const connection: ConnectionObject = { isConnection: 0 };

/**
 * Connect to the MongoDB database
 */
async function dbConnect(): Promise<void> {
  // Check if already connected
  if (connection.isConnection) {
    console.log("Already connected to the database");
    return;
  }

  // Ensure the MongoDB URI is provided
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in the environment variables");
  }

  try {
    // Connect to the database with options for better compatibility
    const db = await mongoose.connect(process.env.MONGO_URI);
    connection.isConnection = db.connections[0].readyState;
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Database connection failed");
  }
}

/**
 * Disconnect from the MongoDB database
 */
async function dbDisconnect(): Promise<void> {
  if (connection.isConnection) {
    try {
      await mongoose.disconnect();
      connection.isConnection = 0;
      console.log("Disconnected from the database");
    } catch (error) {
      console.error("Error disconnecting from the database:", error);
    }
  } else {
    console.log("No active database connection to disconnect");
  }
}

export { dbConnect, dbDisconnect };
