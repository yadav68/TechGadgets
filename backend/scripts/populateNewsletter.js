import dotenv from "dotenv";
import mongoose from "mongoose";
import Newsletter from "../models/Newsletter.js";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/techgadgets";

// Sample newsletter subscribers
const sampleSubscribers = [
  "john.doe@email.com",
  "jane.smith@gmail.com",
  "techfan@yahoo.com",
  "gadgetlover@hotmail.com",
  "emailuser@techgadgets.com",
  "subscriber1@email.com",
  "newsletter.fan@gmail.com",
  "techreader@yahoo.com",
  "customer@techstore.com",
  "updates@email.com",
];

async function populateNewsletterData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Clear existing newsletter data (optional - comment out if you want to keep existing)
    console.log("🧹 Clearing existing newsletter data...");
    await Newsletter.deleteMany({});

    console.log("📧 Adding sample newsletter subscribers...");

    const subscribers = [];

    for (let i = 0; i < sampleSubscribers.length; i++) {
      const email = sampleSubscribers[i];

      // Create subscribers with different dates (last 30 days)
      const daysAgo = Math.floor(Math.random() * 30);
      const subscribedAt = new Date();
      subscribedAt.setDate(subscribedAt.getDate() - daysAgo);

      subscribers.push({
        email: email,
        subscribedAt: subscribedAt,
        isActive: true,
      });
    }

    // Insert all subscribers
    const result = await Newsletter.insertMany(subscribers);
    console.log(
      `✅ Successfully added ${result.length} newsletter subscribers`
    );

    // Show summary
    const totalActive = await Newsletter.countDocuments({ isActive: true });
    const totalAll = await Newsletter.countDocuments();

    console.log("\n📊 Newsletter Summary:");
    console.log(`Total active subscribers: ${totalActive}`);
    console.log(`Total all subscribers: ${totalAll}`);

    // Show recent subscribers
    console.log("\n📋 Recent subscribers:");
    const recentSubscribers = await Newsletter.find({ isActive: true })
      .sort({ subscribedAt: -1 })
      .limit(5);

    recentSubscribers.forEach((subscriber, index) => {
      console.log(
        `${index + 1}. ${
          subscriber.email
        } - ${subscriber.subscribedAt.toDateString()}`
      );
    });

    console.log("\n🎉 Newsletter data population completed successfully!");
  } catch (error) {
    console.error("❌ Error populating newsletter data:", error);
    if (error.code === 11000) {
      console.log("Some emails already exist in the database.");
    }
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("\n🔌 Database connection closed.");
  }
}

// Run the population
populateNewsletterData();
