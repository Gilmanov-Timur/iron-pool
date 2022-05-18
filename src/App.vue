<template>
	<div class="d-table-row">
		<div class="d-table-cell h-100">
			<Header />
			<router-view :poolInfo="poolInfo" />
		</div>
	</div>
	<div class="d-table-row">
		<div class="d-table-cell">
			<Footer />
		</div>
	</div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
	components: {
		Header,
		Footer,
	},
	data() {
		return {
			poolInfo: {
				counterHashRate: 0,
				poolMiners: 0,
				luck: 0,
				blocks: [],
				amountOfUsersMoney: {
					ironWithAComma: 0,
					unprocessedAmount: 0,
				},
			},
			interval: null,
		}
	},
	async created() {
		await this.fetchData()
		this.interval = setInterval(async () => {
			if (this.$route.name === 'home') {
				await this.fetchData()
			}
		}, 120000)
	},
	unmounted() {
		if (this.interval) {
			clearInterval(this.interval)
		}
	},
	methods: {
		async fetchData() {
			try {
				const response = await this.$api.get('/api/home')
				response.data.blocks.reverse()
				this.poolInfo = response.data
			} catch (e) {
				console.log(e)
			}
		},
	}
}
</script>

<style>
@import '@mdi/font/css/materialdesignicons.min.css';
@import 'assets/styles.css';
</style>