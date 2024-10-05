import React from "react";

const Cart = ({ cart, updateQuantity, removeFromCart }) => {
  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} x{" "}
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, e.target.value)}
            />{" "}
            - ${item.price * item.quantity}
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>
        Total: $
        {cart
          .reduce((acc, item) => acc + item.price * item.quantity, 0)
          .toFixed(2)}
      </p>
    </div>
  );
};

export default Cart;
