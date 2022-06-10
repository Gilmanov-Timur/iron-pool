<template>
	<main>
		<div class="container">
			<div class="text-center" v-if="isLoading">
				<div class="spinner-border text-primary">
					<span class="visually-hidden">
						{{ $t('loading') }}...
					</span>
				</div>
			</div>

			<template v-else-if="errorMessage">
				<h3 class="text-center">
					{{ $t('input_your_address') }}
				</h3>
				<Search @reload="fetchData" />
				<h4 class="text-center text-danger">
					{{ errorMessage }}
				</h4>
			</template>

			<template v-else>
				<h5 class="mb-4 text-break">
					{{ $t('welcome_back') }},
					<span class="text-muted fs-6">{{ userInfo.publicAddress }}</span>
				</h5>
				<div class="row">
					<div class="col-12 col-sm-6 col-lg mb-3">
						<div class="alert alert-dark bg-light mb-0 h-100 px-2">
							<div class="row">
								<div class="col-auto pe-0">
									<div class="text-primary">
										<svg style="width:48px;height:48px" viewBox="0 0 24 24">
											<path fill="currentColor" d="M12,16A3,3 0 0,1 9,13C9,11.88 9.61,10.9 10.5,10.39L20.21,4.77L14.68,14.35C14.18,15.33 13.17,16 12,16M12,3C13.81,3 15.5,3.5 16.97,4.32L14.87,5.53C14,5.19 13,5 12,5A8,8 0 0,0 4,13C4,15.21 4.89,17.21 6.34,18.65H6.35C6.74,19.04 6.74,19.67 6.35,20.06C5.96,20.45 5.32,20.45 4.93,20.07V20.07C3.12,18.26 2,15.76 2,13A10,10 0 0,1 12,3M22,13C22,15.76 20.88,18.26 19.07,20.07V20.07C18.68,20.45 18.05,20.45 17.66,20.06C17.27,19.67 17.27,19.04 17.66,18.65V18.65C19.11,17.2 20,15.21 20,13C20,12 19.81,11 19.46,10.1L20.67,8C21.5,9.5 22,11.18 22,13Z" />
										</svg>
									</div>
								</div>
								<div class="col">
									<div class="mb-1 lh-sm">
										{{ $t('current_hashrate') }}
									</div>
									<div class="h5 mb-0">
										{{ userInfo.hashRate }}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-12 col-sm-6 col-lg mb-3">
						<div class="alert alert-dark bg-light mb-0 h-100 px-2">
							<div class="row">
								<div class="col-auto pe-0">
									<div class="text-primary">
										<svg style="width:48px;height:48px" viewBox="0 0 24 24">
											<path fill="currentColor" d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z" />
										</svg>
									</div>
								</div>
								<div class="col">
									<div class="mb-1 lh-sm">
										{{ $t('earnings') }}
									</div>
									<div class="h5 mb-0">
										{{ userInfo.amountOfUsersMoney.ironWithAComma.toFixed(8) }} IRON
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-12 col-sm-6 col-lg mb-3" v-if="userInfo.averageUserEarnings">
						<div class="alert alert-dark bg-light mb-0 h-100 px-2">
							<div class="row">
								<div class="col-auto pe-0">
									<div class="text-primary">
										<svg style="width:48px;height:48px" viewBox="0 0 256 256">
											<g transform="translate(128 128) scale(0.72 0.72)">
												<g transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)">
													<path d="M 74.38 90 H 15.62 c -4.357 0 -7.902 -3.545 -7.902 -7.901 V 41.167 c 0 -4.357 3.545 -7.901 7.902 -7.901 h 58.76 c 4.356 0 7.901 3.544 7.901 7.901 v 40.931 C 82.281 86.455 78.736 90 74.38 90 z M 15.62 37.266 c -2.151 0 -3.902 1.75 -3.902 3.901 v 40.931 c 0 2.151 1.75 3.901 3.902 3.901 h 58.76 c 2.151 0 3.901 -1.75 3.901 -3.901 V 41.167 c 0 -2.151 -1.75 -3.901 -3.901 -3.901 H 15.62 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
													<path d="M 80.281 70.093 H 69.375 c -4.665 0 -8.46 -3.795 -8.46 -8.46 c 0 -4.664 3.795 -8.459 8.46 -8.459 h 10.906 c 1.104 0 2 0.896 2 2 v 12.919 C 82.281 69.197 81.386 70.093 80.281 70.093 z M 69.375 57.174 c -2.459 0 -4.46 2 -4.46 4.459 s 2.001 4.46 4.46 4.46 h 8.906 v -8.919 H 69.375 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
													<circle cx="69.545" cy="61.635" r="1.955" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform="matrix(1 0 0 1 0 0) "/>
													<path d="M 35.328 21.564 c -5.945 0 -10.782 -4.837 -10.782 -10.782 S 29.383 0 35.328 0 S 46.11 4.837 46.11 10.782 S 41.273 21.564 35.328 21.564 z M 35.328 4 c -3.74 0 -6.782 3.042 -6.782 6.782 s 3.042 6.782 6.782 6.782 s 6.782 -3.042 6.782 -6.782 S 39.068 4 35.328 4 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
													<path d="M 51.516 36.126 c -0.563 -1.329 -0.849 -2.742 -0.849 -4.199 c 0 -5.945 4.837 -10.782 10.782 -10.782 s 10.782 4.837 10.782 10.782 c 0 1.419 -0.271 2.799 -0.808 4.101 l -3.699 -1.523 c 0.336 -0.816 0.507 -1.684 0.507 -2.578 c 0 -3.74 -3.043 -6.782 -6.782 -6.782 s -6.782 3.042 -6.782 6.782 c 0 0.917 0.179 1.805 0.532 2.638 L 51.516 36.126 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
													<path d="M 61.449 17.758 c -1.104 0 -2 -0.896 -2 -2 V 2 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 v 13.758 C 63.449 16.862 62.554 17.758 61.449 17.758 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
													<path d="M 55.154 20.346 c -1.104 0 -2 -0.896 -2 -2 v -8.223 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 v 8.223 C 57.154 19.45 56.259 20.346 55.154 20.346 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
													<path d="M 67.743 20.346 c -1.104 0 -2 -0.896 -2 -2 v -3.248 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 v 3.248 C 69.743 19.45 68.848 20.346 67.743 20.346 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
												</g>
											</g>
										</svg>
									</div>
								</div>
								<div class="col">
									<div class="mb-1 lh-sm">
										{{ $t('approximate_earnings') }}
									</div>
									<div class="h5 mb-0">
										{{ userInfo.averageUserEarnings }} IRON
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-12 col-sm-6 col-lg mb-3">
						<div class="alert alert-dark bg-light mb-0 h-100 px-2">
							<div class="row">
								<div class="col-auto pe-0">
									<div class="text-primary lh-1">
										<i class="icon bi-plug" style="font-size:48px;"></i>
									</div>
								</div>
								<div class="col text-break">
									<div class="mb-1 lh-sm">
										{{ $t('status') }}
									</div>
									<div class="h5 mb-0">
										{{ status }}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<Chart
					class="mt-5"
					:history="userInfo.userRateEightHours.rawUserRateEightHours"
					:key="chartKey"
					v-if="userInfo.userRateEightHours.rawUserRateEightHours.length"
				/>

				<template v-if="userInfo.awardsPaid.length">
					<div class="mt-5 mb-4 h3 text-center">
						{{ $t('payout_statistics') }}
					</div>
					<div class="awards">
						<div class="table-responsive h-100">
							<table class="table table-striped">
								<thead>
									<tr>
										<th>{{ $t('date') }}</th>
										<th>{{ $t('amount') }}</th>
										<th>{{ $t('transaction') }}</th>
									</tr>
								</thead>
								<tbody>
									<tr
										v-for="award in userInfo.awardsPaid"
										:key="award.id"
									>
										<td>
											{{ new Date(award.timestamp).toLocaleString($i18n.locale) }}
										</td>
										<td>
											{{ (award.amount / 100000000).toFixed(8) }} IRON
										</td>
										<td>
											<a
												target="_blank"
												:href="`https://explorer.ironfish.network/transaction/${award.hash}`"
											>
												{{ award.hash }}
											</a>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</template>
			</template>
		</div>
	</main>
