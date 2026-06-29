import { createFileRoute, useNavigate, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { useShop } from "@/lib/useShop";
import { placeOrder, type Address, createMockCustomer, getShopSession } from "@/lib/shopStore";
import { formatPrice } from "@/lib/adminStore";
import {
  MapPin,
  CreditCard,
  Wallet,
  Landmark,
  Loader2,
  CheckCircle2,
  ChevronRight,
  X,
  Smartphone,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cart, cartSubtotal, session } = useShop();
  const navigate = useNavigate();
  const [step, setStep] = useState<"address" | "payment" | "review">("address");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<
    "UPI" | "Card" | "NetBanking" | "Wallet" | "COD"
  >("UPI");

  // Advanced Payment State
  const [upiOption, setUpiOption] = useState<"app" | "id">("app");
  const [upiId, setUpiId] = useState("");
  const [needGst, setNeedGst] = useState(false);
  const [gstin, setGstin] = useState("");
  const [gstName, setGstName] = useState("");
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);

  // Address Selection State
  const hasSavedAddresses = Boolean(session?.addresses && session.addresses.length > 0);
  const [addressMode, setAddressMode] = useState<"saved" | "manual">(
    hasSavedAddresses ? "saved" : "manual"
  );
  
  const defaultSavedAddress = session?.addresses?.find(a => a.isDefault) || session?.addresses?.[0];
  const [selectedAddressId, setSelectedAddressId] = useState<string>(defaultSavedAddress?.id || "");

  // Basic Address state
  const [address, setAddress] = useState<Address>({
    id: "new-addr",
    fullName: session?.name || "",
    mobile: session?.mobile || "",
    addressLine: "",
    city: "",
    district: "",
    state: "Kerala",
    pincode: "",
    country: "India",
    isDefault: true,
  });

  const gst = cartSubtotal * 0.18;
  const shipping = cartSubtotal > 0 ? 500 : 0;
  const total = cartSubtotal + gst + shipping;

  if (cart.length === 0 && step !== "review") {
    return <Navigate to="/cart" />;
  }

  const handleNext = () => {
    if (step === "address") {
      if (addressMode === "manual") {
        if (
          !address.fullName ||
          !address.mobile ||
          !address.addressLine ||
          !address.city ||
          !address.pincode
        ) {
          toast.error("Please fill all address fields");
          return;
        }
      } else {
        if (!selectedAddressId) {
          toast.error("Please select a delivery address");
          return;
        }
      }
      setStep("payment");
    } else if (step === "payment") {
      setStep("review");
    }
  };

  const handlePlaceOrder = () => {
    if (selectedPayment === "COD") {
      processPayment();
    } else {
      setShowPaymentGateway(true);
    }
  };

  const processPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const customer = session || createMockCustomer();
      
      const finalAddress = addressMode === "saved"
        ? (session?.addresses?.find(a => a.id === selectedAddressId) || address)
        : address;

      const order = placeOrder({
        customerId: customer.id,
        items: cart,
        shippingAddress: finalAddress,
        paymentMethod: selectedPayment,
        paymentStatus: selectedPayment === "COD" ? "Pending" : "Completed",
        subtotal: cartSubtotal,
        discount: 0,
        gst,
        shipping,
        totalAmount: total,
      });
      setIsProcessing(false);
      setShowPaymentGateway(false);
      navigate({ to: "/order-success", search: { orderId: order.id } });
    }, 2000);
  };

  return (
    <main className="min-h-screen pt-28 pb-20 bg-background/50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Stepper */}
        <div className="flex items-center justify-between mb-8 sm:mb-12 relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-border -z-10" />

          <div
            className={`flex flex-col items-center gap-2 ${step === "address" ? "text-primary" : "text-foreground"}`}
          >
            <div
              className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base ${step === "address" || step === "payment" || step === "review" ? "bg-primary text-background shadow-glow" : "bg-border text-muted-foreground"}`}
            >
              1
            </div>
            <span className="text-xs sm:text-sm font-semibold bg-background px-2">Delivery</span>
          </div>

          <div
            className={`flex flex-col items-center gap-2 ${step === "payment" ? "text-primary" : "text-foreground"}`}
          >
            <div
              className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base ${step === "payment" || step === "review" ? "bg-primary text-background shadow-glow" : "bg-border text-muted-foreground"}`}
            >
              2
            </div>
            <span className="text-xs sm:text-sm font-semibold bg-background px-2">Payment</span>
          </div>

          <div
            className={`flex flex-col items-center gap-2 ${step === "review" ? "text-primary" : "text-foreground"}`}
          >
            <div
              className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base ${step === "review" ? "bg-primary text-background shadow-glow" : "bg-border text-muted-foreground"}`}
            >
              3
            </div>
            <span className="text-xs sm:text-sm font-semibold bg-background px-2">Review</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Step 1: Address */}
            {step === "address" && (
              <div className="p-6 rounded-3xl glass border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-bold">Shipping Address</h2>
                </div>

                {hasSavedAddresses && (
                  <div className="flex bg-surface p-1 rounded-xl mb-6">
                    <button
                      onClick={() => setAddressMode("saved")}
                      className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${addressMode === "saved" ? "bg-primary text-background shadow-glow" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      Saved Addresses
                    </button>
                    <button
                      onClick={() => setAddressMode("manual")}
                      className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${addressMode === "manual" ? "bg-primary text-background shadow-glow" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      Add New Address
                    </button>
                  </div>
                )}

                {addressMode === "saved" && hasSavedAddresses ? (
                  <div className="grid sm:grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-200">
                    {session?.addresses?.map((addr) => (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedAddressId(addr.id)}
                        className={`p-5 rounded-2xl border flex flex-col gap-2 relative overflow-hidden cursor-pointer transition-all ${
                          selectedAddressId === addr.id 
                            ? "border-primary bg-primary/5 shadow-[0_0_15px_rgba(var(--primary),0.2)]" 
                            : "border-border/50 glass hover:bg-white/5"
                        }`}
                      >
                        {addr.isDefault && (
                          <div className="absolute top-0 right-0 bg-primary/20 text-primary text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                            DEFAULT
                          </div>
                        )}
                        <h3 className="font-bold flex items-center justify-between">
                          {addr.fullName}
                          {selectedAddressId === addr.id && <CheckCircle2 className="h-5 w-5 text-primary" />}
                        </h3>
                        <p className="text-sm text-muted-foreground">{addr.mobile}</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          {addr.addressLine}
                          <br />
                          {addr.city}, {addr.district}
                          <br />
                          {addr.state} - {addr.pincode}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-200">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={address.fullName}
                        onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        className="admin-input"
                        value={address.mobile}
                        onChange={(e) => setAddress({ ...address, mobile: e.target.value })}
                        placeholder="9876543210"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">
                        Address Line (House No, Street)
                      </label>
                      <input
                        type="text"
                        className="admin-input"
                        value={address.addressLine}
                        onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
                        placeholder="123 Main St, Near Plaza"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">Pincode</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={address.pincode}
                        onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                        placeholder="670721"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">City</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        placeholder="Panamaram"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">District</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={address.district}
                        onChange={(e) => setAddress({ ...address, district: e.target.value })}
                        placeholder="Wayanad"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">State</label>
                      <input type="text" className="admin-input" value={address.state} readOnly />
                    </div>
                  </div>
                )}

                <button onClick={handleNext} className="mt-8 btn-hero w-full">
                  Deliver Here
                </button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === "payment" && (
              <div className="p-6 rounded-3xl glass border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-bold">Payment Method</h2>
                </div>

                <div className="space-y-3">
                  {[
                    { id: "UPI", label: "UPI (GPay, PhonePe, Paytm)", icon: Wallet },
                    { id: "Card", label: "Credit / Debit Card", icon: CreditCard },
                    { id: "NetBanking", label: "Net Banking", icon: Landmark },
                    { id: "COD", label: "Cash on Delivery", icon: CheckCircle2 },
                  ].map((method) => (
                    <div key={method.id} className="flex flex-col gap-2">
                      <label
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedPayment === method.id ? "border-primary bg-primary/5" : "border-border/50 glass hover:border-primary/50"}`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          className="h-4 w-4 text-primary bg-background border-border"
                          checked={selectedPayment === method.id}
                          onChange={() => setSelectedPayment(method.id as any)}
                        />
                        <method.icon
                          className={`h-5 w-5 ${selectedPayment === method.id ? "text-primary" : "text-muted-foreground"}`}
                        />
                        <span className="font-medium">{method.label}</span>
                      </label>

                      {selectedPayment === "UPI" && method.id === "UPI" && (
                        <div className="ml-12 p-4 rounded-xl border border-border bg-background/50 space-y-4">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="upiOption"
                              checked={upiOption === "app"}
                              onChange={() => setUpiOption("app")}
                              className="h-4 w-4 text-primary"
                            />
                            <span className="text-sm font-medium">Pay via Installed App</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="upiOption"
                              checked={upiOption === "id"}
                              onChange={() => setUpiOption("id")}
                              className="h-4 w-4 text-primary"
                            />
                            <span className="text-sm font-medium">Enter UPI ID</span>
                          </label>
                          {upiOption === "id" && (
                            <input
                              type="text"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              placeholder="example@upi"
                              className="admin-input mt-2"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* GST Invoice Section */}
                <div className="mt-6 p-4 rounded-xl border border-border/50 glass bg-white/5">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={needGst}
                      onChange={(e) => setNeedGst(e.target.checked)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="font-medium text-sm">Require GST Invoice (Optional)</span>
                  </label>
                  {needGst && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">GSTIN Number</label>
                        <input
                          type="text"
                          value={gstin}
                          onChange={(e) => setGstin(e.target.value)}
                          placeholder="29XXXXX0000X1Z5"
                          className="admin-input"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Company Name</label>
                        <input
                          type="text"
                          value={gstName}
                          onChange={(e) => setGstName(e.target.value)}
                          placeholder="Acme Corp"
                          className="admin-input"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <button onClick={handleNext} className="mt-8 btn-hero w-full">
                  Continue
                </button>
              </div>
            )}

            {/* Step 3: Review */}
            {step === "review" && (
              <div className="p-6 rounded-3xl glass border border-border/50">
                <h2 className="text-xl font-bold mb-6">Review Order</h2>

                <div className="space-y-6">
                  <div className="p-4 rounded-xl glass bg-white/5">
                    <h3 className="font-semibold text-sm text-primary mb-2 uppercase">
                      Delivery To
                    </h3>
                    <p className="font-medium">
                      {address.fullName} ({address.mobile})
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {address.addressLine}, {address.city}, {address.district}, {address.state} -{" "}
                      {address.pincode}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl glass bg-white/5">
                    <h3 className="font-semibold text-sm text-primary mb-2 uppercase">
                      Payment Method
                    </h3>
                    <p className="font-medium">{selectedPayment}</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-sm text-primary uppercase">Items</h3>
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex gap-4 items-center">
                        <img
                          src={item.product.image}
                          className="h-16 w-16 rounded-lg object-cover bg-white/5"
                          alt={item.product.name}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm line-clamp-1">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-sm">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Order Summary */}
          <div className="p-6 rounded-3xl glass-strong border border-border/50 h-fit sticky top-28">
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

            {step === "review" && (
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="mt-8 w-full h-14 rounded-2xl bg-primary text-background font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-glow disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Processing Payment...
                  </>
                ) : (
                  `Pay ${formatPrice(total)}`
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Simulated Payment Gateway Modal */}
      {showPaymentGateway && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card glass-strong w-full max-w-md rounded-3xl border border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-emerald-500" />
                <h3 className="text-xl font-bold">Secure Payment</h3>
              </div>
              <button
                onClick={() => setShowPaymentGateway(false)}
                className="h-8 w-8 rounded-full bg-surface flex items-center justify-center text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="p-8 flex flex-col items-center text-center">
              {selectedPayment === "UPI" && upiOption === "app" ? (
                <>
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Smartphone className="h-10 w-10 text-primary" />
                  </div>
                  <h4 className="text-2xl font-bold mb-2">Approve on your Phone</h4>
                  <p className="text-muted-foreground mb-8">
                    We've sent a request to your installed UPI app. Please open it and approve the payment of <strong className="text-foreground">{formatPrice(total)}</strong>.
                  </p>
                </>
              ) : selectedPayment === "UPI" && upiOption === "id" ? (
                <>
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Wallet className="h-10 w-10 text-primary" />
                  </div>
                  <h4 className="text-2xl font-bold mb-2">Enter UPI PIN</h4>
                  <p className="text-muted-foreground mb-6">
                    Paying <strong className="text-foreground">{formatPrice(total)}</strong> to Kambiz Tyre Supermarket via {upiId || "your UPI ID"}.
                  </p>
                  <input type="password" placeholder="• • • • • •" className="admin-input text-center text-2xl tracking-[0.5em] font-bold w-48 mb-8" maxLength={6} />
                </>
              ) : (
                <>
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <CreditCard className="h-10 w-10 text-primary" />
                  </div>
                  <h4 className="text-2xl font-bold mb-2">Enter OTP</h4>
                  <p className="text-muted-foreground mb-6">
                    An OTP has been sent to your registered mobile number for a payment of <strong className="text-foreground">{formatPrice(total)}</strong>.
                  </p>
                  <input type="text" placeholder="• • • • • •" className="admin-input text-center text-2xl tracking-[0.5em] font-bold w-48 mb-8" maxLength={6} />
                </>
              )}

              <button
                onClick={processPayment}
                disabled={isProcessing}
                className="btn-hero w-full h-14 text-lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" /> Processing...
                  </>
                ) : (
                  "Simulate Payment Success"
                )}
              </button>
              
              <p className="text-xs text-muted-foreground mt-6 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> 256-bit Bank Grade Encryption
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
