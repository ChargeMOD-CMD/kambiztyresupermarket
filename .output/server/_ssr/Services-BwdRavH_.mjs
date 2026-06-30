import { t as motion } from "../_libs/framer-motion.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { E as RefreshCw, H as Gauge, S as Settings2, d as Truck, q as Disc, r as Wrench } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Services-BwdRavH_.js
var import_jsx_runtime = require_jsx_runtime();
var services = [
	{
		icon: Disc,
		title: "Tyre Sales",
		desc: "Premium multi-brand tyres for cars, SUVs, two-wheelers and commercial vehicles."
	},
	{
		icon: Gauge,
		title: "Wheel Alignment",
		desc: "Computerised 3D alignment for crisp steering and extended tyre life."
	},
	{
		icon: Settings2,
		title: "Wheel Balancing",
		desc: "Dynamic balancing eliminates vibrations and uneven wear."
	},
	{
		icon: Wrench,
		title: "Puncture Repair",
		desc: "Fast, durable tubeless and tube puncture fixes — done right the first time."
	},
	{
		icon: RefreshCw,
		title: "Tyre Rethreading",
		desc: "Cost-effective rethreading that breathes new life into truck and bus tyres."
	},
	{
		icon: Truck,
		title: "Truck Tyre Services",
		desc: "Heavy-duty solutions for fleets and commercial operators across Wayanad."
	}
];
function Services() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "services",
		className: "section-pad relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 -z-10 opacity-50",
			style: { background: "radial-gradient(ellipse at center top, oklch(0.72 0.2 45 / 0.08), transparent 60%)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tag-pill",
						children: "What We Do"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-5 text-4xl sm:text-5xl font-bold text-gradient",
						children: "A complete tyre & automotive workshop."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted-foreground text-lg",
						children: "Every service performed by trained technicians with calibrated equipment — so your vehicle leaves better than it arrived."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5",
				children: services.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 30
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: {
						once: true,
						margin: "-80px"
					},
					transition: {
						delay: i * .06,
						duration: .5
					},
					className: "group relative overflow-hidden rounded-3xl p-7 glass card-tilt",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-20 -right-20 h-44 w-44 rounded-full bg-primary/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-7 w-7 text-primary" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-6 text-xl font-semibold",
								children: s.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-muted-foreground text-sm leading-relaxed",
								children: s.desc
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 text-xs uppercase tracking-[0.2em] text-primary/80 group-hover:text-primary transition-colors",
								children: "Learn more →"
							})
						]
					})]
				}, s.title))
			})]
		})]
	});
}
//#endregion
export { Services as t };
