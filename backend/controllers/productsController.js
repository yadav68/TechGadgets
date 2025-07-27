import Category from "../models/Category.js";
import Product from "../models/Product.js";

// List all products (public)
export const listProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = { isActive: true };

    // Category filter
    if (req.query.category && req.query.category !== "all") {
      filter.category = req.query.category;
    }

    // Search filter
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
      ];
    }

    // Build sort object
    let sort = { createdAt: -1 };
    if (req.query.sortBy) {
      switch (req.query.sortBy) {
        case "price-low":
          sort = { price: 1 };
          break;
        case "price-high":
          sort = { price: -1 };
          break;
        case "name":
          sort = { name: 1 };
          break;
        case "newest":
          sort = { createdAt: -1 };
          break;
        default:
          sort = { createdAt: -1 };
      }
    }

    // Get total count for pagination
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);

    // Get products with pagination
    const products = await Product.find(filter)
      .populate("category", "name")
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.json({
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        limit,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// View a single product (public)
export const showProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name description"
    );
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Show create form (admin only)
export const showCreateForm = (req, res) => {
  res.render("products/create", { title: "Add Product" });
};

// Create product (admin only)
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, stock } = req.body;

    // Validate category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ error: "Category not found" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image,
      category,
      stock,
    });
    const populatedProduct = await Product.findById(product._id).populate(
      "category",
      "name"
    );

    res.status(201).json({
      message: "Product created successfully",
      product: populatedProduct,
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Show edit form (admin only)
export const showEditForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    res.render("products/edit", { title: "Edit Product", product });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Update product (admin only)
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, stock } = req.body;

    // Validate category exists if it's being updated
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ error: "Category not found" });
      }
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, image, category, stock },
      { new: true }
    ).populate("category", "name");

    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Delete product (admin only)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};
