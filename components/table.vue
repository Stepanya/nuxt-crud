<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
			
       <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Sort" class="mb-0">
          <b-input-group>
            <b-form-select v-model="sortBy" :options="state.sortOptions">
              <option slot="first" :value="null">-- none --</option>
            </b-form-select>
            <b-form-select v-model="sortDesc" :disabled="!sortBy" slot="append">
              <option :value="false">Asc</option> <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
			
      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Per page" class="mb-0">
          <b-form-select v-model="perPage" :options="state.pageOptions"></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
			:items="state.items"
      :fields="state.fields"
			dark
			bordered
			striped
			hover 
      show-empty
      stacked="md"
			:filter="filter"
			:sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="state.sortDirection"
			:current-page="currentPage"
      :per-page="perPage"
      :busy="state.isBusy"
			 @filtered="onFiltered"
    >	
      <template slot="actions" slot-scope="row">
        <b-button variant="warning" size="sm" @click="info(row.item, row.index, $event.target, row)" class="mr-1">
          Update
        </b-button>
        <b-button variant="danger" size="sm" @click="showConfirm(row.item.name, 'delete', row.item.id)">Delete</b-button>
      </template>

      <div slot="table-busy" class="text-center text-primary my-5">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading Countries....</strong>
      </div>
    </b-table>

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="state.totalRows"
          :per-page="state.perPage"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>  

		<!-- Update modal -->
    <b-modal id="updateModal" :title="title" ok-only @hide="resetUpdateModal" hide-footer>
      <b-form @submit.prevent="showConfirm(title, 'update', 0)" id="update-form">
				<b-form-group 
          id="input-group-1"
          label="Country:"
          label-for="country-name"
          invalid-feedback="Country name is required">
					<b-form-input
						name="country-name"
						required
						placeholder="Enter name"
						v-model="name"
					></b-form-input>
				</b-form-group>

				<b-button type="submit" variant="primary">Submit</b-button>
				<b-button type="reset" variant="danger">Reset</b-button>
			</b-form>
    </b-modal>
  </b-container>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { mapGetters } from 'vuex';
// const table = this.$store

export default {
  data() {
    return {
      sortBy: null,
      sortDesc: false,
      currentPage: 1,
      perPage: 10,
      filter: null,
      itemId: '',
      title: '',
      name: ''
    }
  },

  computed: {
    ...mapGetters(['state']),
  },
  mounted() {
    this.loadCountries()
  },
  methods: {
    info(item, index, button, row) {
      this.title = `Update ${item.name}`
      this.name = item.name
      this.itemId = item.id
      this.$bvModal.show("updateModal")
    },
    
    resetUpdateModal() {
      this.name = ''
      this.title = '' 
    },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.$store.dispatch('filter', filteredItems.length, 1)
    },

    loadCountries() {
      this.$store.dispatch("loadCountries").catch((error) => {
        this.$store.commit('TOGGLE_BUSY')
        this.showAlert(error.response.data.name)
      });
      this.$store.dispatch('setTotalRows', this.state.items.length)
    },

    updateCountry() {
      const payload = {
        id: this.itemId,
        name: this.name
      }
      this.$store.dispatch('updateCountry', payload).then((response) => {
        this.$bvModal.hide("updateModal")
        this.loadCountries()
        this.showAlert('Country has been updated.')
      }).catch((error) => {
        this.$store.commit('TOGGLE_BUSY')
        this.showAlert(error.response.data.name)
      });
    },

    deleteCountry(id) {
      this.$store.dispatch('deleteCountry', id).then((response) => {
        this.loadCountries()
        this.showAlert("Country has been deleted.")
      }).catch((error) => {
        this.$store.commit('TOGGLE_BUSY')
        this.showAlert(error.response.data.name)
      });
    },

    showConfirm(country, action, id) {
			this.$bvModal.msgBoxConfirm('Are you sure you want to '+ action +' '+country+'?', {
				title: 'Please Confirm',
				size: 'sm',
				buttonSize: 'sm',
				okVariant: 'danger',
				okTitle: 'YES',
				cancelTitle: 'NO',
				footerClass: 'p-2',
				hideHeaderClose: false,
				centered: true
			}).then(value => {
					if(value) {
            if (action == 'update') {
              this.updateCountry()
            } else {
              this.deleteCountry(id)
            }
          }
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