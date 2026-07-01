import { createFileRoute } from "@tanstack/react-router";
import AdminLayout from "@/components/admin/AdminLayout";
import { getRequests, updateRequestStatus, deleteRequest, type ServiceRequest } from "@/lib/shopStore";
import { getSession } from "@/lib/adminStore";
import { useState, useEffect } from "react";
import {
  Search,
  Eye,
  Calendar,
  Phone,
  Car,
  XCircle,
  Trash2,
  Wrench
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/requests")({
  component: AdminRequests,
});

function AdminRequests() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | ServiceRequest["status"]>("All");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);

  const session = getSession();
  const canManage = session?.role === "owner" || session?.role === "admin";

  const loadRequests = () => setRequests(getRequests());

  useEffect(() => {
    loadRequests();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "kambiz_requests") loadRequests();
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const filteredRequests = requests.filter((r) => {
    const matchSearch =
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.phone.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || r.status === statusFilter;

    let matchDate = true;
    if (dateFilter) {
      const requestDate = new Date(r.date);
      const selectedDate = new Date(dateFilter);
      matchDate = requestDate.toDateString() === selectedDate.toDateString();
    }

    return matchSearch && matchStatus && matchDate;
  });

  const handleStatusUpdate = (requestId: string, status: ServiceRequest["status"]) => {
    updateRequestStatus(requestId, status);
    loadRequests();
    if (selectedRequest && selectedRequest.id === requestId) {
      setSelectedRequest({ ...selectedRequest, status });
    }
    toast.success(`Request ${requestId} marked as ${status}`);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6 h-full relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-display">Service Requests</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage incoming contact form submissions and service requests.
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
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by ID, Name or Phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="admin-input pl-9 h-10 w-full"
              />
            </div>
          </div>
        </div>

        {/* Layout Split if Request is selected */}
        <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
          {/* Requests List */}
          <div
            className={`flex-1 overflow-y-auto rounded-2xl glass border border-border/50 ${selectedRequest ? "hidden lg:block lg:w-1/2 xl:w-2/3" : "w-full"}`}
          >
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-white/5 border-b border-border/50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 font-semibold text-muted-foreground">Request ID</th>
                  <th className="px-6 py-4 font-semibold text-muted-foreground">Customer</th>
                  <th className="px-6 py-4 font-semibold text-muted-foreground">Service</th>
                  <th className="px-6 py-4 font-semibold text-muted-foreground">Date</th>
                  <th className="px-6 py-4 font-semibold text-muted-foreground">Status</th>
                  <th className="px-6 py-4 font-semibold text-muted-foreground text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                      No requests found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((request) => (
                    <tr
                      key={request.id}
                      className={`hover:bg-white/5 transition-colors ${selectedRequest?.id === request.id ? "bg-primary/5" : ""}`}
                    >
                      <td className="px-6 py-4 font-medium">{request.id}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium">{request.name}</div>
                        <div className="text-xs text-muted-foreground">{request.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                           <Wrench className="h-4 w-4 text-primary" />
                           {request.service || "General Inquiry"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(request.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full ${
                            request.status === "Completed"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : request.status === "Cancelled"
                                ? "bg-red-500/20 text-red-400"
                                : request.status === "Pending"
                                  ? "bg-orange-500/20 text-orange-400"
                                  : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end items-center gap-2">
                          <button
                            onClick={() => setSelectedRequest(request)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors inline-flex items-center gap-2 text-xs font-semibold"
                          >
                            <Eye className="h-4 w-4" /> View
                          </button>
                          {canManage && (
                            <button
                              onClick={() => {
                                if (confirm("Are you sure you want to delete this request?")) {
                                  deleteRequest(request.id);
                                  toast.success(`Request ${request.id} deleted`);
                                  if (selectedRequest?.id === request.id) setSelectedRequest(null);
                                  loadRequests();
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

          {/* Request Details Panel */}
          {selectedRequest && (
            <div className="lg:w-1/2 xl:w-1/3 flex flex-col rounded-2xl glass border border-border/50 overflow-y-auto h-full sticky top-0 relative">
              <div className="p-5 border-b border-border/50 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur z-10">
                <h2 className="font-bold text-lg">Request Details</h2>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="lg:hidden p-2 bg-white/5 rounded-lg text-muted-foreground"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>

              <div className="p-5 space-y-6">
                {/* Header Info */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{selectedRequest.id}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="h-4 w-4" />{" "}
                      {new Date(selectedRequest.date).toLocaleString()}
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs uppercase tracking-wider font-bold rounded-full ${
                      selectedRequest.status === "Completed"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : selectedRequest.status === "Cancelled"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {selectedRequest.status}
                  </span>
                </div>

                {/* Status Update Actions */}
                <div className="bg-white/5 p-4 rounded-xl border border-border/50 space-y-3">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase">
                    Update Status
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["Pending", "In Progress", "Completed", "Cancelled"].map(
                      (status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusUpdate(selectedRequest.id, status as any)}
                          disabled={selectedRequest.status === status}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                            selectedRequest.status === status
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
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">
                      {selectedRequest.name || "N/A"}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {selectedRequest.phone || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Vehicle & Service */}
                <div className="flex gap-4 p-4 rounded-xl glass border border-border/50">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Car className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">
                      Vehicle: {selectedRequest.vehicle || "N/A"}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Service: {selectedRequest.service || "General Inquiry"}
                    </p>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <h4 className="text-sm font-bold mb-3">Message</h4>
                  <div className="p-4 rounded-xl glass border border-border/50 text-sm whitespace-pre-wrap">
                    {selectedRequest.message || "No message provided."}
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
