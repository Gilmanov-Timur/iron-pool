<template>
	<div class="p-1 bg-light rounded">
		<canvas ref="chart" class="chart"></canvas>
	</div>
</template>

<script>

export default {
	name: 'Chart',
	props: {
		history: Array
	},
	data() {
		return {
			chart: null,
		}
	},
	mounted() {
		this.initChart()
	},
	methods: {
		initChart() {
			const config = {
				type: 'line',
				options: {
					scales: {
						y: {
							ticks: {
								callback: value => {
									return `${value} ${this.$t('mhs')}`
								}
							}
						}
					},
					elements: {
						line: {
							backgroundColor: '#26e4b1',
							borderColor: '#5A3DF5',
						},
						point: {
							backgroundColor: 'transparent',
							borderColor: 'transparent',
							radius: 5,
							hoverRadius: 5,
						}
					},
					plugins: {
						tooltip: {
							multiKeyBackground: '#5A3DF5',
							callbacks: {
								label: context => {
									let label = '';

									if (context.parsed.y !== null) {
										label += context.parsed.y.toLocaleString('fr', { minimumFractionDigits: 2 }).replace(/,/g, '.') + ' ' + this.$t('mhs')
									}

									return label;
								}
							}
						}
					}
				},
				data: {
					labels: this.history.map(history => {
						const date = new Date(history.timestamp)
						return `${this.paddingZero(date.getHours())}:${this.paddingZero(date.getMinutes())}:${this.paddingZero(date.getSeconds())}`
					}),
					datasets: [{
						label: this.$t('hash_rate_mhs'),
						pointHoverBackgroundColor: '#26e4b1',
						pointHoverBorderColor: '#5A3DF5',
						data: this.history.map(history => {
							return (Math.floor(history.rawHashCount / 10000) / 100).toFixed(2)
						}),
					}]
				},
			}

			this.chart = new Chart(this.$refs.chart, config)
		},
		paddingZero(value) {
			return value < 10 ? `0${value}` : value;
		}
	}
}
</script>

<style scoped>
canvas {
	border-radius: 5px;
}
</style>