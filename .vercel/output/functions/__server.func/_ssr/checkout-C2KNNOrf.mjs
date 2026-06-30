import { o as __toESM } from "../_runtime.mjs";
import { n as createMockCustomer, u as placeOrder } from "./shopStore-eN_ZWT97.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useShop } from "./useShop-Bs_GNeI8.mjs";
import { F as Navigate, I as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { J as CreditCard, N as MapPin, R as Landmark, a as Wallet, b as ShieldCheck, g as Smartphone, n as X, ot as LoaderCircle, ut as CircleCheck } from "../_libs/lucide-react.mjs";
import { l as formatPrice } from "./adminStore-nj7GgGe2.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-C2KNNOrf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CheckoutPage() {
	const { cart, cartSubtotal, session } = useShop();
	const navigate = useNavigate();
	const [step, setStep] = (0, import_react.useState)("address");
	const [isProcessing, setIsProcessing] = (0, import_react.useState)(false);
	const [selectedPayment, setSelectedPayment] = (0, import_react.useState)("UPI");
	const [upiOption, setUpiOption] = (0, import_react.useState)("app");
	const [upiId, setUpiId] = (0, import_react.useState)("");
	const [needGst, setNeedGst] = (0, import_react.useState)(false);
	const [gstin, setGstin] = (0, import_react.useState)("");
	const [gstName, setGstName] = (0, import_react.useState)("");
	const [showPaymentGateway, setShowPaymentGateway] = (0, import_react.useState)(false);
	const hasSavedAddresses = Boolean(session?.addresses && session.addresses.length > 0);
	const [addressMode, setAddressMode] = (0, import_react.useState)(hasSavedAddresses ? "saved" : "manual");
	const [selectedAddressId, setSelectedAddressId] = (0, import_react.useState)((session?.addresses?.find((a) => a.isDefault) || session?.addresses?.[0])?.id || "");
	const [address, setAddress] = (0, import_react.useState)({
		id: "new-addr",
		fullName: session?.name || "",
		mobile: session?.mobile || "",
		addressLine: "",
		city: "",
		district: "",
		state: "Kerala",
		pincode: "",
		country: "India",
		isDefault: true
	});
	const gst = cartSubtotal * .18;
	const shipping = cartSubtotal > 0 ? 500 : 0;
	const total = cartSubtotal + gst + shipping;
	if (cart.length === 0 && step !== "review") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/cart" });
	const handleNext = () => {
		if (step === "address") {
			if (addressMode === "manual") {
				if (!address.fullName || !address.mobile || !address.addressLine || !address.city || !address.pincode) {
					toast.error("Please fill all address fields");
					return;
				}
			} else if (!selectedAddressId) {
				toast.error("Please select a delivery address");
				return;
			}
			setStep("payment");
		} else if (step === "payment") setStep("review");
	};
	const handlePlaceOrder = () => {
		if (selectedPayment === "COD") processPayment();
		else setShowPaymentGateway(true);
	};
	const processPayment = () => {
		setIsProcessing(true);
		setTimeout(() => {
			const customer = session || createMockCustomer();
			const finalAddress = addressMode === "saved" ? session?.addresses?.find((a) => a.id === selectedAddressId) || address : address;
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
				totalAmount: total
			});
			setIsProcessing(false);
			setShowPaymentGateway(false);
			navigate({
				to: "/order-success",
				search: { orderId: order.id }
			});
		}, 2e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen pt-28 pb-20 bg-background/50",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-4xl px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-8 sm:mb-12 relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-0 right-0 top-1/2 h-0.5 bg-border -z-10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `flex flex-col items-center gap-2 ${step === "address" ? "text-primary" : "text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base ${step === "address" || step === "payment" || step === "review" ? "bg-primary text-background shadow-glow" : "bg-border text-muted-foreground"}`,
							children: "1"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs sm:text-sm font-semibold bg-background px-2",
							children: "Delivery"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `flex flex-col items-center gap-2 ${step === "payment" ? "text-primary" : "text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base ${step === "payment" || step === "review" ? "bg-primary text-background shadow-glow" : "bg-border text-muted-foreground"}`,
							children: "2"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs sm:text-sm font-semibold bg-background px-2",
							children: "Payment"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `flex flex-col items-center gap-2 ${step === "review" ? "text-primary" : "text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base ${step === "review" ? "bg-primary text-background shadow-glow" : "bg-border text-muted-foreground"}`,
							children: "3"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs sm:text-sm font-semibold bg-background px-2",
							children: "Review"
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-3 gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-2 flex flex-col gap-6",
					children: [
						step === "address" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-6 rounded-3xl glass border border-border/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 mb-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-6 w-6 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-xl font-bold",
										children: "Shipping Address"
									})]
								}),
								hasSavedAddresses && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex bg-surface p-1 rounded-xl mb-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setAddressMode("saved"),
										className: `flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${addressMode === "saved" ? "bg-primary text-background shadow-glow" : "text-muted-foreground hover:text-foreground"}`,
										children: "Saved Addresses"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setAddressMode("manual"),
										className: `flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${addressMode === "manual" ? "bg-primary text-background shadow-glow" : "text-muted-foreground hover:text-foreground"}`,
										children: "Add New Address"
									})]
								}),
								addressMode === "saved" && hasSavedAddresses ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid sm:grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-200",
									children: session?.addresses?.map((addr) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										onClick: () => setSelectedAddressId(addr.id),
										className: `p-5 rounded-2xl border flex flex-col gap-2 relative overflow-hidden cursor-pointer transition-all ${selectedAddressId === addr.id ? "border-primary bg-primary/5 shadow-[0_0_15px_rgba(var(--primary),0.2)]" : "border-border/50 glass hover:bg-white/5"}`,
										children: [
											addr.isDefault && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "absolute top-0 right-0 bg-primary/20 text-primary text-[10px] font-bold px-3 py-1 rounded-bl-xl",
												children: "DEFAULT"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
												className: "font-bold flex items-center justify-between",
												children: [addr.fullName, selectedAddressId === addr.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5 text-primary" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-muted-foreground",
												children: addr.mobile
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-sm text-muted-foreground mt-2",
												children: [
													addr.addressLine,
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
													addr.city,
													", ",
													addr.district,
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
													addr.state,
													" - ",
													addr.pincode
												]
											})
										]
									}, addr.id))
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-200",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-sm font-medium text-muted-foreground",
												children: "Full Name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												className: "admin-input",
												value: address.fullName,
												onChange: (e) => setAddress({
													...address,
													fullName: e.target.value
												}),
												placeholder: "John Doe"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-sm font-medium text-muted-foreground",
												children: "Mobile Number"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "tel",
												className: "admin-input",
												value: address.mobile,
												onChange: (e) => setAddress({
													...address,
													mobile: e.target.value
												}),
												placeholder: "9876543210"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "sm:col-span-2 space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-sm font-medium text-muted-foreground",
												children: "Address Line (House No, Street)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												className: "admin-input",
												value: address.addressLine,
												onChange: (e) => setAddress({
													...address,
													addressLine: e.target.value
												}),
												placeholder: "123 Main St, Near Plaza"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-sm font-medium text-muted-foreground",
												children: "Pincode"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												className: "admin-input",
												value: address.pincode,
												onChange: (e) => setAddress({
													...address,
													pincode: e.target.value
												}),
												placeholder: "670721"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-sm font-medium text-muted-foreground",
												children: "City"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												className: "admin-input",
												value: address.city,
												onChange: (e) => setAddress({
													...address,
													city: e.target.value
												}),
												placeholder: "Panamaram"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-sm font-medium text-muted-foreground",
												children: "District"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												className: "admin-input",
												value: address.district,
												onChange: (e) => setAddress({
													...address,
													district: e.target.value
												}),
												placeholder: "Wayanad"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-sm font-medium text-muted-foreground",
												children: "State"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												className: "admin-input",
												value: address.state,
												readOnly: true
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handleNext,
									className: "mt-8 btn-hero w-full",
									children: "Deliver Here"
								})
							]
						}),
						step === "payment" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-6 rounded-3xl glass border border-border/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 mb-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-6 w-6 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-xl font-bold",
										children: "Payment Method"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-3",
									children: [
										{
											id: "UPI",
											label: "UPI (GPay, PhonePe, Paytm)",
											icon: Wallet
										},
										{
											id: "Card",
											label: "Credit / Debit Card",
											icon: CreditCard
										},
										{
											id: "NetBanking",
											label: "Net Banking",
											icon: Landmark
										},
										{
											id: "COD",
											label: "Cash on Delivery",
											icon: CircleCheck
										}
									].map((method) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: `flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedPayment === method.id ? "border-primary bg-primary/5" : "border-border/50 glass hover:border-primary/50"}`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "radio",
													name: "payment",
													className: "h-4 w-4 text-primary bg-background border-border",
													checked: selectedPayment === method.id,
													onChange: () => setSelectedPayment(method.id)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(method.icon, { className: `h-5 w-5 ${selectedPayment === method.id ? "text-primary" : "text-muted-foreground"}` }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-medium",
													children: method.label
												})
											]
										}), selectedPayment === "UPI" && method.id === "UPI" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "ml-12 p-4 rounded-xl border border-border bg-background/50 space-y-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "flex items-center gap-3 cursor-pointer",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "radio",
														name: "upiOption",
														checked: upiOption === "app",
														onChange: () => setUpiOption("app"),
														className: "h-4 w-4 text-primary"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-sm font-medium",
														children: "Pay via Installed App"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "flex items-center gap-3 cursor-pointer",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "radio",
														name: "upiOption",
														checked: upiOption === "id",
														onChange: () => setUpiOption("id"),
														className: "h-4 w-4 text-primary"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-sm font-medium",
														children: "Enter UPI ID"
													})]
												}),
												upiOption === "id" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													value: upiId,
													onChange: (e) => setUpiId(e.target.value),
													placeholder: "example@upi",
													className: "admin-input mt-2"
												})
											]
										})]
									}, method.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 p-4 rounded-xl border border-border/50 glass bg-white/5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center gap-3 cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: needGst,
											onChange: (e) => setNeedGst(e.target.checked),
											className: "h-4 w-4 rounded border-border text-primary focus:ring-primary"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-sm",
											children: "Require GST Invoice (Optional)"
										})]
									}), needGst && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-xs text-muted-foreground",
												children: "GSTIN Number"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: gstin,
												onChange: (e) => setGstin(e.target.value),
												placeholder: "29XXXXX0000X1Z5",
												className: "admin-input"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-xs text-muted-foreground",
												children: "Company Name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: gstName,
												onChange: (e) => setGstName(e.target.value),
												placeholder: "Acme Corp",
												className: "admin-input"
											})]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handleNext,
									className: "mt-8 btn-hero w-full",
									children: "Continue"
								})
							]
						}),
						step === "review" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-6 rounded-3xl glass border border-border/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-bold mb-6",
								children: "Review Order"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 rounded-xl glass bg-white/5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-semibold text-sm text-primary mb-2 uppercase",
												children: "Delivery To"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "font-medium",
												children: [
													address.fullName,
													" (",
													address.mobile,
													")"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-sm text-muted-foreground mt-1",
												children: [
													address.addressLine,
													", ",
													address.city,
													", ",
													address.district,
													", ",
													address.state,
													" -",
													" ",
													address.pincode
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 rounded-xl glass bg-white/5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-semibold text-sm text-primary mb-2 uppercase",
											children: "Payment Method"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium",
											children: selectedPayment
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-semibold text-sm text-primary uppercase",
											children: "Items"
										}), cart.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-4 items-center",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: item.product.image,
													className: "h-16 w-16 rounded-lg object-cover bg-white/5",
													alt: item.product.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-medium text-sm line-clamp-1",
														children: item.product.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-xs text-muted-foreground",
														children: ["Qty: ", item.quantity]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-bold text-sm",
													children: formatPrice(item.product.price * item.quantity)
												})
											]
										}, item.product.id))]
									})
								]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 rounded-3xl glass-strong border border-border/50 h-fit sticky top-28",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-bold mb-6",
							children: "Order Summary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground",
										children: [
											"Subtotal (",
											cart.length,
											" items)"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: formatPrice(cartSubtotal)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Shipping Charge"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: formatPrice(shipping)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Estimated GST (18%)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: formatPrice(gst)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px bg-border my-2" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-end",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-lg",
										children: "Grand Total"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-2xl text-primary",
										children: formatPrice(total)
									})]
								})
							]
						}),
						step === "review" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handlePlaceOrder,
							disabled: isProcessing,
							className: "mt-8 w-full h-14 rounded-2xl bg-primary text-background font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-glow disabled:opacity-50",
							children: isProcessing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin" }), " Processing Payment..."] }) : `Pay ${formatPrice(total)}`
						})
					]
				})]
			})]
		}), showPaymentGateway && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-card glass-strong w-full max-w-md rounded-3xl border border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 border-b border-border flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-6 w-6 text-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-bold",
							children: "Secure Payment"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setShowPaymentGateway(false),
						className: "h-8 w-8 rounded-full bg-surface flex items-center justify-center text-muted-foreground hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-8 flex flex-col items-center text-center",
					children: [
						selectedPayment === "UPI" && upiOption === "app" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "h-10 w-10 text-primary" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-2xl font-bold mb-2",
								children: "Approve on your Phone"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-muted-foreground mb-8",
								children: [
									"We've sent a request to your installed UPI app. Please open it and approve the payment of ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: formatPrice(total)
									}),
									"."
								]
							})
						] }) : selectedPayment === "UPI" && upiOption === "id" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-10 w-10 text-primary" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-2xl font-bold mb-2",
								children: "Enter UPI PIN"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-muted-foreground mb-6",
								children: [
									"Paying ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: formatPrice(total)
									}),
									" to Kambiz Tyre Supermarket via ",
									upiId || "your UPI ID",
									"."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								placeholder: "• • • • • •",
								className: "admin-input text-center text-2xl tracking-[0.5em] font-bold w-48 mb-8",
								maxLength: 6
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-10 w-10 text-primary" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-2xl font-bold mb-2",
								children: "Enter OTP"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-muted-foreground mb-6",
								children: [
									"An OTP has been sent to your registered mobile number for a payment of",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: formatPrice(total)
									}),
									"."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "• • • • • •",
								className: "admin-input text-center text-2xl tracking-[0.5em] font-bold w-48 mb-8",
								maxLength: 6
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: processPayment,
							disabled: isProcessing,
							className: "btn-hero w-full h-14 text-lg",
							children: isProcessing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin mr-2" }), " Processing..."] }) : "Simulate Payment Success"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground mt-6 flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3 w-3" }), " 256-bit Bank Grade Encryption"]
						})
					]
				})]
			})
		})]
	});
}
//#endregion
export { CheckoutPage as component };
