/**
 * Handles pagination for an e-commerce product listing.
 *
 * @param {Array} items - The array of products to be paginated.
 * @param {number} pageSize - The number of products per page.
 * @param {number} currentPage - The current page number.
 *
 * @returns {Object} An object containing the paginated items and pagination metadata.
 * @throws {Error} If items is not an array, or if pageSize or currentPage is not a positive number.
 */
function paginateProducts(items, pageSize, currentPage) {
  // Check if items is an array to ensure correct input type
  if (!Array.isArray(items)) {
    throw new Error("Items must be an array");
  }

  // Convert pageSize and currentPage to integers to handle potential string inputs
  pageSize = parseInt(pageSize);
  currentPage = parseInt(currentPage);

  // Validate pageSize and currentPage to ensure they are positive numbers
  if (isNaN(pageSize) || pageSize < 1) {
    throw new Error("Page size must be a positive number");
  }

  if (isNaN(currentPage) || currentPage < 1) {
    throw new Error("Current page must be a positive number");
  }

  // Calculate total items and total pages
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Adjust currentPage if it exceeds total pages
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  // Calculate start and end indices for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  // Return the paginated items and pagination metadata
  return {
    /**
     * The array of paginated items.
     */
    items: items.slice(startIndex, endIndex),
    /**
     * Pagination metadata.
     */
    pagination: {
      /**
       * The current page number.
       */
      currentPage,
      /**
       * The number of items per page.
       */
      pageSize,
      /**
       * The total number of pages.
       */
      totalPages,
      /**
       * The total number of items.
       */
      totalItems,
      /**
       * Whether there is a next page.
       */
      hasNextPage: currentPage < totalPages,
      /**
       * Whether there is a previous page.
       */
      hasPrevPage: currentPage > 1,
    },
  };
}

// Example usage scenarios:
const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Paginate products with 5 items per page, starting from page 1
const paginatedProducts = paginateProducts(products, 5, 1);
console.log(paginatedProducts);

// Paginate products with 3 items per page, starting from page 2
const paginatedProducts2 = paginateProducts(products, 3, 2);
console.log(paginatedProducts2);

// Error cases that are handled:
try {
  paginateProducts("not an array", 5, 1); // Throws 'Items must be an array'
} catch (error) {
  console.error(error);
}

try {
  paginateProducts([1, 2, 3], "not a number", 1); // Throws 'Page size must be a positive number'
} catch (error) {
  console.error(error);
}

try {
  paginateProducts([1, 2, 3], 5, "not a number"); // Throws 'Current page must be a positive number'
} catch (error) {
  console.error(error);
}

// Edge cases to be aware of:
// - When the total number of items is exactly divisible by the page size, the last page will have the same number of items as the page size.
// - When the total number of items is less than the page size, there will only be one page.
// - When the current page exceeds the total number of pages, it will be adjusted to the last page.
