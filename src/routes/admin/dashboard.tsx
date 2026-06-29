import { createFileRoute, Link } from "@tanstack/react-router";
import AdminLayout from "@/components/admin/AdminLayout";
import StatCard from "@/components/admin/StatCard";
import { getProducts, getUsers, formatPrice } from "@/lib/adminStore";
import { getOrders } from "@/lib/shopStore";
import {
  Package,
  Users,
  Tag,
  CheckCircle,
  ArrowRight,
  Plus,
  IndianRupee,
  ShoppingCart,
} from "lucide-react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const products = useMemo(() => getProducts(), []);
  const users = useMemo(() => getUsers(), []);
  const orders = useMemo(() => getOrders(), []);

  const [timeFilter, setTimeFilter] = useState("All Time");

  const filteredOrders = useMemo(() => {
    const now = new Date();
    return orders.filter((o) => {
      if (timeFilter === "All Time") return true;
      const orderDate = new Date(o.orderDate);
      if (timeFilter === "Today") {
        return orderDate.toDateString() === now.toDateString();
      }
      if (timeFilter === "Last 7 Days") {
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return orderDate >= sevenDaysAgo;
      }
      if (timeFilter === "This Month") {
        return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
      }
      return true;
    });
  }, [orders, timeFilter]);

  const inStockCount = products.filter((p) => p.inStock).length;
  const categories = new Set(products.map((p) => p.category)).size;

  const totalRevenue = filteredOrders.reduce(
    (sum, order) => sum + (order.orderStatus !== "Cancelled" ? order.totalAmount : 0),
    0,
  );
  const pendingOrdersCount = filteredOrders.filter((o) => o.orderStatus === "Pending").length;

  const recentProducts = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const recentOrders = [...filteredOrders].slice(0, 5);

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Welcome back. Here's what's happening with your tyre store today.
          </p>
        </div>
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="admin-input h-10 w-full sm:w-48 bg-surface/50"
        >
          <option value="All Time">All Time</option>
          <option value="Today">Today</option>
          <option value="Last 7 Days">Last 7 Days</option>
          <option value="This Month">This Month</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={IndianRupee}
          sub={timeFilter === "All Time" ? "Lifetime sales" : `Sales for ${timeFilter}`}
          color="emerald"
          delay={0}
        />
        <StatCard
          label="Total Orders"
          value={filteredOrders.length}
          icon={ShoppingCart}
          sub={`${pendingOrdersCount} pending orders`}
          color="blue"
          delay={0.1}
        />
        <StatCard
          label="Products"
          value={products.length}
          icon={Package}
          sub={`${inStockCount} in stock`}
          color="primary"
          delay={0.2}
        />
        <StatCard
          label="Customers"
          value={users.length}
          icon={Users}
          sub="Registered users"
          color="purple"
          delay={0.3}
        />
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            to="/admin/products/add"
            id="dashboard-add-product"
            className="flex items-center justify-between rounded-2xl bg-primary/10 ring-1 ring-primary/20 p-5 hover:bg-primary/15 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/20 p-2">
                <Plus className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-sm">Add New Product</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  List a new tyre or accessory
                </div>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 duration-200" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/admin/users"
            id="dashboard-manage-users"
            className="flex items-center justify-between rounded-2xl bg-blue-500/10 ring-1 ring-blue-500/20 p-5 hover:bg-blue-500/15 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-500/20 p-2">
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="font-semibold text-sm">Manage Users</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  Add team members & set permissions
                </div>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 duration-200" />
          </Link>
        </motion.div>
      </div>

      {/* Recent products */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="glass rounded-2xl ring-1 ring-border overflow-hidden"
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-semibold text-sm">Recent Products</h2>
          <Link to="/admin/products" className="text-xs text-primary hover:underline">
            View all →
          </Link>
        </div>
        <div className="divide-y divide-border">
          {recentProducts.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No products yet. Add your first one!
            </div>
          ) : (
            recentProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-4 p-4">
                <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-surface">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{product.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {product.brand} · {product.category}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-semibold text-primary">{product.price}</div>
                  <div
                    className={`text-[10px] font-medium ${
                      product.inStock ? "text-emerald-400" : "text-muted-foreground"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </AdminLayout>
  );
}
