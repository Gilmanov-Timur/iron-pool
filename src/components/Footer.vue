<template>
	<footer id="footer" class="bg-light">
		<div class="container">
			<div class="row">
				<div class="col-lg-4 col-12 mb-0 mb-md-4 pb-0 pb-md-2">
					<div class="logo">
						<a href="#home">
							<img src="@/assets/img/logo.png" alt="">
							IronPool
						</a>
					</div>
					<p class="mt-4 text-muted">
						{{ $t('footer_text') }}
					</p>
				</div>
				<div class="col-lg-2 col-md-4 col-12 mt-4 mt-sm-0 pt-lg-1 pb-4">
					<div class="h4 mb-4">
						{{ $t('pool') }}
					</div>
					<ul class="links">
						<li>
							<router-link :to="{name: 'home'}">
								<i class="mdi mdi-chevron-right"></i>
								{{ $t('home') }}
							</router-link>
						</li>
						<li>
							<router-link :to="{name: 'dashboard'}">
								<i class="mdi mdi-chevron-right"></i>
								{{ $t('dashboard') }}
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="border-top position-relative bg-light" style="z-index:10">
			<div class="container py-4 text-muted">
				<div class="row align-items-center justify-content-between">
					<div class="col-auto">
						© {{ new Date().getFullYear() }} IronPool
					</div>
					<div class="col-auto">
						<ul class="social-media">
							<li><a href="https://t.me/ironpool" target="_blank"><img src="@/assets/img/telegram.png" alt="telegram"></a></li>
							<li><a href="https://discord.gg/zC99cucb" target="_blank"><img src="@/assets/img/discord.png" alt="discord"></a></li>
							<li><a href="https://github.com/iron-fish/ironfish" target="_blank"><img src="@/assets/img/github.png" alt="github"></a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
export default {
	name: 'Footer'
}
</script>

<style scoped>
#footer {
	padding: 60px 0 0 0;
	background: #fff;
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
.links {
	margin: 0;
	padding: 0;
	list-style: none;
}
.links li {
	margin-bottom: 0.25rem;
}
</style>