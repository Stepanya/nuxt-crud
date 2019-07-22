<template>
	<header>
		<b-navbar toggleable="lg" type="dark" variant="dark">
			<b-navbar-brand href="#"><b>Countries</b></b-navbar-brand>

			 <b-navbar-nav class="ml-auto">
				 <b-button variant="light" v-b-modal.input-modal>Add Country</b-button>
			 </b-navbar-nav>
		</b-navbar>
	</header>
</template>

<script>
export default {
	name: 'AppHeader'
}
</script>

<style>

</style>
