import { createRouter, createWebHashHistory } from "vue-router";
import { Catalog, Basket } from "@/pages";


const routes = [
	{ path: '/', name: 'catalog', component: Catalog },
	{ path: '/basket', name: 'basket', component: Basket },
]


const router = createRouter({
	routes,
	history: createWebHashHistory()
})


export default router;