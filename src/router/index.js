import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('../views/Home.vue')
		},
		{
			path: '/dashboard',
			name: 'dashboard',
			component: () => import('../views/Dashboard.vue')
		},
		{
			path: '/dashboard/:address',
			name: 'user',
			component: () => import('../views/User.vue')
		},
	],
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else if (to.name !== from.name) {
			return {
				left: 0,
				top: 0,
				behavior: 'instant',
			}
		}
	}
})

export default router
