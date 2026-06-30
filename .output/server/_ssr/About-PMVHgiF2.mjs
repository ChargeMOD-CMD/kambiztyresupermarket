import { t as motion } from "../_libs/framer-motion.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { b as ShieldCheck, o as Users, r as Wrench, tt as Award } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/About-PMVHgiF2.js
var import_jsx_runtime = require_jsx_runtime();
var milestones = [
	{
		year: "2000s",
		title: "Founded in Wayanad",
		desc: "Started as a trusted neighborhood tyre dealer with a promise of honesty and quality."
	},
	{
		year: "2012",
		title: "Service Expansion",
		desc: "Introduced precision wheel alignment, balancing and puncture care under one roof."
	},
	{
		year: "2018",
		title: "Second Branch",
		desc: "Opened our Arinjerummal branch to serve more drivers across Wayanad."
	},
	{
		year: "Today",
		title: "Kerala's Tyre Supermarket",
		desc: "A multi-brand destination loved by 10,000+ drivers across cars, SUVs and trucks."
	}
];
var pillars = [
	{
		icon: Award,
		label: "Genuine Brands",
		desc: "Authorised stock from the world's leading tyre makers."
	},
	{
		icon: Wrench,
		label: "Master Technicians",
		desc: "Trained crews using calibrated, modern equipment."
	},
	{
		icon: ShieldCheck,
		label: "Honest Pricing",
		desc: "Transparent quotes — no surprises, ever."
	},
	{
		icon: Users,
		label: "Customer First",
		desc: "Personal advice for every car, route and budget."
	}
];
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "about",
		className: "section-pad relative",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-2 gap-14 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tag-pill",
						children: "Our Story"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-5 text-4xl sm:text-5xl font-bold text-gradient",
						children: "Two decades of keeping Kerala moving."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-muted-foreground text-lg leading-relaxed",
						children: "From a single counter in Panamaram to a multi-branch tyre supermarket, Kambiz has grown by doing the simple things relentlessly well: the right tyre, fitted precisely, backed by people you can trust."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid sm:grid-cols-2 gap-4",
						children: pillars.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: { delay: i * .08 },
							className: "glass rounded-2xl p-5 card-tilt",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(p.icon, { className: "h-6 w-6 text-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 font-semibold",
									children: p.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-muted-foreground mt-1",
									children: p.desc
								})
							]
						}, p.label))
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-8",
						children: milestones.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								x: 30
							},
							whileInView: {
								opacity: 1,
								x: 0
							},
							viewport: { once: true },
							transition: { delay: i * .1 },
							className: "relative pl-12",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-1.5 top-1.5 h-5 w-5 rounded-full bg-primary shadow-glow animate-pulse-glow" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs uppercase tracking-[0.2em] text-primary font-semibold",
									children: m.year
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-xl font-semibold",
									children: m.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-muted-foreground",
									children: m.desc
								})
							]
						}, m.year))
					})]
				})]
			})
		})
	});
}
//#endregion
export { About as t };
