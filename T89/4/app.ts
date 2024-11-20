// Import required modules
import express, { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// Initialize Express app
const app = express();
app.use(express.json());

// Define product type
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  availability: number;
}

// Define purchase item type
interface PurchaseItem {
  id: number;
  quantity: number;
}

// Define purchase request body type
interface PurchaseRequestBody {
  products: PurchaseItem[];
}

// Define Joi validation schema for purchase request body
const purchaseSchema = Joi.object({
  products: Joi.array().required().items(
    Joi.object({
      id: Joi.number().integer().positive().required(),
      quantity: Joi.number().integer().positive().required(),
    }),
  ),
});

// Simulated products
const products: Product[] = [
  {
    id: 1,
    title: 'Product 1',
    price: 10,
    description: 'This is product 1',
    availability: 10,
  },
  {
    id: 2,
    title: 'Product 2',
    price: 3,
    description: 'This is product 2',
    availability: 15,
  },
  {
    id: 3,
    title: 'Product 3',
    price: 12,
    description: 'This is product 3',
    availability: 8,
  },
];

// Function to calculate discount for a product based on quantity
function calculateQuantityDiscount(quantity: number, price: number): number {
  let discountPercentage = Math.min(quantity - 1, 10); // Maximum 10% discount
  let discount = (price * discountPercentage * quantity) / 100;
  return discount;
}

// Endpoint to get all products
app.get('/products', (req: Request, res: Response) => {
  res.json(products);
});

// Endpoint to purchase products
app.post('/purchase', (req: Request, res: Response) => {
  try {
    // Validate request body
    const { error } = purchaseSchema.validate(req.body);
    if (error) {
      throw new Error('Invalid request body');
    }

    const purchaseRequestBody: PurchaseRequestBody = req.body;
    const productsRequest = purchaseRequestBody.products;

    // Check the product array in request object is not empty
    if (!productsRequest.length) {
        throw new Error('Invalid input, the products array must include at least one product');
    }

    // Check if products exist and have sufficient availability
    let total = 0;
    let totalQuantity = 0;
    let quantityDiscounts = 0;
    for (const item of productsRequest) {
      const product = products.find((p) => p.id === item.id);
      if (!product) {
        throw new Error(`Product with id ${item.id} does not exist`);
      }
      if (product.availability < item.quantity) {
        throw new Error(`Product with id ${item.id} does not have sufficient availability`);
      }
      totalQuantity += item.quantity;
      let itemTotal = product.price * item.quantity;
      if (item.quantity > 1) {
        let quantityDiscount = calculateQuantityDiscount(item.quantity, product.price);
        itemTotal -= quantityDiscount;
        quantityDiscounts += quantityDiscount;
      }
      total += itemTotal;
    }

    // Calculate total discount
    let totalDiscount = 0;
    let discountReason = '';
    if (total > 100) {
      totalDiscount = total * 0.15;
      discountReason = 'Total purchase exceeds 100';
    } else if (totalQuantity > 10) {
      totalDiscount = total * 0.05;
      discountReason = 'More than 10 products purchased';
    } else {
      totalDiscount = quantityDiscounts;
      discountReason = 'Quantity discounts';
    }

    // Update product availability
    for (const item of purchaseRequestBody.products) {
      const product = products.find((p) => p.id === item.id);
      if (product) {
        product.availability -= item.quantity;
      }
    }

    res.json({ total: total - totalDiscount, discount: totalDiscount, reason: discountReason });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Error handling middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});