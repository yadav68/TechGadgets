// Connect to the techgadgets database
const { MongoClient } = require("mongodb");

async function populateDatabase() {
  const client = new MongoClient("mongodb://localhost:27017");

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("techgadgets");

    // Drop existing collections
    await db.dropDatabase();
    console.log("Database cleared");

    // Create categories
    const categories = [
      {
        name: "Smartphones",
        description: "Latest mobile phones and accessories",
        isActive: true,
      },
      {
        name: "Laptops",
        description: "High-performance laptops and notebooks",
        isActive: true,
      },
      {
        name: "Headphones",
        description: "Premium audio equipment and headphones",
        isActive: true,
      },
      {
        name: "Smart Watches",
        description: "Wearable technology and fitness trackers",
        isActive: true,
      },
      {
        name: "Gaming",
        description: "Gaming consoles, accessories and peripherals",
        isActive: true,
      },
      {
        name: "Cameras",
        description: "Digital cameras and photography equipment",
        isActive: true,
      },
      {
        name: "Tablets",
        description: "Tablets and e-readers",
        isActive: true,
      },
      {
        name: "Smart Home",
        description: "IoT devices and smart home automation",
        isActive: true,
      },
      {
        name: "Audio",
        description: "Speakers, soundbars and audio systems",
        isActive: true,
      },
      {
        name: "Accessories",
        description: "Tech accessories and peripherals",
        isActive: true,
      },
    ];

    const categoriesResult = await db
      .collection("categories")
      .insertMany(categories);
    console.log(`${categoriesResult.insertedCount} categories inserted`);

    // Get inserted categories for reference
    const insertedCategories = await db
      .collection("categories")
      .find()
      .toArray();

    // Create products
    const products = [];

    // Smartphones (10 products)
    const smartphoneCategory = insertedCategories.find(
      (cat) => cat.name === "Smartphones"
    );
    const smartphoneProducts = [
      { name: "iPhone 15 Pro", price: 999.99, stock: 25 },
      { name: "Samsung Galaxy S24", price: 899.99, stock: 30 },
      { name: "Google Pixel 8", price: 699.99, stock: 20 },
      { name: "OnePlus 12", price: 799.99, stock: 15 },
      { name: "Xiaomi 14", price: 649.99, stock: 18 },
      { name: "iPhone 15", price: 799.99, stock: 35 },
      { name: "Samsung Galaxy A54", price: 449.99, stock: 40 },
      { name: "Nothing Phone 2", price: 599.99, stock: 12 },
      { name: "Realme GT 5", price: 549.99, stock: 22 },
      { name: "Oppo Find X7", price: 749.99, stock: 16 },
    ];

    smartphoneProducts.forEach((product, index) => {
      products.push({
        name: product.name,
        description: `Premium ${product.name} with advanced features and stunning design`,
        price: product.price,
        category: smartphoneCategory._id,
        image: `https://placehold.co/400x400/0066cc/ffffff?text=${encodeURIComponent(
          product.name
        )}`,
        stock: product.stock,
        isActive: true,
      });
    });

    // Laptops (7 products)
    const laptopCategory = insertedCategories.find(
      (cat) => cat.name === "Laptops"
    );
    const laptopProducts = [
      { name: "MacBook Pro 16", price: 2499.99, stock: 10 },
      { name: "Dell XPS 13", price: 1299.99, stock: 15 },
      { name: "ThinkPad X1 Carbon", price: 1599.99, stock: 12 },
      { name: "HP Spectre x360", price: 1199.99, stock: 18 },
      { name: "Surface Laptop 5", price: 1099.99, stock: 20 },
      { name: "ASUS ZenBook 14", price: 899.99, stock: 25 },
      { name: "Acer Swift 3", price: 699.99, stock: 30 },
    ];

    laptopProducts.forEach((product, index) => {
      products.push({
        name: product.name,
        description: `High-performance ${product.name} perfect for work and entertainment`,
        price: product.price,
        category: laptopCategory._id,
        image: `https://placehold.co/400x400/333333/ffffff?text=${encodeURIComponent(
          product.name
        )}`,
        stock: product.stock,
        isActive: true,
      });
    });

    // Headphones (5 products)
    const headphoneCategory = insertedCategories.find(
      (cat) => cat.name === "Headphones"
    );
    const headphoneProducts = [
      { name: "Sony WH-1000XM5", price: 399.99, stock: 20 },
      { name: "Bose QuietComfort 45", price: 329.99, stock: 25 },
      { name: "Apple AirPods Pro 2", price: 249.99, stock: 40 },
      { name: "Sennheiser HD 660S", price: 499.99, stock: 8 },
      { name: "Audio-Technica ATH-M50x", price: 149.99, stock: 35 },
    ];

    headphoneProducts.forEach((product, index) => {
      products.push({
        name: product.name,
        description: `Premium ${product.name} with exceptional sound quality`,
        price: product.price,
        category: headphoneCategory._id,
        image: `https://placehold.co/400x400/8B0000/ffffff?text=${encodeURIComponent(
          product.name
        )}`,
        stock: product.stock,
        isActive: true,
      });
    });

    // Smart Watches (6 products)
    const watchCategory = insertedCategories.find(
      (cat) => cat.name === "Smart Watches"
    );
    const watchProducts = [
      { name: "Apple Watch Series 9", price: 399.99, stock: 30 },
      { name: "Samsung Galaxy Watch 6", price: 329.99, stock: 25 },
      { name: "Garmin Forerunner 965", price: 599.99, stock: 12 },
      { name: "Fitbit Sense 2", price: 299.99, stock: 20 },
      { name: "Amazfit GTR 4", price: 199.99, stock: 35 },
      { name: "Huawei Watch GT 4", price: 249.99, stock: 18 },
    ];

    watchProducts.forEach((product, index) => {
      products.push({
        name: product.name,
        description: `Advanced ${product.name} with health monitoring and fitness tracking`,
        price: product.price,
        category: watchCategory._id,
        image: `https://placehold.co/400x400/4B0082/ffffff?text=${encodeURIComponent(
          product.name
        )}`,
        stock: product.stock,
        isActive: true,
      });
    });

    // Gaming (8 products)
    const gamingCategory = insertedCategories.find(
      (cat) => cat.name === "Gaming"
    );
    const gamingProducts = [
      { name: "PlayStation 5", price: 499.99, stock: 5 },
      { name: "Xbox Series X", price: 499.99, stock: 8 },
      { name: "Nintendo Switch OLED", price: 349.99, stock: 15 },
      { name: "Steam Deck", price: 399.99, stock: 10 },
      { name: "Razer DeathAdder V3", price: 89.99, stock: 50 },
      { name: "Logitech G Pro X", price: 129.99, stock: 30 },
      { name: "Corsair K95 RGB", price: 199.99, stock: 25 },
      { name: "ASUS ROG Strix Monitor", price: 299.99, stock: 20 },
    ];

    gamingProducts.forEach((product, index) => {
      products.push({
        name: product.name,
        description: `High-performance ${product.name} for ultimate gaming experience`,
        price: product.price,
        category: gamingCategory._id,
        image: `https://placehold.co/400x400/FF4500/ffffff?text=${encodeURIComponent(
          product.name
        )}`,
        stock: product.stock,
        isActive: true,
      });
    });

    // Cameras (4 products)
    const cameraCategory = insertedCategories.find(
      (cat) => cat.name === "Cameras"
    );
    const cameraProducts = [
      { name: "Canon EOS R5", price: 3899.99, stock: 5 },
      { name: "Sony Alpha A7 IV", price: 2499.99, stock: 8 },
      { name: "Fujifilm X-T5", price: 1699.99, stock: 10 },
      { name: "Nikon Z6 III", price: 2499.99, stock: 6 },
    ];

    cameraProducts.forEach((product, index) => {
      products.push({
        name: product.name,
        description: `Professional ${product.name} camera with exceptional image quality`,
        price: product.price,
        category: cameraCategory._id,
        image: `https://placehold.co/400x400/2F4F4F/ffffff?text=${encodeURIComponent(
          product.name
        )}`,
        stock: product.stock,
        isActive: true,
      });
    });

    // Tablets (3 products)
    const tabletCategory = insertedCategories.find(
      (cat) => cat.name === "Tablets"
    );
    const tabletProducts = [
      { name: "iPad Pro 12.9", price: 1099.99, stock: 15 },
      { name: "Samsung Galaxy Tab S9", price: 799.99, stock: 20 },
      { name: "Microsoft Surface Pro 9", price: 999.99, stock: 12 },
    ];

    tabletProducts.forEach((product, index) => {
      products.push({
        name: product.name,
        description: `Versatile ${product.name} perfect for work and entertainment`,
        price: product.price,
        category: tabletCategory._id,
        image: `https://placehold.co/400x400/708090/ffffff?text=${encodeURIComponent(
          product.name
        )}`,
        stock: product.stock,
        isActive: true,
      });
    });

    // Smart Home (6 products)
    const smartHomeCategory = insertedCategories.find(
      (cat) => cat.name === "Smart Home"
    );
    const smartHomeProducts = [
      { name: "Amazon Echo Dot 5", price: 49.99, stock: 100 },
      { name: "Google Nest Hub", price: 99.99, stock: 50 },
      { name: "Philips Hue Starter Kit", price: 199.99, stock: 30 },
      { name: "Ring Video Doorbell", price: 179.99, stock: 40 },
      { name: "Nest Thermostat", price: 129.99, stock: 25 },
      { name: "TP-Link Kasa Smart Plug", price: 14.99, stock: 200 },
    ];

    smartHomeProducts.forEach((product, index) => {
      products.push({
        name: product.name,
        description: `Smart ${product.name} to automate and enhance your home`,
        price: product.price,
        category: smartHomeCategory._id,
        image: `https://placehold.co/400x400/228B22/ffffff?text=${encodeURIComponent(
          product.name
        )}`,
        stock: product.stock,
        isActive: true,
      });
    });

    // Audio (5 products)
    const audioCategory = insertedCategories.find(
      (cat) => cat.name === "Audio"
    );
    const audioProducts = [
      { name: "Sonos Arc Soundbar", price: 899.99, stock: 15 },
      { name: "JBL Charge 5", price: 179.99, stock: 40 },
      { name: "Bose SoundLink Flex", price: 149.99, stock: 35 },
      { name: "Marshall Acton III", price: 279.99, stock: 20 },
      { name: "KEF LS50 Meta", price: 1499.99, stock: 8 },
    ];

    audioProducts.forEach((product, index) => {
      products.push({
        name: product.name,
        description: `Premium ${product.name} delivering exceptional audio experience`,
        price: product.price,
        category: audioCategory._id,
        image: `https://placehold.co/400x400/800080/ffffff?text=${encodeURIComponent(
          product.name
        )}`,
        stock: product.stock,
        isActive: true,
      });
    });

    // Accessories (7 products)
    const accessoryCategory = insertedCategories.find(
      (cat) => cat.name === "Accessories"
    );
    const accessoryProducts = [
      { name: "Anker PowerCore 10000", price: 29.99, stock: 150 },
      { name: "Belkin 3-in-1 Wireless Charger", price: 149.99, stock: 60 },
      { name: "Logitech MX Master 3S", price: 99.99, stock: 80 },
      { name: "SanDisk Extreme SSD 1TB", price: 149.99, stock: 45 },
      { name: "CalDigit TS4 Thunderbolt Hub", price: 399.99, stock: 20 },
      { name: "Peak Design Camera Strap", price: 59.99, stock: 75 },
      { name: "dbrand Phone Skin", price: 24.99, stock: 300 },
    ];

    accessoryProducts.forEach((product, index) => {
      products.push({
        name: product.name,
        description: `Essential ${product.name} to enhance your tech experience`,
        price: product.price,
        category: accessoryCategory._id,
        image: `https://placehold.co/400x400/DC143C/ffffff?text=${encodeURIComponent(
          product.name
        )}`,
        stock: product.stock,
        isActive: true,
      });
    });

    const productsResult = await db.collection("products").insertMany(products);
    console.log(`${productsResult.insertedCount} products inserted`);

    // Print summary
    const categoryCount = await db.collection("categories").countDocuments();
    const productCount = await db.collection("products").countDocuments();

    console.log("\nDatabase populated successfully!");
    console.log(`Categories: ${categoryCount}`);
    console.log(`Products: ${productCount}`);

    // Print products per category
    console.log("\nProducts per category:");
    for (const category of insertedCategories) {
      const count = await db.collection("products").countDocuments({
        category: category._id,
      });
      console.log(`${category.name}: ${count} products`);
    }
  } catch (error) {
    console.error("Error populating database:", error);
  } finally {
    await client.close();
  }
}

populateDatabase();
