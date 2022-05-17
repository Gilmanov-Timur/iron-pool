<template>
	<header
		id="header"
		class="py-3"
		:class="{
			'inner-page': $route.name !== 'home'
		}"
	>
		<div class="container">
			<div class="row align-items-center justify-content-between">
				<div class="col-auto">
					<div class="logo">
						<router-link :to="{name: 'home'}">
							<img src="@/assets/img/logo.png" class="d-none d-sm-inline" alt="IronPool">
							IronPool
						</router-link>
					</div>
				</div>
				<div
					class="col flex-grow-1 d-lg-block navigation"
					:class="menuShow ? 'd-block' : 'd-none'"
				>
					<div class="row d-inline-flex align-items-center">
						<div
							class="col-auto menu"
							:class="{invisible: $route.name !== 'home'}"
						>
							<ul class="text-uppercase">
								<li><a href="#home">{{ $t('home') }}</a></li>
								<li><a href="#information">{{ $t('information') }}</a></li>
								<li><a href="#quickstart">{{ $t('quickstart') }}</a></li>
								<li><a href="#faq">{{ $t('faq') }}</a></li>
							</ul>
						</div>
						<div class="col-auto pe-0 language">
							<img
								src="@/assets/img/en.svg"
								:class="{active: $i18n.locale === 'en'}"
								alt="EN"
								@click="changeLanguage('en')"
							>
							<img
								src="@/assets/img/ru.svg"
								:class="{active: $i18n.locale === 'ru'}"
								alt="RU"
								@click="changeLanguage('ru')"
							>
						</div>
					</div>
				</div>
				<div class="col-auto">
					<div class="row align-items-center">
						<div class="col-auto">
							<router-link :to="{name: 'dashboard'}" class="btn btn-primary px-2 px-sm-3">
								{{ $t('dashboard') }}
							</router-link>
						</div>
						<div
							class="col-auto d-lg-none pt-1 ps-0 text-primary"
							v-if="$route.name === 'home'"
						>
							<i
								v-if="!menuShow"
								class="mdi mdi-menu fs-2 lh-1 cursor-pointer"
								@click="menuShow = !menuShow"
							/>
							<i
								v-if="menuShow"
								class="mdi mdi-close fs-2 lh-1 cursor-pointer"
								@click="menuShow = !menuShow"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
	<button
		class="btn btn-primary back-button"
		@click="scrollTop"
		v-if="backButtonShow"
	>
		<i class="mdi mdi-arrow-up"></i>
	</button>
</template>

<script>
export default {
	name: 'Header',
	data() {
		return {
			menuShow: false,
			backButtonShow: false,
		}
	},
	mounted() {
		window.addEventListener('scroll', this.onScroll)
	},
	unmounted() {
		window.removeEventListener('scroll', this.onScroll)
	},
	methods: {
		onScroll() {
			this.backButtonShow = window.scrollY > 500
		},
		scrollTop() {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		},
		changeLanguage(locale) {
			localStorage.setItem('locale', locale)
			window.location.reload()
		}
	}
}
</script>

<style scoped>
#header {
	position: fixed;
	right: 0;
	left: 0;
	top: 0;
	z-index: 999;
	background: #fff;
	border: 0;
	border-bottom: 2px solid #dee5ed;
}
.logo {
	font-weight: bold;
	font-size: 1.5rem;
}
.logo img {
	position: relative;
	top: -3px;
	width: 15vw;
	max-width: 98px;
}
.navigation {
	background: transparent;
	transition: all .5s ease;
	text-align: center;
}
.navigation ul {
	display: flex;
	margin: 0;
	padding: 0;
	list-style: none;
}
.navigation li {
	padding: 0 10px;
}
.navigation a {
	display: inline-block;
	padding: 0 15px;
	font-weight: 700;
	font-size: 13px;
	letter-spacing: 1px;
	line-height: 24px;
	text-transform: uppercase;
}
.navigation a:hover {
	color: #2f55d4;
}
.back-button {
	z-index: 9;
	position: fixed;
	right: 1.5rem;
	bottom: 1.5rem;
	padding: 5px 10px;
}
.language img {
	display: inline-block;
	vertical-align: top;
	margin: 0 0.25rem;
	width: auto;
	height: 1.5rem;
	cursor: pointer;
}
.language .active {
	opacity: 0.5;
	cursor: default;
}
.inner-page .navigation {
	display: block !important;
	position: relative !important;
}
@media (max-width: 991px) {
	.navigation {
		position: absolute;
		left: 0;
		top: 100%;
		width: 100%;
		background: #fff;
		border-bottom: 1px solid #dee5ed;
		text-align: left;
	}
	.inner-page .navigation {
		text-align: right;
		border-bottom: 0;
	}
	.navigation ul {
		display: block;
	}
	.navigation li {
		padding: 0;
	}
	.navigation a {
		padding: 10px;
	}
	.language {
		position: absolute;
		right: 10px;
		top: 10px;
	}
	.inner-page .menu {
		display: none;
	}
	.inner-page .language {
		position: relative !important;
		right: auto !important;
		top: auto !important;
	}
}
@media (max-width: 575px) {
	.logo {
		font-size: 1.25rem;
	}
}
</style>