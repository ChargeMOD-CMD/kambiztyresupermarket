import { createFileRoute } from "@tanstack/react-router";
import AdminLayout from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";
import { Search, UserCheck, Mail, Phone, MapPin, Eye, Pencil, Trash2, X } from "lucide-react";
import { type Customer, getCustomers, updateCustomer, deleteCustomer, getOrders } from "@/lib/shopStore";
import { getSession } from "@/lib/adminStore";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/customers")({
  component: AdminCustomers,
});

function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [activityFilter, setActivityFilter] = useState("All");
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const session = getSession();
  const canManage = session?.role === "owner" || session?.role === "admin";

  const loadCustomers = () => {
    setCustomers(getCustomers());
  };

  useEffect(() => {
    loadCustomers();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "kambiz_customers") loadCustomers();
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const filtered = customers.filter((c) => {
    const matchSearch = 
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.mobile.includes(search);
      
    let matchActivity = true;
    if (activityFilter !== "All") {
      const allOrders = getOrders();
      const hasOrders = allOrders.some(o => o.customerId === c.id);
      if (activityFilter === "Active") matchActivity = hasOrders;
      if (activityFilter === "Inactive") matchActivity = !hasOrders;
    }
    
    return matchSearch && matchActivity;
  });

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-display">Customers</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage registered users and their details.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <select
              value={activityFilter}
              onChange={(e) => setActivityFilter(e.target.value)}
              className="admin-input h-10 w-full sm:w-48 bg-surface/50"
            >
              <option value="All">All Customers</option>
              <option value="Active">Active (Ordered)</option>
              <option value="Inactive">Inactive (No Orders)</option>
            </select>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by Name, Email or Phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="admin-input pl-9 h-10 w-full"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl glass border border-border/50">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white/5 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-semibold text-muted-foreground">Customer</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground">Contact</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground">Location</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                    No customers found matching your search.
                  </td>
                </tr>
              ) : (
                filtered.map((customer) => (
                  <tr key={customer.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center">
                          {customer.name[0].toUpperCase()}
                        </div>
                        <span className="font-medium">{customer.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-3.5 w-3.5" /> {customer.email}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="h-3.5 w-3.5" /> {customer.mobile}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        {customer.addresses[0] ? (
                          <>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="h-3.5 w-3.5" /> {customer.addresses[0].city},{" "}
                              {customer.addresses[0].state}
                            </div>
                            <span className="text-xs text-muted-foreground ml-5">
                              {customer.addresses[0].pincode}
                            </span>
                          </>
                        ) : (
                          <span className="text-muted-foreground">No address saved</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <button className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors inline-flex items-center gap-2 text-xs font-semibold">
                          <Eye className="h-4 w-4" /> View Details
                        </button>
                        {canManage && (
                          <>
                            <button
                              onClick={() => setEditingCustomer(customer)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm("Are you sure you want to delete this customer?")) {
                                  deleteCustomer(customer.id);
                                  toast.success("Customer deleted");
                                }
                              }}
                              className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card glass-strong w-full max-w-md rounded-3xl border border-border shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Edit Customer</h3>
              <button
                onClick={() => setEditingCustomer(null)}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <input
                  type="text"
                  value={editingCustomer.name}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                  className="admin-input mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <input
                  type="email"
                  value={editingCustomer.email}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
                  className="admin-input mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Mobile</label>
                <input
                  type="tel"
                  value={editingCustomer.mobile}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, mobile: e.target.value })}
                  className="admin-input mt-1"
                />
              </div>
              <button
                onClick={() => {
                  updateCustomer(editingCustomer.id, {
                    name: editingCustomer.name,
                    email: editingCustomer.email,
                    mobile: editingCustomer.mobile,
                  });
                  setEditingCustomer(null);
                  toast.success("Customer details updated");
                }}
                className="btn-hero w-full mt-6"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
