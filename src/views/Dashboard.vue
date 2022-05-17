<template>
	<main>
		<div class="container">
			<h3 class="text-center">
				{{ $t('input_your_address') }}
			</h3>

			<Search />

			<template v-if="poolInfo.blocks.length">
				<h4>{{ $t('recently_mined_blocks') }}</h4>
				<div class="blocks">
					<div class="table-responsive h-100">
						<table class="table table-striped">
							<thead>
								<tr>
									<th>{{ $t('height') }}</th>
									<th>{{ $t('time') }}</th>
									<th>{{ $t('hash') }}</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="block in poolInfo.blocks"
									:key="block.id"
								>
									<td class="align-middle">
										{{ block.height }}
									</td>
									<td class="align-middle text-nowrap">
										{{ new Date(block.timestamp).toLocaleString($i18n.locale) }}
									</td>
									<td class="align-middle">
										<div class="w-100 text-truncate">
											{{ block.block }}
										</div>
									</td>
									<td class="align-middle text-end">
										<a
											:href="`https://explorer.ironfish.network/blocks/${block.block}`"
											target="_blank"
											class="btn btn-primary btn-sm"
										>
											{{ $t('view_on_explorer') }}
										</a>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</template>
		</div>
	</main>
</template>

<script>
import Search from '@/components/Search.vue'

export default {
	name: 'Dashboard',
	components: {
		Search
	},
	props: {
		poolInfo: Object
	},
}
</script>

<style scoped>
.blocks {
	position: relative;
	overflow-x: hidden;
	height: 500px;
}
.blocks table {
	height: 100%;
}
.blocks table th {
	position: sticky;
	top: 0;
	z-index: 1;
}
</style>
