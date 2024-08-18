import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  // Initialize cart state from localStorage
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Save cart to localStorage whenever cart state changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, { ...product, quantity }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => item.productId !== productId
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const updateQuantity = (product, quantity) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.productId === product.productId ? { ...item, quantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, setCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
