globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/About-AMHthdzs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d2a-k3ECk/8zempqoC+cbleEoG8G8IU\"",
		"mtime": "2026-06-30T08:23:54.487Z",
		"size": 3370,
		"path": "../public/assets/About-AMHthdzs.js"
	},
	"/assets/admin-DJ7LAi8J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26-SoFMfAHVJ5oqB5t+mpFRoQvFIoc\"",
		"mtime": "2026-06-30T08:23:54.497Z",
		"size": 38,
		"path": "../public/assets/admin-DJ7LAi8J.js"
	},
	"/assets/about-IQNye6Bh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"153-BPfGa0CvqjJnU0n1/leccnYWmIw\"",
		"mtime": "2026-06-30T08:23:54.495Z",
		"size": 339,
		"path": "../public/assets/about-IQNye6Bh.js"
	},
	"/assets/account-B6cLCD0y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2eaf-Q8hjhhYR3589duEoSRifS/D5dgw\"",
		"mtime": "2026-06-30T08:23:54.496Z",
		"size": 11951,
		"path": "../public/assets/account-B6cLCD0y.js"
	},
	"/assets/adminAuth-DfpuEpsf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e2-090G/s9gPmh+bchd8TtruwKpk6w\"",
		"mtime": "2026-06-30T08:23:54.511Z",
		"size": 738,
		"path": "../public/assets/adminAuth-DfpuEpsf.js"
	},
	"/assets/admin-DbncKy4z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f7-RmP2gVlc0uBBPgAzVgefYwrkNik\"",
		"mtime": "2026-06-30T08:23:54.511Z",
		"size": 759,
		"path": "../public/assets/admin-DbncKy4z.js"
	},
	"/assets/arrow-right-CkVj8VVi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-N9Cl6Jxv1LsVpFRzatTFXk+ZY20\"",
		"mtime": "2026-06-30T08:23:54.511Z",
		"size": 154,
		"path": "../public/assets/arrow-right-CkVj8VVi.js"
	},
	"/assets/Branches-D684Q2UB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b8c-L4prEJlSq7SA0GdRvsWpGdRK5jk\"",
		"mtime": "2026-06-30T08:23:54.489Z",
		"size": 2956,
		"path": "../public/assets/Branches-D684Q2UB.js"
	},
	"/assets/branches-XLxu1XzU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"156-ZAAYwf0P3BtAf5FTFPKH2WG3AwU\"",
		"mtime": "2026-06-30T08:23:54.513Z",
		"size": 342,
		"path": "../public/assets/branches-XLxu1XzU.js"
	},
	"/assets/cart-DzOXMI_H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1439-e9Y/lQZqVnWDiWF3FDG727O47q8\"",
		"mtime": "2026-06-30T08:23:54.514Z",
		"size": 5177,
		"path": "../public/assets/cart-DzOXMI_H.js"
	},
	"/assets/check-B3ChGcRh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"71-OC9Q45IREzWhJDoe7LssrijpZ7U\"",
		"mtime": "2026-06-30T08:23:54.521Z",
		"size": 113,
		"path": "../public/assets/check-B3ChGcRh.js"
	},
	"/assets/chevron-right-DkNs2V5H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"77-MtZ6ADpfSAYA6Y9n17igp7P1yiE\"",
		"mtime": "2026-06-30T08:23:54.527Z",
		"size": 119,
		"path": "../public/assets/chevron-right-DkNs2V5H.js"
	},
	"/assets/checkout-DbmDs1tT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"45cd-bnDESWabREromQiuCseNuIvgFGg\"",
		"mtime": "2026-06-30T08:23:54.526Z",
		"size": 17869,
		"path": "../public/assets/checkout-DbmDs1tT.js"
	},
	"/assets/circle-check-big-BRiM3vSL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b7-o8w4C3hc8ivSkgPpmPvDADcrhME\"",
		"mtime": "2026-06-30T08:23:54.529Z",
		"size": 183,
		"path": "../public/assets/circle-check-big-BRiM3vSL.js"
	},
	"/assets/circle-check-CMEiSBPY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a7-x49x1FY/hc6SxgPOnWQOtaMZ0dE\"",
		"mtime": "2026-06-30T08:23:54.528Z",
		"size": 167,
		"path": "../public/assets/circle-check-CMEiSBPY.js"
	},
	"/assets/circle-x-Dgj7niSK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-JJujDvQtWs4U4koGIiyUHj3X5NE\"",
		"mtime": "2026-06-30T08:23:54.529Z",
		"size": 196,
		"path": "../public/assets/circle-x-Dgj7niSK.js"
	},
	"/assets/contact-BaLeg6Q7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15f-YTmYm7y7IOVBPrsu3dGgTLXx2wE\"",
		"mtime": "2026-06-30T08:23:54.549Z",
		"size": 351,
		"path": "../public/assets/contact-BaLeg6Q7.js"
	},
	"/assets/Contact-BivpCRle.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1124-8gwVjkvEHRaI64Y+vCnRVq0q7lk\"",
		"mtime": "2026-06-30T08:23:54.490Z",
		"size": 4388,
		"path": "../public/assets/Contact-BivpCRle.js"
	},
	"/assets/dashboard-Dsf0tKbv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c77-SuvucYhX+H+ZFTiAX7DtpeGzyYY\"",
		"mtime": "2026-06-30T08:23:54.561Z",
		"size": 7287,
		"path": "../public/assets/dashboard-Dsf0tKbv.js"
	},
	"/assets/AdminLayout-DOxvDgTb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1452-EuhvI8VG9cLll3sZbgqMg2WwW/o\"",
		"mtime": "2026-06-30T08:23:54.488Z",
		"size": 5202,
		"path": "../public/assets/AdminLayout-DOxvDgTb.js"
	},
	"/assets/customers-CytQnoLk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b21-okDKWyIwghTbc9xn49U3GDxolJY\"",
		"mtime": "2026-06-30T08:23:54.550Z",
		"size": 6945,
		"path": "../public/assets/customers-CytQnoLk.js"
	},
	"/assets/disc-CdSUGm7G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-Qh9OaN+njsamQ/fVH5Ts9dbxtMI\"",
		"mtime": "2026-06-30T08:23:54.562Z",
		"size": 165,
		"path": "../public/assets/disc-CdSUGm7G.js"
	},
	"/assets/external-link-Cxr8lGAX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f0-zD1ELQg3keRjlsZfA7s7xKF2w1I\"",
		"mtime": "2026-06-30T08:23:54.564Z",
		"size": 240,
		"path": "../public/assets/external-link-Cxr8lGAX.js"
	},
	"/assets/eye-2TkZQm0D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f5-wDm0mbQq21WMLp0gCakiMs9FhrA\"",
		"mtime": "2026-06-30T08:23:54.564Z",
		"size": 245,
		"path": "../public/assets/eye-2TkZQm0D.js"
	},
	"/assets/alloy-rim-B8jeQ2HP.png": {
		"type": "image/png",
		"etag": "\"95ec4-6lgS6zYcbf6bAWFh1ftMFATA1oY\"",
		"mtime": "2026-06-30T08:23:54.762Z",
		"size": 614084,
		"path": "../public/assets/alloy-rim-B8jeQ2HP.png"
	},
	"/assets/Footer-DMRPaKDz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d54-WrAeuqCCSG1I/BKDcQQCq7ioZF0\"",
		"mtime": "2026-06-30T08:23:54.492Z",
		"size": 11604,
		"path": "../public/assets/Footer-DMRPaKDz.js"
	},
	"/assets/eye-off-DqkPXwqt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a3-rMnQtrpW85PT5Etxg6AYTBYhiu4\"",
		"mtime": "2026-06-30T08:23:54.577Z",
		"size": 419,
		"path": "../public/assets/eye-off-DqkPXwqt.js"
	},
	"/assets/link-b6_yg8dy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"111d-kdyVlXKF49ktqnb1FCjbWkJAF7M\"",
		"mtime": "2026-06-30T08:23:54.578Z",
		"size": 4381,
		"path": "../public/assets/link-b6_yg8dy.js"
	},
	"/assets/log-out-CmZocer4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"db-dqfblL0Gp3NaF/Q0NccH3X057bo\"",
		"mtime": "2026-06-30T08:23:54.579Z",
		"size": 219,
		"path": "../public/assets/log-out-CmZocer4.js"
	},
	"/assets/login-NN5Tc1de.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1395-ozVfIoq36MPfGTVF9ORV2kyOFSE\"",
		"mtime": "2026-06-30T08:23:54.579Z",
		"size": 5013,
		"path": "../public/assets/login-NN5Tc1de.js"
	},
	"/assets/map-pin-B-qDN9_2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f8-okSQgx/jXjG6dvirKDhlo5IkwZQ\"",
		"mtime": "2026-06-30T08:23:54.582Z",
		"size": 248,
		"path": "../public/assets/map-pin-B-qDN9_2.js"
	},
	"/assets/menu-CYS1C8NU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-rZmAwUW4Oi1iv0uJsmlYurMY+Og\"",
		"mtime": "2026-06-30T08:23:54.598Z",
		"size": 178,
		"path": "../public/assets/menu-CYS1C8NU.js"
	},
	"/assets/orders-qc0iZIBy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bfc-aGoUTnvKIcWbkMoRFNoJfUHmr54\"",
		"mtime": "2026-06-30T08:23:54.608Z",
		"size": 11260,
		"path": "../public/assets/orders-qc0iZIBy.js"
	},
	"/assets/order-success-DgkiKFqv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f0b-dARYDA6dOdrRmzFS5Fq+gZhpxps\"",
		"mtime": "2026-06-30T08:23:54.598Z",
		"size": 3851,
		"path": "../public/assets/order-success-DgkiKFqv.js"
	},
	"/assets/index-Chuy29aM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"58b9a-yMRVL4vwaRkBdnqKBaJxsKjfg2s\"",
		"mtime": "2026-06-30T08:23:54.486Z",
		"size": 363418,
		"path": "../public/assets/index-Chuy29aM.js"
	},
	"/assets/plus-BRbySOAq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e-heJJA9taiP3olHM6oRi0exEkie4\"",
		"mtime": "2026-06-30T08:23:54.614Z",
		"size": 142,
		"path": "../public/assets/plus-BRbySOAq.js"
	},
	"/assets/pencil-9ZziyHab.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109-JfRtUZxblI0irBxGt81l72fGsNw\"",
		"mtime": "2026-06-30T08:23:54.609Z",
		"size": 265,
		"path": "../public/assets/pencil-9ZziyHab.js"
	},
	"/assets/products-CAeQG2F5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2147-ViU2uhigjpRrkGbxw0yUKN3sGpg\"",
		"mtime": "2026-06-30T08:23:54.626Z",
		"size": 8519,
		"path": "../public/assets/products-CAeQG2F5.js"
	},
	"/assets/Products-CEIR4FsY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fcd-pDaxTg0LEqe/keYSJNTXeR0iUaY\"",
		"mtime": "2026-06-30T08:23:54.493Z",
		"size": 4045,
		"path": "../public/assets/Products-CEIR4FsY.js"
	},
	"/assets/products_.add-CPBLjJzS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2822-drd5zLYkb3vbgzC9q8BhrVBfKt0\"",
		"mtime": "2026-06-30T08:23:54.651Z",
		"size": 10274,
		"path": "../public/assets/products_.add-CPBLjJzS.js"
	},
	"/assets/products_.edit._id-BmkTTfvL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24f7-cfGzh1dH/TkkQE6ckzmeCkderTo\"",
		"mtime": "2026-06-30T08:23:54.653Z",
		"size": 9463,
		"path": "../public/assets/products_.edit._id-BmkTTfvL.js"
	},
	"/assets/proxy-DruSJ8oI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d88c-XQY7Xrvvq/Lya25zfsMxFExnOOM\"",
		"mtime": "2026-06-30T08:23:54.657Z",
		"size": 120972,
		"path": "../public/assets/proxy-DruSJ8oI.js"
	},
	"/assets/react-dom-CY7bMn09.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dd8-MF2wyxNNECnbB/E9ij5GmykFWD0\"",
		"mtime": "2026-06-30T08:23:54.658Z",
		"size": 3544,
		"path": "../public/assets/react-dom-CY7bMn09.js"
	},
	"/assets/products-B1IdfZjj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"160-jKij2Dm9qA9CWNMOqDtdMeZ17As\"",
		"mtime": "2026-06-30T08:23:54.625Z",
		"size": 352,
		"path": "../public/assets/products-B1IdfZjj.js"
	},
	"/assets/redirect-BB44wZa9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"245-K3qCyv600LQ802/aV+Gg83W7kdk\"",
		"mtime": "2026-06-30T08:23:54.664Z",
		"size": 581,
		"path": "../public/assets/redirect-BB44wZa9.js"
	},
	"/assets/package-DXyc4wAi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"169-5aSFPE4TL0Tf5zbG5TiVO/TJfIE\"",
		"mtime": "2026-06-30T08:23:54.608Z",
		"size": 361,
		"path": "../public/assets/package-DXyc4wAi.js"
	},
	"/assets/product._id-BdZ4BKPN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2224-xyDn9AZz2aydKxmjgHQRX7p/CRs\"",
		"mtime": "2026-06-30T08:23:54.615Z",
		"size": 8740,
		"path": "../public/assets/product._id-BdZ4BKPN.js"
	},
	"/assets/routes-zBukJLU9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5226-NCvHYRX1raJ9b1jTvu21d6DmG6A\"",
		"mtime": "2026-06-30T08:23:54.665Z",
		"size": 21030,
		"path": "../public/assets/routes-zBukJLU9.js"
	},
	"/assets/hero-bg-new-Cu1nKhO8.png": {
		"type": "image/png",
		"etag": "\"d0927-/6yBg9kIsbpDxLWBAImnrTQmaKo\"",
		"mtime": "2026-06-30T08:23:54.766Z",
		"size": 854311,
		"path": "../public/assets/hero-bg-new-Cu1nKhO8.png"
	},
	"/assets/login-bg-C5MksQXx.png": {
		"type": "image/png",
		"etag": "\"d331c-s+BXPbP6/4kEoiX6dGJ2bUVlW20\"",
		"mtime": "2026-06-30T08:23:54.770Z",
		"size": 865052,
		"path": "../public/assets/login-bg-C5MksQXx.png"
	},
	"/assets/search-BX14dMBa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a3-iWgjENhJBJo+urUGlRzNtBqL/k4\"",
		"mtime": "2026-06-30T08:23:54.666Z",
		"size": 163,
		"path": "../public/assets/search-BX14dMBa.js"
	},
	"/assets/service-alignment-hsBtdQzi.jpg": {
		"type": "image/jpeg",
		"etag": "\"f36a-xkHR1uJl9eRoZURhEucGlSvJAjY\"",
		"mtime": "2026-06-30T08:23:54.771Z",
		"size": 62314,
		"path": "../public/assets/service-alignment-hsBtdQzi.jpg"
	},
	"/assets/services-DI6vKecN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"160-QUQP1w/4etF3wywlaAizBL3e2qA\"",
		"mtime": "2026-06-30T08:23:54.673Z",
		"size": 352,
		"path": "../public/assets/services-DI6vKecN.js"
	},
	"/assets/Services-D_Dg5T2-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d36-VNQhcruGrGMnoyJvRpUAD28Ns/I\"",
		"mtime": "2026-06-30T08:23:54.494Z",
		"size": 3382,
		"path": "../public/assets/Services-D_Dg5T2-.js"
	},
	"/assets/service-truck-CUtIAbrf.jpg": {
		"type": "image/jpeg",
		"etag": "\"1b39c-LRe5oSmV7QFhCI6k7YYOfNdeAjI\"",
		"mtime": "2026-06-30T08:23:54.774Z",
		"size": 111516,
		"path": "../public/assets/service-truck-CUtIAbrf.jpg"
	},
	"/assets/shield-alert-2ZQxL6zb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"156-sT3y51IEBaUQszN9tbxME6w1oII\"",
		"mtime": "2026-06-30T08:23:54.675Z",
		"size": 342,
		"path": "../public/assets/shield-alert-2ZQxL6zb.js"
	},
	"/assets/shield-check-CRxLicgq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"135-1Ghy/Te+uyQVxB1CiBX1a6iZMT0\"",
		"mtime": "2026-06-30T08:23:54.700Z",
		"size": 309,
		"path": "../public/assets/shield-check-CRxLicgq.js"
	},
	"/assets/shield-Dt3IG_dS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"105-7yZ0Sw2xc7hEbrA79GOoWXKt4x4\"",
		"mtime": "2026-06-30T08:23:54.674Z",
		"size": 261,
		"path": "../public/assets/shield-Dt3IG_dS.js"
	},
	"/assets/shopping-cart-xTRNco3E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"119-Klt5/hES4grXCsmJMnbBIGq3R+o\"",
		"mtime": "2026-06-30T08:23:54.705Z",
		"size": 281,
		"path": "../public/assets/shopping-cart-xTRNco3E.js"
	},
	"/assets/smartphone-Cgcy2Ya6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ba-4zr6ZrAT2uCzyOpoVMfTxI3RJsc\"",
		"mtime": "2026-06-30T08:23:54.712Z",
		"size": 186,
		"path": "../public/assets/smartphone-Cgcy2Ya6.js"
	},
	"/assets/star-sOCC83fD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cd-vzz2DpY7RDNspZ4W+tLiVoqbNAk\"",
		"mtime": "2026-06-30T08:23:54.713Z",
		"size": 461,
		"path": "../public/assets/star-sOCC83fD.js"
	},
	"/assets/tag-BMoQjsoK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13b-POfTCg8Pb284DJZCNcvmC7WFe38\"",
		"mtime": "2026-06-30T08:23:54.713Z",
		"size": 315,
		"path": "../public/assets/tag-BMoQjsoK.js"
	},
	"/assets/truck-D5keTyZz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18b-HowG0TvGlrUsOE1NnYqsMMO8sM4\"",
		"mtime": "2026-06-30T08:23:54.730Z",
		"size": 395,
		"path": "../public/assets/truck-D5keTyZz.js"
	},
	"/assets/trash-2-DGNxNbwF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13d-DEl301p1Ar7GLQz3SxZxfbcGaa0\"",
		"mtime": "2026-06-30T08:23:54.714Z",
		"size": 317,
		"path": "../public/assets/trash-2-DGNxNbwF.js"
	},
	"/assets/styles-Bxrp0cFr.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1cac1-eHLsktJzf5YcBsGVkXaQ9zougnc\"",
		"mtime": "2026-06-30T08:23:54.775Z",
		"size": 117441,
		"path": "../public/assets/styles-Bxrp0cFr.css"
	},
	"/assets/tyre-product-RU_tY_D5.jpg": {
		"type": "image/jpeg",
		"etag": "\"b3d0-MzlXpQcA0HLJgdg4Pbi1zbeKTKg\"",
		"mtime": "2026-06-30T08:23:54.783Z",
		"size": 46032,
		"path": "../public/assets/tyre-product-RU_tY_D5.jpg"
	},
	"/assets/upload-BSTUS4kv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"513-HLe9tvzWlPFQ2jtgn+iU25TfD+A\"",
		"mtime": "2026-06-30T08:23:54.731Z",
		"size": 1299,
		"path": "../public/assets/upload-BSTUS4kv.js"
	},
	"/assets/tyre-featured-black-BYCHWtUO.png": {
		"type": "image/png",
		"etag": "\"bad09-6k/blrA/i4lfC7wG8eeUHmY5r+g\"",
		"mtime": "2026-06-30T08:23:54.777Z",
		"size": 765193,
		"path": "../public/assets/tyre-featured-black-BYCHWtUO.png"
	},
	"/assets/tyre-pressure-gauge-DhGKtyO-.png": {
		"type": "image/png",
		"etag": "\"8c0c0-+S9LkMj3tlrJ0ovGx6J0jwemxTI\"",
		"mtime": "2026-06-30T08:23:54.782Z",
		"size": 573632,
		"path": "../public/assets/tyre-pressure-gauge-DhGKtyO-.png"
	},
	"/assets/tyre-shine-BiWM7WFN.png": {
		"type": "image/png",
		"etag": "\"85940-UHp6g6qwtI+SLFE8qMBtWtJGiVw\"",
		"mtime": "2026-06-30T08:23:54.784Z",
		"size": 547136,
		"path": "../public/assets/tyre-shine-BiWM7WFN.png"
	},
	"/assets/tyre-inflator-DGYfh8Bk.png": {
		"type": "image/png",
		"etag": "\"810d2-vXsIpWU29oDAP92vkNn8+3OhqRI\"",
		"mtime": "2026-06-30T08:23:54.781Z",
		"size": 528594,
		"path": "../public/assets/tyre-inflator-DGYfh8Bk.png"
	},
	"/assets/useLocation-CyhLRXGC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-KJ5MRRqKb9Gbjfdo1hyz5FB5OqA\"",
		"mtime": "2026-06-30T08:23:54.736Z",
		"size": 196,
		"path": "../public/assets/useLocation-CyhLRXGC.js"
	},
	"/assets/users-BM2FG_P9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d27-rkBDsE1GZ66H/iZ9D3Lkblj8z1s\"",
		"mtime": "2026-06-30T08:23:54.744Z",
		"size": 11559,
		"path": "../public/assets/users-BM2FG_P9.js"
	},
	"/assets/tyre-hero-black-CNN2UhY5.png": {
		"type": "image/png",
		"etag": "\"a99f8-eefE2KOG15NpS+pNEPQDZav0Swg\"",
		"mtime": "2026-06-30T08:23:54.779Z",
		"size": 694776,
		"path": "../public/assets/tyre-hero-black-CNN2UhY5.png"
	},
	"/assets/useRouter-CAeNMlbO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2486-SpW8pCj5dJjRksEXCVIJBtIFyiQ\"",
		"mtime": "2026-06-30T08:23:54.736Z",
		"size": 9350,
		"path": "../public/assets/useRouter-CAeNMlbO.js"
	},
	"/assets/users-BxVYI3ba.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"127-C3bQkmxBC/iCZ4WROIM+2aLZWsg\"",
		"mtime": "2026-06-30T08:23:54.744Z",
		"size": 295,
		"path": "../public/assets/users-BxVYI3ba.js"
	},
	"/assets/useShop-Bd55I4Fe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"220-UY/8J0DEGTVhV6p5ENHjTX7+CYA\"",
		"mtime": "2026-06-30T08:23:54.738Z",
		"size": 544,
		"path": "../public/assets/useShop-Bd55I4Fe.js"
	},
	"/assets/wrench-g2hABpys.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"124-iToAqr7uAYUTHdbO8mFKlBkfnOw\"",
		"mtime": "2026-06-30T08:23:54.745Z",
		"size": 292,
		"path": "../public/assets/wrench-g2hABpys.js"
	},
	"/assets/useStore-BKieDQmV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"481f-04NWJaofHxuFEHLU0tYKOp0YrH8\"",
		"mtime": "2026-06-30T08:23:54.743Z",
		"size": 18463,
		"path": "../public/assets/useStore-BKieDQmV.js"
	},
	"/assets/zap-Ffdj9Mzr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-xtR+dt5k6cHpjKLh22oSdwVrR+Y\"",
		"mtime": "2026-06-30T08:23:54.761Z",
		"size": 251,
		"path": "../public/assets/zap-Ffdj9Mzr.js"
	},
	"/assets/valve-caps-B1CqV7qs.png": {
		"type": "image/png",
		"etag": "\"9ddc1-KSLIzNWREM+vnWdp9BEsOh0h8Vg\"",
		"mtime": "2026-06-30T08:23:54.792Z",
		"size": 646593,
		"path": "../public/assets/valve-caps-B1CqV7qs.png"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_n4Ht1Y = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_n4Ht1Y
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
