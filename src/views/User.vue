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
					<div class="col-12 col-sm-6 col-md mb-3">
						<div class="alert alert-dark bg-light mb-0 h-100">
							<div class="row">
								<div class="col-auto pe-0">
									<div class="text-primary">
										<svg style="width:48px;height:48px" viewBox="0 0 24 24">
											<path fill="currentColor" d="M12,16A3,3 0 0,1 9,13C9,11.88 9.61,10.9 10.5,10.39L20.21,4.77L14.68,14.35C14.18,15.33 13.17,16 12,16M12,3C13.81,3 15.5,3.5 16.97,4.32L14.87,5.53C14,5.19 13,5 12,5A8,8 0 0,0 4,13C4,15.21 4.89,17.21 6.34,18.65H6.35C6.74,19.04 6.74,19.67 6.35,20.06C5.96,20.45 5.32,20.45 4.93,20.07V20.07C3.12,18.26 2,15.76 2,13A10,10 0 0,1 12,3M22,13C22,15.76 20.88,18.26 19.07,20.07V20.07C18.68,20.45 18.05,20.45 17.66,20.06C17.27,19.67 17.27,19.04 17.66,18.65V18.65C19.11,17.2 20,15.21 20,13C20,12 19.81,11 19.46,10.1L20.67,8C21.5,9.5 22,11.18 22,13Z" />
										</svg>
									</div>
								</div>
								<div class="col">
									<div class="">
										{{ $t('current_hashrate') }}
									</div>
									<div class="h4 mb-0">
										{{ userInfo.hashRate }}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-12 col-sm-6 col-md mb-3">
						<div class="alert alert-dark bg-light mb-0 h-100">
							<div class="row">
								<div class="col-auto pe-0">
									<div class="text-primary">
										<svg style="width:48px;height:48px" viewBox="0 0 24 24">
											<path fill="currentColor" d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z" />
										</svg>
									</div>
								</div>
								<div class="col">
									<div class="">
										{{ $t('earnings') }}
									</div>
									<div class="h4 mb-0">
										{{ userInfo.amountOfUsersMoney.ironWithAComma.toFixed(2) }} IRON
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-12 col-sm-6 col-md mb-3">
						<div class="alert alert-dark bg-light mb-0 h-100">
							<div class="row">
								<div class="col-auto pe-0">
									<div class="text-primary lh-1">
										<i class="icon bi-plug" style="font-size:48px;"></i>
									</div>
								</div>
								<div class="col text-break">
									<div class="">
										{{ $t('status') }}
									</div>
									<div class="h4 mb-0">
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

				const response = await this.$api.post('/api/finduser', {
					publickey: this.$route.params.address
				})

				if (response.data.errorMessage) {
					if (!this.userInfo) {
						this.errorMessage = response.data.errorMessage === 'Not Found User' ? this.$t('user_not_found') : response.data.errorMessage
					}
				} else {
					if (this.userInfo && JSON.stringify(this.userInfo.userRateEightHours.rawUserRateEightHours) !== JSON.stringify(response.data.userRateEightHours.rawUserRateEightHours)) {
						this.userInfo = response.data
						this.chartKey ++
					} else {
						this.userInfo = response.data
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
