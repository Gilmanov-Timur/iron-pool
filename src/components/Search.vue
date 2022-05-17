<template>
	<form @submit.prevent="onSubmit" class="mb-5">
		<div class="input-group mb-3">
			<input
				type="text"
				name="address"
				v-model.trim="address"
				class="form-control"
				:placeholder="$t('input_address')"
			>
			<button
				class="position-relative btn btn-primary"
				type="submit"
				:disabled="address.length === 0"
			>
				{{ $t('enter') }}
			</button>
		</div>
	</form>
</template>

<script>
export default {
	name: 'Search',
	data() {
		return {
			address: '',
		}
	},
	methods: {
		async onSubmit() {
			if (this.address === this.$route.params.address) {
				this.$emit('reload')
			} else {
				await this.$router.push({name: 'user', params: {address: this.address}})
			}
		}
	},
}
</script>
