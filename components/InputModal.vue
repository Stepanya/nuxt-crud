<template>
    <div>
			<b-modal id="input-modal" title="Add Country" hide-footer>
				<b-form @submit.prevent="addCountry(name)">
					<b-form-group id="input-group-1" label="Country:" label-for="country-name">
						<b-form-input
							id="country-name"
							required
							placeholder="Enter name"
							v-model="name"
						></b-form-input>
					</b-form-group>

					<b-button type="submit" variant="primary">Submit</b-button>
					<b-button type="reset" variant="danger">Reset</b-button>
				</b-form>
			</b-modal>
    </div>
</template>

<script>
import axios from 'axios'

export default {
	name: "InputModal",
	data() {
		return {
			name: "",
		}
	},
	computed: {
		// ...mapGetters([state])
	},
	methods: {
		addCountry(name) {	
			this.$store.dispatch("addCountry", this.name).then((response) => {
				this.showAlert("Country has been added.")
				this.$store.dispatch("loadCountries")
			}).catch((error) => {
				this.$store.commit('TOGGLE_BUSY')
				this.showAlert(error)
			})
			
		},
		showAlert(message) {
      this.$bvModal.msgBoxOk(message, {
        title: 'Alert',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'success',
        headerClass: 'p-2 border-bottom-0',
        footerClass: 'p-2 border-top-0',
        centered: true
      })
    }	
	}
}
</script>

<style>

</style>
