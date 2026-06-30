import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { I as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as Ruler, V as ImagePlus, et as BadgeDollarSign, j as Package, lt as CircleCheckBig, n as X, ot as LoaderCircle, p as Tag, rt as ArrowLeft, u as Upload, x as ShieldAlert } from "../_libs/lucide-react.mjs";
import { g as updateProduct, u as getProducts } from "./adminStore-nj7GgGe2.mjs";
import { n as useAdminAuth } from "./adminAuth-n-e8bb6l.mjs";
import { t as AdminLayout } from "./AdminLayout-DSkqI4j6.mjs";
import { t as Route } from "./products_.edit._id-u-VZ04U9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products_.edit._id-D81W6M1s.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORIES = [
	"Car",
	"SUV",
	"Truck",
	"Bike",
	"Commercial",
	"Accessories"
];
var SEASONS = [
	"All-Season",
	"Summer",
	"Winter",
	"All-Terrain"
];
var TAGS = [
	"Everyday Performance",
	"Adventure Ready",
	"Built to Endure",
	"Monsoon Special",
	"Highway King",
	"Eco Drive",
	"Sport Max",
	"Budget Pick"
];
function FormSection({ title, icon: Icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-2xl ring-1 ring-border p-5 space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 pb-1 border-b border-border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-semibold",
				children: title
			})]
		}), children]
	});
}
function Field({ label, children, id, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "block text-xs font-medium text-muted-foreground uppercase tracking-wider",
				htmlFor: id,
				children: label
			}),
			children,
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-muted-foreground",
				children: hint
			})
		]
	});
}
function EditProduct() {
	const { hasPermission } = useAdminAuth();
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const [form, setForm] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [notFound, setNotFound] = (0, import_react.useState)(false);
	const fileRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const product = getProducts().find((p) => p.id === id);
		if (!product) {
			setNotFound(true);
			return;
		}
		const { id: _id, createdAt: _c, ...rest } = product;
		setForm(rest);
	}, [id]);
	if (!hasPermission("products.edit")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-8 w-8 text-destructive" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-xl font-bold",
			children: "Access Denied"
		})]
	}) });
	if (notFound) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-xl font-bold",
			children: "Product Not Found"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => navigate({ to: "/admin/products" }),
			className: "btn-ghost-glow text-sm",
			children: "← Back to Products"
		})]
	}) });
	if (!form) return null;
	const set = (key, val) => setForm((f) => f ? {
		...f,
		[key]: val
	} : f);
	const handleImage = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (ev) => set("image", ev.target?.result);
		reader.readAsDataURL(file);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setSaving(true);
		await new Promise((r) => setTimeout(r, 700));
		updateProduct(id, form);
		setSaving(false);
		setSaved(true);
		await new Promise((r) => setTimeout(r, 1200));
		navigate({ to: "/admin/products" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex items-center gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => navigate({ to: "/admin/products" }),
			className: "flex h-9 w-9 items-center justify-center rounded-xl border border-border hover:bg-secondary transition-colors",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl font-bold",
			children: "Edit Product"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Changes save to home page immediately."
		})] })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
		onSubmit: handleSubmit,
		id: "edit-product-form",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid lg:grid-cols-3 gap-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-2 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormSection, {
						title: "Basic Information",
						icon: Package,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid sm:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Product Name",
									id: "edit-name",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "edit-name",
										required: true,
										className: "admin-input",
										value: form.name,
										onChange: (e) => set("name", e.target.value)
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Brand",
									id: "edit-brand",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "edit-brand",
										required: true,
										className: "admin-input",
										value: form.brand,
										onChange: (e) => set("brand", e.target.value)
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid sm:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Category",
									id: "edit-category",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										id: "edit-category",
										className: "admin-input",
										value: form.category,
										onChange: (e) => set("category", e.target.value),
										children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Badge / Tag",
									id: "edit-tag",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										id: "edit-tag",
										className: "admin-input",
										value: form.tag,
										onChange: (e) => set("tag", e.target.value),
										children: TAGS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: t }, t))
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Short Spec Line",
								id: "edit-spec",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "edit-spec",
									required: true,
									className: "admin-input",
									value: form.spec,
									onChange: (e) => set("spec", e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Description",
								id: "edit-desc",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									id: "edit-desc",
									rows: 3,
									className: "admin-input resize-none",
									value: form.description,
									onChange: (e) => set("description", e.target.value)
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormSection, {
						title: "Technical Specifications",
						icon: Ruler,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid sm:grid-cols-3 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Tyre Size",
									id: "edit-size",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "edit-size",
										required: true,
										className: "admin-input",
										value: form.size,
										onChange: (e) => set("size", e.target.value)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Load Index",
									id: "edit-load",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "edit-load",
										className: "admin-input",
										value: form.loadIndex,
										onChange: (e) => set("loadIndex", e.target.value)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Season",
									id: "edit-season",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										id: "edit-season",
										className: "admin-input",
										value: form.season,
										onChange: (e) => set("season", e.target.value),
										children: SEASONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
									})
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormSection, {
						title: "Pricing & Inventory",
						icon: BadgeDollarSign,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid sm:grid-cols-2 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Sale Price (₹)",
									id: "prod-price",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "prod-price",
										type: "number",
										required: true,
										className: "admin-input",
										placeholder: "4299",
										value: form.price || "",
										onChange: (e) => set("price", Number(e.target.value))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Original Price (MRP) (₹)",
									id: "prod-orig-price",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "prod-orig-price",
										type: "number",
										className: "admin-input",
										placeholder: "6599",
										value: form.originalPrice || "",
										onChange: (e) => set("originalPrice", Number(e.target.value))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Stock Count",
									id: "prod-stock",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "prod-stock",
										type: "number",
										required: true,
										className: "admin-input",
										placeholder: "10",
										value: form.stockCount || "",
										onChange: (e) => set("stockCount", Number(e.target.value))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "SKU",
									id: "prod-sku",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "prod-sku",
										type: "text",
										className: "admin-input",
										placeholder: "KMBZ-CAR-001",
										value: form.sku || "",
										onChange: (e) => set("sku", e.target.value)
									})
								})
							]
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormSection, {
						title: "Product Image",
						icon: ImagePlus,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 transition-colors cursor-pointer min-h-[200px]",
							onClick: () => fileRef.current?.click(),
							children: [form.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: form.image,
									alt: "Preview",
									className: "max-h-40 w-full object-contain rounded-lg"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: (e) => {
										e.stopPropagation();
										set("image", "");
									},
									className: "absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive/80 text-white hover:bg-destructive",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-muted-foreground",
									children: "Click to change"
								})
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-8 w-8 text-muted-foreground/50 mb-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Click to upload"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileRef,
								id: "edit-image",
								type: "file",
								accept: "image/*",
								className: "hidden",
								onChange: handleImage
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormSection, {
						title: "Visibility",
						icon: Tag,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center justify-between gap-3 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium",
								children: "In Stock"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: "Show as available"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								onClick: () => set("inStock", !form.inStock),
								className: `relative h-6 w-11 rounded-full transition-colors cursor-pointer ${form.inStock ? "bg-primary" : "bg-secondary"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${form.inStock ? "translate-x-5" : "translate-x-0"}` })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center justify-between gap-3 cursor-pointer pt-2 border-t border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium",
								children: "Featured"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: "Highlight on home page"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								onClick: () => set("featured", !form.featured),
								className: `relative h-6 w-11 rounded-full transition-colors cursor-pointer ${form.featured ? "bg-primary" : "bg-secondary"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${form.featured ? "translate-x-5" : "translate-x-0"}` })
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						id: "edit-product-submit",
						type: "submit",
						disabled: saving || saved,
						className: "btn-hero w-full justify-center disabled:opacity-60",
						children: saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-4 w-4" }), " Updated!"] }) : saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Saving…"] }) : "Update Product"
					})
				]
			})]
		})
	})] });
}
//#endregion
export { EditProduct as component };
