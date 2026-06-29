import { createFileRoute } from "@tanstack/react-router";
import AdminLayout from "@/components/admin/AdminLayout";
import { getOrders, updateOrderStatus, deleteOrder, type Order } from "@/lib/shopStore";
import { formatPrice, getSession } from "@/lib/adminStore";
import { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  Eye,
  Package,
  Calendar,
  MapPin,
  Truck,
  CheckCircle2,
  XCircle,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | Order["orderStatus"]>("All");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const session = getSession();
  const canManage = session?.role === "owner" || session?.role === "admin";

  const loadOrders = () => setOrders(getOrders());

  useEffect(() => {
    loadOrders();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "kambiz_orders") loadOrders();
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const filteredOrders = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.shippingAddress.fullName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || o.orderStatus === statusFilter;

    let matchDate = true;
    if (dateFilter) {
      const orderDate = new Date(o.orderDate);
      const selectedDate = new Date(dateFilter);
      matchDate = orderDate.toDateString() === selectedDate.toDateString();
    }

    return matchSearch && matchStatus && matchDate;
  });

  const handleStatusUpdate = (orderId: string, status: Order["orderStatus"]) => {
    updateOrderStatus(orderId, status);
    loadOrders();
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, orderStatus: status });
    }
    toast.success(`Order ${orderId} marked as ${status}`);

    // Simulate Customer Notification via Event (to be picked up by App.tsx/NotificationCenter)
    window.dispatchEvent(
      new CustomEvent("kambiz_notification", {
        detail: { type: "status_update", orderId, status, customerId: selectedOrder?.customerId },
      }),
    );
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6 h-full relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-display">Order Management</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage and fulfill customer orders.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-wrap">
            <div className="relative w-full sm:w-40">
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className={`admin-input h-10 w-full bg-surface/50 text-sm ${!dateFilter ? "text-transparent" : ""}`}
              />
              {!dateFilter && (
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground text-sm">
                  Filter by Date
                </div>
              )}
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="admin-input h-10 w-full sm:w-40 bg-surface/50"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by Order ID or Name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="admin-input pl-9 h-10 w-full"
              />
            </div>
          </div>
        </div>

        {/* Layout Split if Order is selected */}
        <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
          {/* Orders List */}
          <div
            className={`flex-1 overflow-y-auto rounded-2xl glass border border-border/50 ${selectedOrder ? "hidden lg:block lg:w-1/2 xl:w-2/3" : "w-full"}`}
          >
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-white/5 border-b border-border/50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 font-semibold text-muted-foreground">Order ID</th>
                  <th className="px-6 py-4 font-semibold text-muted-foreground">Customer</th>
                  <th className="px-6 py-4 font-semibold text-muted-foreground">Date</th>
                  <th className="px-6 py-4 font-semibold text-muted-foreground">Total</th>
                  <th className="px-6 py-4 font-semibold text-muted-foreground">Status</th>
                  <th className="px-6 py-4 font-semibold text-muted-foreground text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                      No orders found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className={`hover:bg-white/5 transition-colors ${selectedOrder?.id === order.id ? "bg-primary/5" : ""}`}
                    >
                      <td className="px-6 py-4 font-medium">{order.id}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium">{order.shippingAddress.fullName}</div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 font-bold text-primary">
                        {formatPrice(order.totalAmount)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full ${
                            order.orderStatus === "Delivered"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : order.orderStatus === "Cancelled"
                                ? "bg-red-500/20 text-red-400"
                                : order.orderStatus === "Pending"
                                  ? "bg-orange-500/20 text-orange-400"
                                  : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end items-center gap-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors inline-flex items-center gap-2 text-xs font-semibold"
                          >
                            <Eye className="h-4 w-4" /> View
                          </button>
                          {canManage && (
                            <button
                              onClick={() => {
                                if (confirm("Are you sure you want to delete this order?")) {
                                  deleteOrder(order.id);
                                  toast.success(`Order ${order.id} deleted`);
                                  if (selectedOrder?.id === order.id) setSelectedOrder(null);
                                  loadOrders();
                                }
                              }}
                              className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition-colors inline-flex items-center gap-2 text-xs font-semibold"
                            >
                              <Trash2 className="h-4 w-4" /> Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Order Details Panel */}
          {selectedOrder && (
            <div className="lg:w-1/2 xl:w-1/3 flex flex-col rounded-2xl glass border border-border/50 overflow-y-auto h-full sticky top-0 relative">
              <div className="p-5 border-b border-border/50 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur z-10">
                <h2 className="font-bold text-lg">Order Details</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="lg:hidden p-2 bg-white/5 rounded-lg text-muted-foreground"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>

              <div className="p-5 space-y-6">
                {/* Header Info */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{selectedOrder.id}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="h-4 w-4" />{" "}
                      {new Date(selectedOrder.orderDate).toLocaleString()}
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs uppercase tracking-wider font-bold rounded-full ${
                      selectedOrder.orderStatus === "Delivered"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : selectedOrder.orderStatus === "Cancelled"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {selectedOrder.orderStatus}
                  </span>
                </div>

                {/* Status Update Actions */}
                <div className="bg-white/5 p-4 rounded-xl border border-border/50 space-y-3">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase">
                    Update Status
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["Pending", "Processing", "Packed", "Shipped", "Delivered", "Cancelled"].map(
                      (status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusUpdate(selectedOrder.id, status as any)}
                          disabled={selectedOrder.orderStatus === status}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                            selectedOrder.orderStatus === status
                              ? "bg-primary text-background"
                              : "bg-background/50 hover:bg-white/10"
                          }`}
                        >
                          {status}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                {/* Customer Details */}
                <div className="flex gap-4 p-4 rounded-xl glass border border-border/50">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">
                      {selectedOrder.shippingAddress.fullName}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {selectedOrder.shippingAddress.mobile}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {selectedOrder.shippingAddress.addressLine}
                      <br />
                      {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.district}
                      <br />
                      {selectedOrder.shippingAddress.state} -{" "}
                      {selectedOrder.shippingAddress.pincode}
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <h4 className="text-sm font-bold mb-3">Items Ordered</h4>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex gap-4 p-3 rounded-xl bg-white/5 border border-border/50"
                      >
                        <img
                          src={item.product.image}
                          className="h-12 w-12 rounded-lg object-cover bg-black/50"
                          alt={item.product.name}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm line-clamp-1">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {item.product.brand} | Size: {item.product.size}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Qty: {item.quantity} × {formatPrice(item.product.price)}
                          </p>
                        </div>
                        <div className="font-bold text-sm text-primary shrink-0">
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Summary */}
                <div>
                  <h4 className="text-sm font-bold mb-3">Payment Summary</h4>
                  <div className="p-4 rounded-xl glass border border-border/50 text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Method</span>
                      <span className="font-semibold">{selectedOrder.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <span className="font-semibold text-emerald-400">
                        {selectedOrder.paymentStatus}
                      </span>
                    </div>
                    <div className="h-px bg-border my-2" />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">{formatPrice(selectedOrder.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-semibold">{formatPrice(selectedOrder.shipping)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GST (18%)</span>
                      <span className="font-semibold">{formatPrice(selectedOrder.gst)}</span>
                    </div>
                    <div className="h-px bg-border my-2" />
                    <div className="flex justify-between text-lg">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-primary">
                        {formatPrice(selectedOrder.totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
