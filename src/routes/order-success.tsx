import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, Copy, MapPin, Package, Smartphone, Check } from "lucide-react";
import { getOrders } from "@/lib/shopStore";

export const Route = createFileRoute("/order-success")({
  component: OrderSuccessPage,
});

function OrderSuccessPage() {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState<unknown>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!orderId) {
      navigate({ to: "/" });
      return;
    }
    const orders = getOrders();
    const found = orders.find((o) => o.id === orderId);
    if (!found) {
      navigate({ to: "/" });
    } else {
      setOrder(found);
    }
  }, [orderId, navigate]);

  const copyTracking = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!order) return null;

  return (
    <main className="min-h-screen pt-32 pb-20 bg-background/50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-card glass-strong rounded-3xl border border-border shadow-2xl p-8 sm:p-12 text-center animate-in fade-in slide-in-from-bottom-8 duration-500">
        <div className="h-24 w-24 rounded-full bg-emerald-500/20 mx-auto flex items-center justify-center mb-8 relative">
          <div className="absolute inset-0 rounded-full border-4 border-emerald-500/30 animate-[spin_3s_linear_infinite]" />
          <CheckCircle2 className="h-12 w-12 text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Order Placed Successfully!</h1>
        <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
          Thank you for choosing Kambiz Tyre Supermarket. Your premium tyres are being prepared for
          dispatch.
        </p>

        {/* Tracking Card */}
        <div className="bg-background/50 border border-primary/30 rounded-2xl p-6 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Package className="h-32 w-32" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
            <div className="text-left flex-1">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">
                Tracking ID
              </p>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-mono font-bold">{orderId}</span>
                <button
                  onClick={copyTracking}
                  className="p-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="w-full sm:w-px h-px sm:h-16 bg-border" />

            <div className="text-left flex-1">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Notifications Sent To
              </p>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-sm">
                  <Smartphone className="h-4 w-4 text-emerald-400" />
                  <span>WhatsApp: {order.shippingAddress.mobile}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Delivery to {order.shippingAddress.city}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/account" className="btn-hero w-full sm:w-auto min-w-[200px]">
            Track Order Status
          </Link>
          <Link to="/" className="btn-ghost-glow w-full sm:w-auto min-w-[200px]">
            Return to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
