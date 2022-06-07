<template>
	<main>
		<section id="home" ref="home" class="section-home">
			<div class="container">
				<div class="mb-5" v-html="$t('about_text')"></div>
				<h3 class="mb-3 text-uppercase text-center">
					{{ $t('pool_advantages') }}
				</h3>
				<div v-html="$t('pool_advantages_text')"></div>
			</div>
		</section>

		<section id="information" ref="information" class="section-information">
			<div class="container">
				<div class="row mb-5 pb-5">
					<div class="col-6 col-md-3 mb-5 text-center">
						<img src="@/assets/img/gross.png" class="info-icon" alt="">
						<div class="h3 mt-4 mb-0 text-primary">{{ poolInfo.counterHashRate }}</div>
						<div class="text-muted">
							{{ $t('total_hashrate') }}
						</div>
					</div>
					<div class="col-6 col-md-3 mb-5 text-center">
						<img src="@/assets/img/work-time.png" class="info-icon" alt="">
						<div class="h3 mt-4 mb-0 text-primary">{{ poolInfo.poolMiners }}</div>
						<div class="text-muted">
							{{ $t('active_workers') }}
						</div>
					</div>
					<div class="col-6 col-md-3 mb-5 text-center">
						<img src="@/assets/img/construction.png" class="info-icon" alt="">
						<div class="h3 mt-4 mb-0 text-primary">{{ poolInfo.blocks.length }} {{ $t('blocks') }}</div>
						<div class="text-muted">
							{{ $t('mined') }}
						</div>
					</div>
					<div class="col-6 col-md-3 mb-5 text-center">
						<img src="@/assets/img/pay-per-click.png" class="info-icon" alt="">
						<div class="h3 mt-4 mb-0 text-primary">{{ +poolInfo.amountOfUsersMoney.ironWithAComma.toFixed(2) }} IRON</div>
						<div class="text-muted">
							{{ $t('payed_out') }}
						</div>
					</div>
				</div>

				<div class="my-5 py-5">
					<div class="row">
						<div class="col-12 col-sm-6 col-md mb-4 text-center">
							<img src="@/assets/img/uptime.png" class="info-icon-small" alt="">
							<div class="h5 mt-3">
								{{ $t('uptime') }}
							</div>
						</div>
						<div class="col-12 col-sm-6 col-md mb-4 text-center">
							<img src="@/assets/img/calendar.png" class="info-icon-small" alt="">
							<div class="h5 mt-3">
								{{ $t('automatic_payouts') }}
							</div>
						</div>
						<div class="col-12 col-sm-6 col-md mb-4 text-center">
							<img src="@/assets/img/no-fee.png" class="info-icon-small" alt="">
							<div class="h5 mt-3">
								0% {{ $t('fee') }}
							</div>
						</div>
						<div class="col-12 col-sm-6 col-md mb-4 text-center">
							<img src="@/assets/img/stats.png" class="info-icon-small" alt="">
							<div class="h5 mt-3">
								{{ $t('detailed_statistics') }}
							</div>
						</div>
					</div>
				</div>

				<div class="pt-5 text-center">
					<div class="h3 mb-4">
						<span class="text-primary">{{ poolInfo.counterHashRate }}</span>
						{{ $t('of_mining_power') }}
					</div>
				</div>

				<Chart
					class="mt-5"
					:history="history"
					:key="chartKey"
					v-if="history"
				/>
			</div>
		</section>

		<section id="quickstart" ref="quickstart" class="section-quickstart">
			<div class="container">
				<div class="text-center">
					<div class="mb-4 h2">
						{{ $t('quickstart') }}
					</div>
				</div>
				<div class="text-break" v-html="$t('connect_instruction')"></div>
			</div>
		</section>

		<section class="section-dashboard">
			<div class="container">
				<div class="rounded bg-primary bg-gradient p-lg-5 p-4">
					<div class="row align-items-end">
						<div class="col-md-8 text-white">
							<div class="h3 mb-4">
								{{ $t('dashboard_text_1') }}
							</div>
							<div class="">
								{{ $t('dashboard_text_2') }}
							</div>
						</div>
						<div class="col-md-4 mt-4 mt-sm-0 text-md-end text-center">
							<router-link :to="{name: 'dashboard'}" class="btn btn-dark mt-4">
								{{ $t('go_to_dashboard') }}
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section id="faq" ref="faq" class="section-faq">
			<div class="container">
				<div class="text-center">
					<div class="mb-4 h2">
						{{ $t('faqs') }}
					</div>
					<div class="mb-5 text-muted">
						{{ $t('have_questions') }}
					</div>
				</div>
				<div class="accordion">
					<div class="accordion-item rounded">
						<div class="accordion-header">
							<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordion-1">
								{{ $t('question_1') }}
							</button>
						</div>
						<div id="accordion-1" class="accordion-collapse collapse show">
							<div class="accordion-body" v-html="$t('answer_1')"></div>
						</div>
					</div>
					<div class="accordion-item rounded">
						<div class="accordion-header">
							<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordion-2">
								{{ $t('question_2') }}
							</button>
						</div>
						<div id="accordion-2" class="accordion-collapse collapse">
							<div class="accordion-body" v-html="$t('answer_2')"></div>
						</div>
					</div>
					<div class="accordion-item rounded">
						<div class="accordion-header">
							<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordion-3">
								{{ $t('question_3') }}
							</button>
						</div>
						<div id="accordion-3" class="accordion-collapse collapse">
							<div class="accordion-body" v-html="$t('answer_3')"></div>
						</div>
					</div>
					<div class="accordion-item rounded">
						<div class="accordion-header">
							<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordion-4">
								{{ $t('question_4') }}
							</button>
						</div>
						<div id="accordion-4" class="accordion-collapse collapse">
							<div class="accordion-body">
								<template v-if="$i18n.locale === 'ru'">
									Выполнить установку по <a href="https://ironfish.network/docs/onboarding/installation-iron-fish" target="_blank" rel="nofollow">инструкции</a> разработчиков сети для систем на базе Linux или <a href="https://ironfish.network/docs/onboarding/installation-iron-fish" target="_blank" rel="nofollow">скачать</a> адаптированную под Windows версию ноды.
									После установки необходимо пройти регистрацию в программе мотивации тестирования на <a href="https://testnet.ironfish.network/about" target="_blank" rel="nofollow">сайте</a> разработчика если Вы хотите получить награду за участие в тестах. После выполнения этих шагов Вы можете присоединиться к нашему пулу выполнив следующие шаги:<br>
									Для пользователей Linux:<br>
									- узнать свой publickey командой ironfish accounts:publickey<br>
									- запустить майнер командой yarn start miners:start -a [Ваш publickey] -p iron-pool.com -t [кол-во ядер]<br>
									- <router-link :to="{name: 'dashboard'}" target="_blank">проконтролировать подключение</router-link> на пуле через 10-15 минут после начала работы майнера. Для этого необходимо указать Ваш publickey.<br>
									Для пользователей Windows:<br>
									- узнать свой publickey командой ironfish accounts:publickey<br>
									- запустить майнер командой ironfish miners:start -p iron-pool.com -a publickey<br>
									- <router-link :to="{name: 'dashboard'}" target="_blank">проконтролировать подключение</router-link> на пуле через 10-15 минут после начала работы майнера. Для этого необходимо указать Ваш publickey.
								</template>
								<template v-else>
									Install according to the <a href="https://ironfish.network/docs/onboarding/installation-iron-fish" target="_blank" rel="nofollow">instructions</a> of the network developers for Linux-based systems or <a href="https://ironfish.network/docs/onboarding/installation-iron-fish" target="_blank" rel="nofollow">download</a> the version of the node adapted for Windows.
									After installation, you need to register in the testing motivation program on the developer's <a href="https://testnet.ironfish.network/about" target="_blank" rel="nofollow">website</a> if you want to receive a reward for participating in tests. After completing these steps, you can join our pool by following these steps:<br>
									For Linux users:<br>
									- find out your publickey with the command ironfish accounts:publickey<br>
									- start the miner with the command yarn start miners:start -a [ironfish-public-address] -p iron-pool.com -t [number-of-threads]<br>
									- <router-link :to="{name: 'dashboard'}" target="_blank">check the connection</router-link> on the pool 10-15 minutes after the start of the miner. To do this, you must specify your publickey.<br>
									For Windows users:<br>
									- find out your publickey with the command ironfish accounts:publickey<br>
									- start the miner with the command ironfish miners:start -p iron-pool.com -a publickey<br>
									- <router-link :to="{name: 'dashboard'}" target="_blank">check the connection</router-link> on the pool 10-15 minutes after the start of the miner. To do this, you must specify your publickey.
								</template>
							</div>
						</div>
					</div>
					<div class="accordion-item rounded">
						<div class="accordion-header">
							<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordion-5">
								{{ $t('question_5') }}
							</button>
						</div>
						<div id="accordion-5" class="accordion-collapse collapse">
							<div class="accordion-body" v-html="$t('answer_5')"></div>
						</div>
					</div>
					<div class="accordion-item rounded">
						<div class="accordion-header">
							<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordion-6">
								{{ $t('question_6') }}
							</button>
						</div>
						<div id="accordion-6" class="accordion-collapse collapse">
							<div class="accordion-body" v-html="$t('answer_6')"></div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>

<script>
import Chart from '@/components/Chart.vue'

export default {
	name: 'Home',
	components: {
		Chart
	},
	props: {
		poolInfo: Object
	},
	data() {
		return {
			history: null,
			interval: null,
			chartKey: 0,
		}
	},
	async mounted() {
		await this.fetchHistory()
		this.interval = setInterval(async () => {
			await this.fetchHistory()
		}, 120000)
	},
	unmounted() {
		if (this.interval) {
			clearInterval(this.interval)
		}
	},
	methods: {
		async fetchHistory() {
			try {
				const history = (await this.$api.get('/statePool')).data.hashRate[0]

				if (this.history && JSON.stringify(this.history) !== JSON.stringify(history)) {
					this.history = history
					this.chartKey ++
				} else {
					this.history = history
				}
			} catch (e) {
				console.log(e)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
main {
	padding: 0;
}
.section-home {
	position: relative;
	padding: 50px 0 0 0;
}
.section-information {
	padding: 150px 0 0 0;
	.info-icon {
		width: 64px;
		height: 64px;
	}
	.info-icon-small {
		width: 48px;
		height: 48px;
	}
}
.section-quickstart {
	padding: 150px 0 100px 0;
}
.section-faq {
	padding: 100px 0;
}
</style>