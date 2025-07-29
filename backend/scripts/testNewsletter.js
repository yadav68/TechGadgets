import dotenv from "dotenv";
import mongoose from "mongoose";
import Newsletter from "../models/Newsletter.js";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/techgadgets";

async function testNewsletterFunctionality() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Test 1: Create a test newsletter subscription
    console.log("\n📧 Testing newsletter subscription...");

    const testEmail = "test@techgadgets.com";

    // Clean up any existing test data
    await Newsletter.deleteOne({ email: testEmail });

    // Create new newsletter subscription
    const newSubscriber = new Newsletter({ email: testEmail });
    await newSubscriber.save();
    console.log(
      `✅ Successfully created newsletter subscription for: ${testEmail}`
    );

    // Test 2: Try to create duplicate subscription (should fail)
    console.log("\n🔄 Testing duplicate subscription prevention...");
    try {
      const duplicateSubscriber = new Newsletter({ email: testEmail });
      await duplicateSubscriber.save();
      console.log(
        "❌ ERROR: Duplicate subscription was allowed (this should not happen)"
      );
    } catch (error) {
      if (error.code === 11000) {
        console.log("✅ Duplicate subscription correctly prevented");
      } else {
        console.log("❌ Unexpected error:", error.message);
      }
    }

    // Test 3: Query newsletter subscribers
    console.log("\n📊 Testing newsletter queries...");

    const allSubscribers = await Newsletter.find({ isActive: true });
    console.log(`✅ Active subscribers count: ${allSubscribers.length}`);

    const totalSubscribers = await Newsletter.countDocuments({
      isActive: true,
    });
    console.log(`✅ Total active subscribers: ${totalSubscribers}`);

    // Test 4: Soft delete functionality
    console.log("\n🗑️ Testing soft delete functionality...");

    const subscriber = await Newsletter.findOne({ email: testEmail });
    if (subscriber) {
      subscriber.isActive = false;
      await subscriber.save();
      console.log("✅ Successfully soft-deleted subscriber");

      const activeCount = await Newsletter.countDocuments({ isActive: true });
      const totalCount = await Newsletter.countDocuments();
      console.log(
        `✅ Active subscribers: ${activeCount}, Total subscribers: ${totalCount}`
      );
    }

    // Test 5: Test pagination simulation
    console.log("\n📄 Testing pagination functionality...");

    // Create a few more test subscribers
    const testEmails = [
      "user1@techgadgets.com",
      "user2@techgadgets.com",
      "user3@techgadgets.com",
    ];

    // Clean up existing test data
    await Newsletter.deleteMany({ email: { $in: testEmails } });

    // Create test subscribers
    for (const email of testEmails) {
      const subscriber = new Newsletter({ email });
      await subscriber.save();
    }

    // Test pagination
    const page = 1;
    const limit = 2;
    const skip = (page - 1) * limit;

    const paginatedResults = await Newsletter.find({ isActive: true })
      .sort({ subscribedAt: -1 })
      .skip(skip)
      .limit(limit);

    console.log(
      `✅ Pagination test: Retrieved ${paginatedResults.length} subscribers (limit: ${limit})`
    );

    // Test 6: Validate email format
    console.log("\n✉️ Testing email validation...");

    try {
      const invalidSubscriber = new Newsletter({ email: "invalid-email" });
      await invalidSubscriber.save();
      console.log("❌ ERROR: Invalid email was accepted");
    } catch (error) {
      console.log("✅ Invalid email correctly rejected");
    }

    // Cleanup test data
    console.log("\n🧹 Cleaning up test data...");
    await Newsletter.deleteMany({
      email: {
        $in: [testEmail, ...testEmails],
      },
    });
    console.log("✅ Test data cleaned up");

    console.log(
      "\n🎉 All newsletter functionality tests completed successfully!"
    );
  } catch (error) {
    console.error("❌ Error during newsletter testing:", error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("\n🔌 Database connection closed.");
  }
}

// Run the tests
testNewsletterFunctionality();
