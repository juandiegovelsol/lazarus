/**
 * Handles pagination for an e-commerce product listing.
 *
 * @param {Array} items - The list of products to be paginated.
 * @param {number} pageSize - The number of products to display per page.
 * @param {number} currentPage - The current page number.
 * @returns {Object} An object containing the paginated items and pagination metadata.
 * @throws {Error} If items is not an array, or if pageSize or currentPage is not a positive number.
 */
function paginateProducts(items, pageSize, currentPage) {
  if (!Array.isArray(items)) {
    throw new Error("Items must be an array");
  }

  pageSize = parseInt(pageSize);
  currentPage = parseInt(currentPage);

  if (isNaN(pageSize) || pageSize < 1) {
    throw new Error("Page size must be a positive number");
  }

  if (isNaN(currentPage) || currentPage < 1) {
    throw new Error("Current page must be a positive number");
  }

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  return {
    /**
     * The list of products for the current page.
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
       * The number of products per page.
       */
      pageSize,
      /**
       * The total number of pages.
       */
      totalPages,
      /**
       * The total number of products.
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

// Example 1: Paginate a list of 10 products with a page size of 3
const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const paginatedProducts = paginateProducts(products, 3, 1);
console.log(paginatedProducts);
// Output:
// {
//   items: [1, 2, 3],
//   pagination: {
//     currentPage: 1,
//     pageSize: 3,
//     totalPages: 4,
//     totalItems: 10,
//     hasNextPage: true,
//     hasPrevPage: false
//   }
// }

// Example 2: Paginate a list of 10 products with a page size of 5 and current page 2
const products2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const paginatedProducts2 = paginateProducts(products2, 5, 2);
console.log(paginatedProducts2);
// Output:
// {
//   items: [6, 7, 8, 9, 10],
//   pagination: {
//     currentPage: 2,
//     pageSize: 5,
//     totalPages: 2,
//     totalItems: 10,
//     hasNextPage: false,
//     hasPrevPage: true
//   }
// }
