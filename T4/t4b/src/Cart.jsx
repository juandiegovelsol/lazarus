// Cart.js
import React from "react";

function Cart({ cart, updateQuantity, removeFromCart }) {
  const total = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cart.map((product) => (
          <li key={product.id}>
            {product.name} x{" "}
            <input
              type="number"
              value={product.quantity}
              onChange={(e) => updateQuantity(product, e.target.value)}
            />
            - ${product.price * product.quantity}
            <button onClick={() => removeFromCart(product)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
}

export default Cart;
