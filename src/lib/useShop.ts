import { useState, useEffect } from "react";
import { getCart, getShopSession, CartItem, Customer } from "./shopStore";

export function useShop() {
  const [cart, setCart] = useState<CartItem[]>(() => getCart());
  const [session, setSession] = useState<Customer | null>(() => getShopSession());

  useEffect(() => {
    // Initial load
    setCart(getCart());
    setSession(getShopSession());

    // Listen to storage events for cross-tab or same-tab synchronization
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "kambiz_cart") setCart(getCart());
      if (e.key === "kambiz_shop_session") setSession(getShopSession());
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return { cart, session, cartItemsCount, cartSubtotal };
}
