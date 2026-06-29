import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useShop } from "@/lib/useShop";
import { updateCartQuantity, removeFromCart } from "@/lib/shopStore";
import { formatPrice } from "@/lib/adminStore";
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const { cart, cartSubtotal } = useShop();
  const navigate = useNavigate();

  const gst = cartSubtotal * 0.18;
  const shipping = cartSubtotal > 0 ? 500 : 0;
  const total = cartSubtotal + gst + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-16 px-4 flex flex-col items-center justify-center">
        <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <ShoppingBag className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <p className="text-muted-foreground mt-4 text-center max-w-md">
          Looks like you haven't added any tyres to your cart yet. Explore our range of premium
          tyres.
        </p>
        <Link to="/" className="btn-hero mt-8">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="p-4 sm:p-6 rounded-3xl glass border border-border/50 flex flex-col sm:flex-row gap-6 relative"
              >
                <div className="aspect-square w-full sm:w-32 rounded-2xl overflow-hidden glass shrink-0 bg-white/5">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                        {item.product.brand}
                      </span>
                      <h3 className="text-lg font-bold mt-1 line-clamp-1">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Size: {item.product.size}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-muted-foreground hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors shrink-0"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center rounded-xl glass border border-border/50 h-10 px-1">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-background/50 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-background/50 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xl font-bold">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="p-6 rounded-3xl glass-strong border border-border/50 sticky top-28">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="flex flex-col gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal ({cart.length} items)</span>
                <span className="font-semibold">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping Charge</span>
                <span className="font-semibold">{formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated GST (18%)</span>
                <span className="font-semibold">{formatPrice(gst)}</span>
              </div>

              <div className="h-px bg-border my-2" />

              <div className="flex justify-between items-end">
                <span className="font-bold text-lg">Grand Total</span>
                <span className="font-bold text-2xl text-primary">{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate({ to: "/checkout" })}
              className="mt-8 w-full h-14 rounded-2xl bg-primary text-background font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-glow"
            >
              Proceed to Checkout <ArrowRight className="h-5 w-5" />
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4" /> Secure Checkout Process
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
