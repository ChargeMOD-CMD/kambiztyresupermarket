import { a as __toESM } from "../_runtime.mjs";
import { t as addToCart } from "./shopStore-eN_ZWT97.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useShop } from "./useShop-Bs_GNeI8.mjs";
import { I as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Q as Check, Z as ChevronRight, _ as ShoppingCart, d as Truck, m as Star, t as Zap, y as Shield } from "../_libs/lucide-react.mjs";
import { l as formatPrice, u as getProducts } from "./adminStore-nj7GgGe2.mjs";
import { t as Route } from "./product._id-BjNH_25A.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._id-DT1asJEh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductDetailsPage() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const { session } = useShop();
	const product = (0, import_react.useMemo)(() => getProducts(), []).find((p) => p.id === id);
	const [activeImage, setActiveImage] = (0, import_react.useState)(0);
	const [quantity, setQuantity] = (0, import_react.useState)(1);
	const [added, setAdded] = (0, import_react.useState)(false);
	if (!product) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen pt-32 pb-16 px-4 flex flex-col items-center justify-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold",
				children: "Product not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mt-4",
				children: "The tyre you're looking for doesn't exist."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => navigate({ to: "/" }),
				className: "btn-hero mt-8",
				children: "Return to Store"
			})
		]
	});
	const gallery = product.gallery?.length ? product.gallery : [product.image];
	const handleAddToCart = () => {
		if (!session) {
			window.dispatchEvent(new CustomEvent("kambiz_require_login"));
			return;
		}
		addToCart(product, quantity);
		setAdded(true);
		setTimeout(() => setAdded(false), 2e3);
	};
	const handleBuyNow = () => {
		if (!session) {
			window.dispatchEvent(new CustomEvent("kambiz_require_login"));
			return;
		}
		addToCart(product, quantity);
		navigate({ to: "/checkout" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen pt-28 pb-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex items-center text-sm text-muted-foreground mb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => navigate({ to: "/" }),
						className: "hover:text-primary",
						children: "Home"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 mx-2 opacity-50" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "hover:text-primary",
						children: product.category
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 mx-2 opacity-50" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground truncate max-w-[200px]",
						children: product.name
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-2 gap-12 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col-reverse lg:flex-row gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto pb-2 lg:pb-0 hide-scrollbar lg:w-24 shrink-0",
						children: gallery.map((img, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveImage(idx),
							className: `relative aspect-square w-20 lg:w-full rounded-xl overflow-hidden glass border-2 transition-all ${activeImage === idx ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: img,
								alt: `Thumbnail ${idx + 1}`,
								className: "h-full w-full object-cover"
							})
						}, idx))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-square w-full rounded-3xl glass overflow-hidden flex-1 group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: gallery[activeImage],
							alt: product.name,
							className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-crosshair"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute top-4 left-4 flex flex-col gap-2",
							children: [product.discount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-full bg-red-500/20 border border-red-500/30 px-3 py-1 text-xs font-bold text-red-400 backdrop-blur-md",
								children: [product.discount, "% OFF"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-background/50 border border-border px-3 py-1 text-xs font-bold text-foreground backdrop-blur-md",
								children: product.brand
							})]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl sm:text-4xl font-bold",
							children: product.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 mt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [[
										1,
										2,
										3,
										4,
										5
									].map((star) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `h-4 w-4 ${star <= Math.floor(product.rating || 5) ? "fill-primary text-primary" : "fill-muted text-muted"}` }, star)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-1 text-sm font-semibold",
										children: product.rating || "5.0"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors",
									children: [product.reviewsCount || "120", " Reviews"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-emerald-400 font-medium",
									children: "Verified by Kambiz"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-muted-foreground leading-relaxed text-lg",
							children: product.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 p-6 rounded-3xl glass-strong border border-border/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-end gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-4xl font-bold text-primary",
										children: formatPrice(product.price)
									}), product.originalPrice > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-muted-foreground uppercase tracking-wide",
											children: "M.R.P."
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xl line-through text-muted-foreground",
											children: formatPrice(product.originalPrice)
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-muted-foreground",
									children: "Inclusive of all taxes. Free fitment at Kambiz branches."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 flex flex-col sm:flex-row gap-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center rounded-2xl glass border border-border/50 h-14 px-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setQuantity(Math.max(1, quantity - 1)),
													className: "h-10 w-10 flex items-center justify-center rounded-xl hover:bg-background/50 text-foreground transition-colors",
													children: "-"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "w-12 text-center font-semibold",
													children: quantity
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setQuantity(quantity + 1),
													className: "h-10 w-10 flex items-center justify-center rounded-xl hover:bg-background/50 text-foreground transition-colors",
													children: "+"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: handleAddToCart,
											className: "flex-1 h-14 rounded-2xl glass border border-primary/30 text-primary font-bold flex items-center justify-center gap-2 hover:bg-primary/10 transition-colors",
											children: [added ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-5 w-5" }), added ? "Added to Cart" : "Add to Cart"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: handleBuyNow,
											className: "flex-1 h-14 rounded-2xl bg-primary text-background font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-glow",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-5 w-5" }), " Buy Now"]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 grid sm:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 p-4 rounded-2xl glass",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-5 w-5 text-emerald-400" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold",
									children: product.warranty || "Warranty Included"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Manufacturer Guarantee"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 p-4 rounded-2xl glass",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-5 w-5 text-blue-400" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold",
									children: "Fast Delivery"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Ships within 24 hours"
								})] })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-12",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl font-bold mb-6",
								children: "Technical Specifications"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl glass border border-border/50 overflow-hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 p-4 border-b border-border/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground text-sm",
											children: "SKU"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-sm text-right",
											children: product.sku || "N/A"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 p-4 border-b border-border/50 bg-white/5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground text-sm",
											children: "Size"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-sm text-right",
											children: product.size
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 p-4 border-b border-border/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground text-sm",
											children: "Load Index"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-sm text-right",
											children: product.loadIndex
										})]
									}),
									product.technicalSpecs && Object.entries(product.technicalSpecs).map(([key, val], idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `grid grid-cols-2 p-4 border-b border-border/50 ${idx % 2 === 1 ? "" : "bg-white/5"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground text-sm",
											children: key
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-sm text-right",
											children: val
										})]
									}, key))
								]
							})]
						}),
						product.vehicleCompatibility && product.vehicleCompatibility.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-12",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl font-bold mb-6",
								children: "Vehicle Compatibility"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: product.vehicleCompatibility.map((vehicle) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-4 py-2 rounded-xl glass border border-border/50 text-sm",
									children: vehicle
								}, vehicle))
							})]
						})
					]
				})]
			})]
		})
	});
}
//#endregion
export { ProductDetailsPage as component };