</template>

<script>
import Chart from '@/components/Chart.vue'
import Search from '@/components/Search.vue'

export default {
	name: 'User',
	components: {
		Chart,
		Search
	},
	props: {
		poolInfo: Object
	},
	data() {
		return {
			isLoading: false,
			userInfo: null,
			/*userInfo: {
				amountOfUsersMoney: {
					ironWithAComma: 0,
					unprocessedAmount: 0,
				},
				hashRate: '',
				online: '',
				publicAddress: '',
				timestamp: '',
				userRateEightHours: {
					rawUserRateEightHours: []
				}
			},*/
			interval: null,
			chartKey: 0,
			errorMessage: '',
		}
	},
	async created() {
		await this.fetchData()
		this.interval = setInterval(async () => {
			await this.fetchData()
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
				this.isLoading = !this.userInfo
				this.errorMessage = ''

				const response = await this.$api.post('/finduser', {
					publickey: this.$route.params.address
				})

				if (response.data.errorMessage) {
					if (!this.userInfo) {
						this.errorMessage = response.data.errorMessage === 'Not Found User' ? this.$t('user_not_found') : response.data.errorMessage
					}
				} else {
					this.userInfo = response.data
					this.userInfo.awardsPaid.reverse()
					if (this.userInfo && JSON.stringify(this.userInfo.userRateEightHours.rawUserRateEightHours) !== JSON.stringify(response.data.userRateEightHours.rawUserRateEightHours)) {
						this.chartKey ++
					}
				}

				this.isLoading = false
			} catch (e) {
				this.isLoading = false

				if (!this.userInfo) {
					this.errorMessage = e.message
				}
			}
		},
	},
	computed: {
		status() {
			const status = this.userInfo.online

			if (status === 'online') {
				return this.$t('online')
			}

			if (Number.isInteger(status)) {
				return `${this.$t('last_seen')}: ${new Date(status).toLocaleString(this.$i18n.locale)}`
			}

			return status
		}
	},
	watch: {
		async $route() {
			await this.fetchData()
		},
	},
}
</script>

<style scoped>
.awards {
	position: relative;
	overflow-x: hidden;
	max-height: 500px;
}
.awards table {
	height: 100%;
}
.awards table th {
	position: sticky;
	top: 0;
	z-index: 1;
}
</style>