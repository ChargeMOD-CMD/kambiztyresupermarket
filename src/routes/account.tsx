import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useShop } from "@/lib/useShop";
import {
  getOrders,
  createMockCustomer,
  setShopSession,
  updateOrderStatus,
  updateCustomer,
} from "@/lib/shopStore";
import { formatPrice } from "@/lib/adminStore";
import {
  Package,
  User,
  MapPin,
  Heart,
  LogOut,
  Search,
  Clock,
  CheckCircle2,
  XCircle,
  Home,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/account")({
  component: AccountPage,
});

function AccountPage() {
  const { session } = useShop();
  const [activeTab, setActiveTab] = useState<"orders" | "profile" | "addresses">("orders");
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    mobile: "",
    addressLine: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    country: "India",
    isDefault: false,
  });
  const orders = getOrders().filter((o) => o.customerId === session?.id);

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;

    const addressWithId = {
      ...newAddress,
      id: `addr-${Date.now()}`,
    };

    let updatedAddresses = [...(session.addresses || [])];

    // If setting as default, remove default from others
    if (newAddress.isDefault) {
      updatedAddresses = updatedAddresses.map((a) => ({ ...a, isDefault: false }));
    } else if (updatedAddresses.length === 0) {
      // First address is always default
      addressWithId.isDefault = true;
    }

    updatedAddresses.push(addressWithId);

    updateCustomer(session.id, { addresses: updatedAddresses });
    setShopSession({ ...session, addresses: updatedAddresses });
    toast.success("Address added successfully");
    setIsAddingAddress(false);
    setNewAddress({
      fullName: "",
      mobile: "",
      addressLine: "",
      city: "",
      district: "",
      state: "",
      pincode: "",
      country: "India",
      isDefault: false,
    });
  };

  const handleLogout = () => {
    setShopSession(null);
    toast.success("Logged out successfully");
  };

  const handleCancelOrder = (orderId: string) => {
    if (confirm("Are you sure you want to cancel this order?")) {
      updateOrderStatus(orderId, "Cancelled");
      toast.success("Order Cancelled");
      window.dispatchEvent(new StorageEvent("storage", { key: "kambiz_orders" }));
    }
  };

  if (!session) {
    return (
      <main className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4">
        <div className="w-full max-w-md p-8 rounded-3xl glass border border-border/50">
          <h1 className="text-2xl font-bold text-center mb-6">Customer Login</h1>
          <p className="text-muted-foreground text-center mb-6">
            Sign in to view your orders, saved addresses, and profile information.
          </p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("kambiz_require_login"))}
            className="w-full btn-hero"
          >
            Sign In / Register
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold">My Account</h1>
            <p className="text-muted-foreground">Welcome back, {session.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-border/50 hover:bg-white/5 text-sm transition-colors"
            >
              <Home className="h-4 w-4" /> Home
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-border/50 hover:bg-white/5 text-sm text-red-400 transition-colors"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-2">
            {[
              { id: "orders", label: "My Orders", icon: Package },
              { id: "profile", label: "Profile Information", icon: User },
              { id: "addresses", label: "Saved Addresses", icon: MapPin },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-left transition-colors border ${activeTab === tab.id ? "bg-primary/10 border-primary text-primary" : "glass border-border/50 hover:bg-white/5"}`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-semibold">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Order History</h2>
                </div>

                {orders.length === 0 ? (
                  <div className="p-12 rounded-3xl glass border border-border/50 text-center flex flex-col items-center">
                    <Package className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold">No Orders Yet</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      You haven't placed any orders. Start exploring our premium tyres.
                    </p>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-6 rounded-3xl glass border border-border/50 flex flex-col gap-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/50">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-lg">{order.id}</span>
                            <span
                              className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full ${
                                order.orderStatus === "Delivered"
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : order.orderStatus === "Cancelled"
                                    ? "bg-red-500/20 text-red-400"
                                    : "bg-blue-500/20 text-blue-400"
                              }`}
                            >
                              {order.orderStatus}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Placed on {new Date(order.orderDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="font-bold text-xl text-primary">
                            {formatPrice(order.totalAmount)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {order.items.length} Items
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-4">
                            <img
                              src={item.product.image}
                              className="h-12 w-12 rounded-lg object-cover bg-white/5"
                              alt={item.product.name}
                            />
                            <div>
                              <p className="font-semibold text-sm line-clamp-1">
                                {item.product.name}
                              </p>
                              <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
                        {order.orderStatus !== "Cancelled" && order.orderStatus !== "Delivered" && (
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                            className="px-4 py-2 text-xs font-semibold rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                          >
                            Cancel Order
                          </button>
                        )}
                        <button className="px-4 py-2 text-xs font-semibold rounded-xl glass border border-border/50 hover:bg-white/5 transition-colors">
                          Download Invoice
                        </button>
                        <button className="px-4 py-2 text-xs font-semibold rounded-xl bg-primary text-background hover:bg-primary/90 transition-colors">
                          Track Order
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="p-6 sm:p-8 rounded-3xl glass border border-border/50">
                <h2 className="text-xl font-bold mb-6">Profile Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <input type="text" className="admin-input" defaultValue={session.name} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="admin-input"
                      defaultValue={session.email}
                      readOnly
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">
                      Mobile Number
                    </label>
                    <input type="tel" className="admin-input" defaultValue={session.mobile} />
                  </div>
                </div>
                <button className="btn-hero mt-8">Save Changes</button>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Saved Addresses</h2>
                  {!isAddingAddress && (
                    <button
                      onClick={() => setIsAddingAddress(true)}
                      className="btn-hero py-2 px-4 text-sm"
                    >
                      Add New Address
                    </button>
                  )}
                </div>

                {isAddingAddress && (
                  <form
                    onSubmit={handleAddAddress}
                    className="p-6 rounded-2xl glass border border-border/50 space-y-4 animate-in fade-in zoom-in-95 duration-200"
                  >
                    <h3 className="font-bold text-lg mb-4">Add New Address</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={newAddress.fullName}
                          onChange={(e) =>
                            setNewAddress({ ...newAddress, fullName: e.target.value })
                          }
                          className="admin-input mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">Mobile</label>
                        <input
                          type="tel"
                          required
                          value={newAddress.mobile}
                          onChange={(e) => setNewAddress({ ...newAddress, mobile: e.target.value })}
                          className="admin-input mt-1"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-xs font-medium text-muted-foreground">
                          Address Line
                        </label>
                        <input
                          type="text"
                          required
                          value={newAddress.addressLine}
                          onChange={(e) =>
                            setNewAddress({ ...newAddress, addressLine: e.target.value })
                          }
                          className="admin-input mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">City</label>
                        <input
                          type="text"
                          required
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                          className="admin-input mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">
                          District
                        </label>
                        <input
                          type="text"
                          required
                          value={newAddress.district}
                          onChange={(e) =>
                            setNewAddress({ ...newAddress, district: e.target.value })
                          }
                          className="admin-input mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">State</label>
                        <input
                          type="text"
                          required
                          value={newAddress.state}
                          onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                          className="admin-input mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">Pincode</label>
                        <input
                          type="text"
                          required
                          value={newAddress.pincode}
                          onChange={(e) =>
                            setNewAddress({ ...newAddress, pincode: e.target.value })
                          }
                          className="admin-input mt-1"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 pt-2">
                      <input
                        type="checkbox"
                        id="defaultAddress"
                        checked={newAddress.isDefault}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, isDefault: e.target.checked })
                        }
                        className="rounded border-border/50 bg-white/5"
                      />
                      <label htmlFor="defaultAddress" className="text-sm cursor-pointer">
                        Set as default address
                      </label>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
                      <button
                        type="button"
                        onClick={() => setIsAddingAddress(false)}
                        className="px-4 py-2 rounded-xl text-sm font-semibold hover:bg-white/5 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-primary text-background text-sm font-semibold hover:bg-primary/90 transition-colors"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  {session.addresses?.map((addr) => (
                    <div
                      key={addr.id}
                      className="p-5 rounded-2xl glass border border-border/50 flex flex-col gap-2 relative overflow-hidden"
                    >
                      {addr.isDefault && (
                        <div className="absolute top-0 right-0 bg-primary text-background text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                          DEFAULT
                        </div>
                      )}
                      <h3 className="font-bold">{addr.fullName}</h3>
                      <p className="text-sm text-muted-foreground">{addr.mobile}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {addr.addressLine}
                        <br />
                        {addr.city}, {addr.district}
                        <br />
                        {addr.state} - {addr.pincode}
                      </p>

                      <div className="flex gap-3 mt-4 pt-4 border-t border-border/50">
                        <button className="text-xs font-semibold text-primary hover:underline">
                          Edit
                        </button>
                        <button className="text-xs font-semibold text-red-400 hover:underline">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
