import { a as __toESM } from "../_runtime.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { t as addToCart } from "./shopStore-eN_ZWT97.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useShop } from "./useShop-Bs_GNeI8.mjs";
import { I as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as Quote, K as ExternalLink, Q as Check, _ as ShoppingCart, at as Sparkles, i as Wind, k as Phone, m as Star, nt as ArrowRight, p as Tag, t as Zap, ut as CircleCheck, y as Shield } from "../_libs/lucide-react.mjs";
import { n as Header, t as Footer } from "./Footer-rkNcsPDt.mjs";
import { t as About } from "./About-PMVHgiF2.mjs";
import { l as formatPrice, u as getProducts } from "./adminStore-nj7GgGe2.mjs";
import { t as Branches } from "./Branches-BnSILLM-.mjs";
import { t as Contact } from "./Contact-cRjtJH4m.mjs";
import { t as Products } from "./Products-CS4eoGWz.mjs";
import { t as Services } from "./Services-BwdRavH_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-_0PbtLzR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var hero_bg_new_default = "/assets/hero-bg-new-Cu1nKhO8.png";
var tyre_hero_black_default = "/assets/tyre-hero-black-CNN2UhY5.png";
var floatingBadges = [
	{
		id: "badge-rating",
		icon: Star,
		title: "4.9 Rating",
		sub: "318 Reviews",
		style: {
			top: "12%",
			right: "4%"
		},
		delay: .5,
		iconColor: "text-yellow-400",
		iconBg: "bg-yellow-400/15"
	},
	{
		id: "badge-warranty",
		icon: Shield,
		title: "5-Year Warranty",
		sub: "All Products",
		style: {
			bottom: "28%",
			right: "2%"
		},
		delay: .75,
		iconColor: "text-emerald-400",
		iconBg: "bg-emerald-400/15"
	},
	{
		id: "badge-fitment",
		icon: Zap,
		title: "Free Fitment",
		sub: "Every Purchase",
		style: {
			bottom: "12%",
			left: "6%"
		},
		delay: 1,
		iconColor: "text-primary",
		iconBg: "bg-primary/15"
	}
];
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "home",
		className: "relative min-h-screen flex items-center overflow-hidden pt-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 -z-10 overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: hero_bg_new_default,
						alt: "",
						width: 1920,
						height: 1080,
						className: "h-full w-full object-cover animate-hero-zoom",
						style: { transformOrigin: "center center" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-background/70" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0",
						style: { background: "var(--gradient-hero)" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0",
						style: { background: "radial-gradient(ellipse 90% 60% at 60% 40%, oklch(0.72 0.2 45 / 0.08), transparent 70%)" }
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 -z-10 overflow-hidden pointer-events-none",
				children: Array.from({ length: 18 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute h-1 w-1 rounded-full bg-primary/60 animate-float",
					style: {
						top: `${i * 53 % 100}%`,
						left: `${i * 37 % 100}%`,
						animationDelay: `${i * .3}s`,
						animationDuration: `${6 + i % 5}s`
					}
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-10 items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 30
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .8,
						ease: "easeOut"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tag-pill",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }), " Kerala's Premium Tyre Destination"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gradient",
									children: "Engineered"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"for the ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gradient-primary",
									children: "Road Ahead."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed",
							children: "World‑class tyres, precision wheel alignment, and trusted automotive care — delivered with the craft and obsession of a luxury performance brand."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-9 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#services",
								className: "btn-hero",
								id: "hero-explore-btn",
								children: ["Explore Services ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "tel:+919946479998",
								className: "btn-ghost-glow",
								id: "hero-call-btn",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }), " +91 99464 79998"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-12 grid grid-cols-3 gap-6 max-w-md",
							children: [
								{
									k: "20+",
									v: "Years of Trust"
								},
								{
									k: "2",
									v: "Branches in Wayanad"
								},
								{
									k: "10K+",
									v: "Happy Drivers"
								}
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-3xl font-bold text-gradient-primary",
								children: s.k
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase tracking-wider text-muted-foreground mt-1",
								children: s.v
							})] }, s.v))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						scale: .88,
						x: 40
					},
					animate: {
						opacity: 1,
						scale: 1,
						x: 0
					},
					transition: {
						duration: 1,
						delay: .2,
						ease: "easeOut"
					},
					className: "relative h-[460px] sm:h-[560px] lg:h-[660px] flex items-center justify-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 -z-10 rounded-full blur-[80px] opacity-35 m-16",
							style: { background: "radial-gradient(circle, oklch(0.72 0.2 45 / 0.7), oklch(0.55 0.18 30 / 0.4) 50%, transparent 75%)" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-24 blur-2xl opacity-40 rounded-full",
							style: { background: "radial-gradient(ellipse, oklch(0.72 0.2 45 / 0.6), transparent 70%)" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-12 rounded-full border border-primary/10 animate-spin-slow",
							style: { animationDuration: "25s" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-20 rounded-full border border-primary/6 animate-spin-slow",
							style: {
								animationDuration: "40s",
								animationDirection: "reverse"
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
							src: tyre_hero_black_default,
							alt: "Kambiz AllGrip Pro Tyre 205/55 R16 with alloy rim",
							className: "absolute z-10 h-full w-full object-contain",
							style: {
								mixBlendMode: "screen",
								filter: "brightness(2.8) contrast(1.15) saturate(1.1)"
							},
							animate: { y: [
								0,
								-14,
								0
							] },
							transition: {
								duration: 5,
								repeat: Infinity,
								ease: "easeInOut"
							}
						}),
						floatingBadges.map(({ id, icon: Icon, title, sub, style, delay, iconColor, iconBg }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							id,
							initial: {
								opacity: 0,
								scale: .7
							},
							animate: {
								opacity: 1,
								scale: 1
							},
							transition: {
								delay,
								duration: .5,
								ease: "backOut"
							},
							className: "absolute z-20 glass rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-lg",
							style,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `rounded-lg p-1.5 ${iconBg}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-4 w-4 ${iconColor}` })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-bold leading-tight",
								children: title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] text-muted-foreground leading-tight",
								children: sub
							})] })]
						}, id)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 10
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								delay: 1.2,
								duration: .5
							},
							className: "absolute bottom-6 left-1/2 -translate-x-1/2 z-20 glass rounded-full px-5 py-2 flex items-center gap-3 whitespace-nowrap",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-emerald-400 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold tracking-wide",
								children: "205 / 55 R16 \xA0·\xA0 Wet Grip A \xA0·\xA0 Free Fitment"
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/70",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-[0.3em]",
					children: "Scroll"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-px bg-gradient-to-b from-primary to-transparent animate-pulse" })]
			})
		]
	});
}
var tyre_featured_black_default = "/assets/tyre-featured-black-BYCHWtUO.png";
var tyre_pressure_gauge_default = "/assets/tyre-pressure-gauge-DhGKtyO-.png";
var tyre_inflator_default = "/assets/tyre-inflator-DGYfh8Bk.png";
var alloy_rim_default = "/assets/alloy-rim-B8jeQ2HP.png";
var tyre_shine_default = "/assets/tyre-shine-BiWM7WFN.png";
var valve_caps_default = "/assets/valve-caps-B1CqV7qs.png";
var tyreSpecs = [
	{
		label: "Size",
		value: "205 / 55 R16"
	},
	{
		label: "Load Index",
		value: "91 W"
	},
	{
		label: "Season",
		value: "All-Season"
	},
	{
		label: "Wet Grip",
		value: "A ★★★★★"
	},
	{
		label: "Noise",
		value: "68 dB"
	},
	{
		label: "EU Label",
		value: "A / A / 68dB"
	}
];
var highlights = [
	{
		icon: Shield,
		text: "5-Year Structural Warranty"
	},
	{
		icon: Zap,
		text: "Performance Wet-Braking Tech"
	},
	{
		icon: Wind,
		text: "Low Rolling Resistance"
	},
	{
		icon: CircleCheck,
		text: "Free Fitment Included"
	}
];
var HARDCODED_RELATED = [
	{
		id: "pressure-gauge",
		name: "Digital Tyre Pressure Gauge",
		price: "₹ 799",
		originalPrice: "₹ 1,299",
		rating: 4.8,
		reviews: 142,
		badge: "Bestseller",
		image: tyre_pressure_gauge_default,
		desc: "Precision ±1% accuracy. Backlit LCD display. Fits all Schrader valves."
	},
	{
		id: "inflator",
		name: "Cordless Tyre Inflator Pump",
		price: "₹ 2,499",
		originalPrice: "₹ 3,999",
		rating: 4.7,
		reviews: 89,
		badge: "New Arrival",
		image: tyre_inflator_default,
		desc: "Portable & rechargeable. Auto-shutoff at preset pressure. LED torch."
	},
	{
		id: "alloy-rim",
		name: "5-Spoke Alloy Wheel Rim",
		price: "₹ 8,500",
		originalPrice: "₹ 11,000",
		rating: 4.9,
		reviews: 213,
		badge: "Top Rated",
		image: alloy_rim_default,
		desc: "Flow-formed 17\" alloy. OEM spec fitment. Hyper silver finish."
	},
	{
		id: "tyre-shine",
		name: "Tyre Shine & Protectant Spray",
		price: "₹ 349",
		originalPrice: "₹ 549",
		rating: 4.6,
		reviews: 77,
		badge: "Value Pick",
		image: tyre_shine_default,
		desc: "UV protection formula. Non-greasy long-lasting finish. 500 ml."
	},
	{
		id: "valve-caps",
		name: "Metal Valve Stem Caps (4-Pack)",
		price: "₹ 149",
		originalPrice: "₹ 249",
		rating: 4.5,
		reviews: 310,
		badge: "Combo Deal",
		image: valve_caps_default,
		desc: "CNC machined aluminium. Anti-dust seal. Universal thread fit."
	}
];
function StarRating({ rating }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center gap-0.5",
		children: Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `h-3.5 w-3.5 ${i < Math.floor(rating) ? "fill-primary text-primary" : "text-muted-foreground/40"}` }, i))
	});
}
var tagColors = {
	Bestseller: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
	"New Arrival": "bg-blue-500/20 text-blue-400 border-blue-500/30",
	"Top Rated": "bg-primary/20 text-primary border-primary/30",
	"Value Pick": "bg-purple-500/20 text-purple-400 border-purple-500/30",
	"Combo Deal": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
};
function FeaturedTyre() {
	const navigate = useNavigate();
	const { session } = useShop();
	const [added, setAdded] = (0, import_react.useState)(false);
	const featuredProduct = getProducts().find((p) => p.featured) || getProducts()[0] || {
		price: 4299,
		originalPrice: 6599
	};
	const accessories = getProducts().filter((p) => p.category === "Accessories").slice(0, 5);
	const displayRelated = accessories.length > 0 ? accessories.map((p) => ({
		id: p.id,
		name: p.name,
		price: formatPrice(p.price),
		originalPrice: formatPrice(p.originalPrice),
		rating: p.rating || 5,
		reviews: p.reviewsCount || 0,
		badge: p.tag || "Top Rated",
		image: p.image,
		desc: p.description || p.spec
	})) : HARDCODED_RELATED;
	const handleAddToCart = () => {
		if (!session) {
			window.dispatchEvent(new CustomEvent("kambiz_require_login"));
			return;
		}
		if (featuredProduct.id) {
			addToCart(featuredProduct, 1);
			setAdded(true);
			setTimeout(() => setAdded(false), 2e3);
		}
	};
	const handleBuyNow = () => {
		if (!session) {
			window.dispatchEvent(new CustomEvent("kambiz_require_login"));
			return;
		}
		if (featuredProduct.id) {
			addToCart(featuredProduct, 1);
			navigate({ to: "/checkout" });
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "py-24 relative z-10",
		id: "featured-section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none absolute inset-0 -z-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute left-0 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full blur-[120px] opacity-20",
				style: { background: "oklch(0.72 0.2 45)" }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute right-0 bottom-1/4 h-80 w-80 translate-x-1/2 rounded-full blur-[100px] opacity-15",
				style: { background: "oklch(0.60 0.22 250)" }
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 24
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: { duration: .6 },
					className: "mb-16 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tag-pill",
							children: "Featured Product"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-5 text-4xl sm:text-5xl font-bold text-gradient",
							children: "Tyre of the Season"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-4 max-w-lg text-muted-foreground",
							children: "Precision-engineered for Kerala's roads — grippy in the monsoon, silent on the highway, and built to outlast the rest."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 40
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: { duration: .7 },
					className: "glass rounded-3xl overflow-hidden mb-20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid lg:grid-cols-2 gap-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex items-center justify-center bg-background p-10 lg:p-14 min-h-[420px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0 opacity-30",
									style: { background: "radial-gradient(circle at 50% 50%, oklch(0.72 0.2 45 / 0.5), transparent 65%)" }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
									src: tyre_featured_black_default,
									alt: "Kambiz Premium Tyre 205/55 R16",
									className: "relative z-10 w-full max-w-sm",
									style: {
										mixBlendMode: "screen",
										filter: "brightness(2.8) contrast(1.15) saturate(1.1)"
									},
									animate: { y: [
										0,
										-10,
										0
									] },
									transition: {
										duration: 4,
										repeat: Infinity,
										ease: "easeInOut"
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute top-5 left-5 z-30 flex flex-col gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-lg",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "h-3 w-3" }), " 35% OFF"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-400",
										children: "✦ In Stock"
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col justify-center p-8 lg:p-12 gap-7",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs uppercase tracking-widest text-primary font-semibold mb-2",
										children: "Kambiz Premium Series"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "text-3xl sm:text-4xl font-bold leading-tight",
										children: [
											"AllGrip Pro",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-gradient-primary",
												children: "Monsoon Edition"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarRating, { rating: 4.9 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-muted-foreground",
											children: "4.9 (318 verified purchases)"
										})]
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-3xl font-bold text-primary",
										children: formatPrice(featuredProduct.price)
									}), featuredProduct.originalPrice > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-lg line-through text-muted-foreground",
										children: formatPrice(featuredProduct.originalPrice)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 sm:grid-cols-3 gap-3",
									children: tyreSpecs.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border bg-surface/60 px-3 py-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] uppercase tracking-widest text-muted-foreground",
											children: s.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-0.5 text-sm font-semibold",
											children: s.value
										})]
									}, s.label))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-2",
									children: highlights.map(({ icon: Icon, text }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-sm text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 flex-shrink-0 text-primary" }), text]
									}, text))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/product/$id",
										params: { id: featuredProduct.id || "1" },
										className: "w-full h-14 rounded-2xl bg-surface border border-primary/20 flex items-center justify-center gap-2 text-foreground font-semibold hover:bg-surface-2 transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-4 w-4" }), " View Full Details"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: handleAddToCart,
											className: "flex-1 h-14 rounded-2xl glass border border-primary/30 text-primary font-bold flex items-center justify-center gap-2 hover:bg-primary/10 transition-colors",
											children: [added ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-5 w-5" }), added ? "Added" : "Add to Cart"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: handleBuyNow,
											className: "flex-1 h-14 rounded-2xl bg-primary text-background font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-glow",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-5 w-5" }), " Buy Now"]
										})]
									})]
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-10 flex items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tag-pill",
						children: "Complete the Set"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 text-3xl sm:text-4xl font-bold text-gradient",
						children: "Related Items"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hidden sm:block text-muted-foreground max-w-xs text-sm text-right",
						children: "Everything you need for a complete tyre experience — from fitment tools to maintenance essentials."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5",
					children: displayRelated.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
						id: `related-${item.id}`,
						initial: {
							opacity: 0,
							y: 32
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: {
							delay: i * .08,
							duration: .55
						},
						className: "group relative glass rounded-2xl overflow-hidden card-tilt flex flex-col",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-3 left-3 z-10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tagColors[item.badge] || tagColors["Top Rated"]}`,
									children: item.badge
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative h-44 overflow-hidden bg-gradient-to-b from-surface to-card flex items-center justify-center p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500",
									style: { background: "radial-gradient(circle, oklch(0.72 0.2 45 / 0.6), transparent 65%)" }
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.image,
									alt: item.name,
									loading: "lazy",
									className: "h-32 w-auto object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-110"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col flex-1 gap-2 p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-semibold leading-snug line-clamp-2",
										children: item.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed",
										children: item.desc
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 mt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarRating, { rating: item.rating }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[10px] text-muted-foreground",
											children: [
												"(",
												item.reviews,
												")"
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-auto pt-3 flex items-end justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-lg font-bold text-primary",
											children: item.price
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] line-through text-muted-foreground",
											children: item.originalPrice
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "tel:+919946479998",
											className: "flex items-center justify-center gap-1 rounded-xl bg-primary/15 hover:bg-primary/25 border border-primary/25 hover:border-primary/50 text-primary text-xs font-semibold px-3 py-2 transition-all duration-200 hover:scale-105",
											id: `related-buy-${item.id}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-3.5 w-3.5" }), "Buy"]
										})]
									})
								]
							})
						]
					}, item.id))
				})] })
			]
		})]
	});
}
var reviews = [
	{
		name: "Rahul Krishnan",
		role: "SUV Owner, Kalpetta",
		text: "Best tyre shop in Wayanad — honest pricing and the alignment work was perfect. My XUV feels brand new on the highway."
	},
	{
		name: "Anjali M.",
		role: "Sedan Owner, Mananthavady",
		text: "Kambiz guided me to the right tyre for my budget and even fitted them the same evening. Truly premium service."
	},
	{
		name: "Suresh K.",
		role: "Fleet Operator",
		text: "We rely on Kambiz for our truck fleet. Their rethreading and quick puncture turnaround keeps us on the road."
	},
	{
		name: "Fathima R.",
		role: "Hatchback Owner",
		text: "Loved the showroom feel and the way they explained everything. Will not go anywhere else now."
	}
];
function Testimonials() {
	const loop = [...reviews, ...reviews];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "section-pad relative overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center max-w-2xl mx-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tag-pill",
					children: "Loved by Drivers"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-5 text-4xl sm:text-5xl font-bold text-gradient",
					children: "What our customers say."
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-14 relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-5 animate-marquee",
					style: { width: "max-content" },
					children: loop.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						className: "w-[340px] sm:w-[400px] shrink-0 glass rounded-3xl p-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "h-7 w-7 text-primary/60" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-foreground/90 leading-relaxed",
								children: r.text
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold",
									children: r.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: r.role
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-0.5",
									children: Array.from({ length: 5 }).map((_, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-primary text-primary" }, k))
								})]
							})
						]
					}, i))
				})
			]
		})]
	});
}
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative overflow-x-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Services, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Products, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedTyre, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Branches, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contact, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { Index as component };
