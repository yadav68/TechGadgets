// Simple test script to verify pagination API with filtering and sorting
const fetch = require("node-fetch");

async function testPaginationWithFilters() {
  try {
    console.log("Testing pagination API with filtering and sorting...");

    // Test 1: Basic pagination
    console.log("\n--- Test 1: Basic Pagination ---");
    const basicResponse = await fetch(
      "http://localhost:5002/api/products?page=1&limit=3"
    );
    const basicData = await basicResponse.json();
    console.log(
      "Basic pagination - Products count:",
      basicData.products?.length
    );
    console.log("Basic pagination - Pagination info:", basicData.pagination);

    // Test 2: Pagination with search filter
    console.log("\n--- Test 2: Pagination with Search Filter ---");
    const searchResponse = await fetch(
      "http://localhost:5002/api/products?search=iPhone&page=1&limit=3"
    );
    const searchData = await searchResponse.json();
    console.log("Search filter - Products count:", searchData.products?.length);
    console.log("Search filter - Pagination info:", searchData.pagination);
    console.log(
      "Search filter - Products:",
      searchData.products?.map((p) => p.name)
    );

    // Test 3: Pagination with category filter
    console.log("\n--- Test 3: Pagination with Category Filter ---");
    // First get categories to find a category ID
    const categoriesResponse = await fetch(
      "http://localhost:5002/api/categories"
    );
    const categoriesData = await categoriesResponse.json();
    const firstCategory = categoriesData.categories?.[0];

    if (firstCategory) {
      const categoryResponse = await fetch(
        `http://localhost:5002/api/products?category=${firstCategory._id}&page=1&limit=3`
      );
      const categoryData = await categoryResponse.json();
      console.log(
        `Category filter (${firstCategory.name}) - Products count:`,
        categoryData.products?.length
      );
      console.log(
        "Category filter - Pagination info:",
        categoryData.pagination
      );
    }

    // Test 4: Pagination with sorting
    console.log("\n--- Test 4: Pagination with Sorting ---");
    const sortResponse = await fetch(
      "http://localhost:5002/api/products?sortBy=price-low&page=1&limit=3"
    );
    const sortData = await sortResponse.json();
    console.log(
      "Sort by price (low) - Products count:",
      sortData.products?.length
    );
    console.log("Sort by price (low) - Pagination info:", sortData.pagination);
    console.log(
      "Sort by price (low) - Products:",
      sortData.products?.map((p) => `${p.name}: $${p.price}`)
    );

    // Test 5: Pagination with multiple filters
    console.log("\n--- Test 5: Pagination with Multiple Filters ---");
    const multiResponse = await fetch(
      "http://localhost:5002/api/products?search=Samsung&sortBy=price-high&page=1&limit=2"
    );
    const multiData = await multiResponse.json();
    console.log(
      "Multiple filters - Products count:",
      multiData.products?.length
    );
    console.log("Multiple filters - Pagination info:", multiData.pagination);
    console.log(
      "Multiple filters - Products:",
      multiData.products?.map((p) => `${p.name}: $${p.price}`)
    );
  } catch (error) {
    console.error("Test failed:", error.message);
  }
}

testPaginationWithFilters();
