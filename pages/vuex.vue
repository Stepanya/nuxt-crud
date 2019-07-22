<template>
  <div>
		<button @click="addOne">Click to add 1</button>
		<ul>
			<li v-for="(greeting, i) in greetings" :key="i">
				{{ greeting.sentence }} <b>{{ greeting.num }}</b>
			</li>
		</ul>
	</div>  
</template>

<script>
import { mapState } from 'vuex';

export default {
	data() {
		return {
			// output: greetings.state.greetings
			table: this.$store.state.table
		}
	},
	computed: mapState({
		greetings() {
			return this.table.greetings
		}
		// greetings() {
		// 	return this.table.greetings
		// }
		// addName() {
		// 	return this.$store.getters.addName
		// }
	}),
	methods: {
		addOne() {
			this.$store.commit('addOne')
		}
	},
	mounted() {
		console.log(this.table.greetings)
	}
}
</script>

<style>

</style>
