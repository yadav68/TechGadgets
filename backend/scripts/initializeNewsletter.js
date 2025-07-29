import dotenv from "dotenv";
import mongoose from "mongoose";
import Newsletter from "../models/Newsletter.js";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/techgadgets";

async function initializeNewsletter() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Check if Newsletter collection exists and create indexes if needed
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    const newsletterExists = collections.some(
      (col) => col.name === "newsletters"
    );

    if (!newsletterExists) {
      console.log("Newsletter collection does not exist. Creating...");
    } else {
      console.log("Newsletter collection already exists.");
    }

    // Ensure unique index on email field
    await Newsletter.collection.createIndex({ email: 1 }, { unique: true });
    console.log("Unique index on email field ensured.");

    // Ensure index on isActive field for efficient queries
    await Newsletter.collection.createIndex({ isActive: 1 });
    console.log("Index on isActive field ensured.");

    // Ensure index on subscribedAt field for sorting
    await Newsletter.collection.createIndex({ subscribedAt: -1 });
    console.log("Index on subscribedAt field ensured.");

    // Get current count of newsletter subscribers
    const count = await Newsletter.countDocuments({ isActive: true });
    console.log(`Current active newsletter subscribers: ${count}`);

    console.log("Newsletter model initialization completed successfully!");
  } catch (error) {
    console.error("Error initializing Newsletter model:", error);
    if (error.code === 11000) {
      console.log(
        "Duplicate key error - this is normal if indexes already exist."
      );
    }
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("Database connection closed.");
  }
}

// Run the initialization
initializeNewsletter();
