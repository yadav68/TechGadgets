import Newsletter from "../models/Newsletter.js";

// Subscribe to newsletter
export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({
      email: email.toLowerCase(),
    });
    if (existingSubscriber) {
      return res
        .status(409)
        .json({
          error:
            "Already signed up! You are already subscribed to our newsletter.",
        });
    }

    // Create new newsletter subscription
    const newSubscriber = new Newsletter({ email: email.toLowerCase() });
    await newSubscriber.save();

    res.status(201).json({
      message: "Successfully subscribed to newsletter!",
      subscriber: {
        email: newSubscriber.email,
        subscribedAt: newSubscriber.subscribedAt,
      },
    });
  } catch (err) {
    console.error("Newsletter subscription error:", err);
    res.status(500).json({ error: "Error subscribing to newsletter" });
  }
};

// Get all newsletter subscribers (admin only)
export const getNewsletterSubscribers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const subscribers = await Newsletter.find({ isActive: true })
      .sort({ subscribedAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalSubscribers = await Newsletter.countDocuments({
      isActive: true,
    });
    const totalPages = Math.ceil(totalSubscribers / limit);

    res.json({
      subscribers,
      pagination: {
        currentPage: page,
        totalPages,
        totalSubscribers,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (err) {
    console.error("Get newsletter subscribers error:", err);
    res.status(500).json({ error: "Error fetching newsletter subscribers" });
  }
};

// Remove newsletter subscriber (admin only)
export const removeNewsletterSubscriber = async (req, res) => {
  try {
    const { id } = req.params;

    const subscriber = await Newsletter.findById(id);
    if (!subscriber) {
      return res.status(404).json({ error: "Subscriber not found" });
    }

    // Soft delete by setting isActive to false
    subscriber.isActive = false;
    await subscriber.save();

    res.json({ message: "Subscriber removed successfully" });
  } catch (err) {
    console.error("Remove newsletter subscriber error:", err);
    res.status(500).json({ error: "Error removing subscriber" });
  }
};

// Export newsletter subscribers as CSV (admin only)
export const exportNewsletterSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find({ isActive: true }).sort({
      subscribedAt: -1,
    });

    // Create CSV content
    const csvHeader = "Email,Subscribed Date\n";
    const csvContent = subscribers
      .map(
        (subscriber) =>
          `${subscriber.email},${
            subscriber.subscribedAt.toISOString().split("T")[0]
          }`
      )
      .join("\n");

    const csv = csvHeader + csvContent;

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=newsletter-subscribers.csv"
    );
    res.send(csv);
  } catch (err) {
    console.error("Export newsletter subscribers error:", err);
    res.status(500).json({ error: "Error exporting subscribers" });
  }
};
