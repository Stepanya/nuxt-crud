import axios from 'axios'
import moment from 'moment'

export default {
	state() {
		return {
			items: [],
      fields: [
				{ key: 'id', label: 'Country ID', sortable: true },
				{ key: 'name', label: 'Country Name', sortable: true},
        { key: 'created_at', label: 'Country Added Date', sortable: true },
        { key: 'updated_at', label: 'Updated Date', sortable: true },
        { key: 'actions', label: 'Actions' }
			],
			totalRows: 1,
      pageOptions: [5, 10, 15, 20, 50, 100],
			sortDirection: 'asc',
			sortOptions: [
				{ text: "Country ID", value: "id"},
				{ text: "Country Name", value: "name"},
				{ text: "Created Date", value: "created_at"},
				{ text: "Updated Date", value: "updated_at"}
			],
      isBusy: true,
		}
	},

	getters: {
		state: state => state,
	},

	actions: {

		async loadCountries({store, commit}) {
			await axios({
        method: 'get',
        url: 'https://barangay-api.trifectacore.tech/sample/'
      }).then((response) => {
				commit('SET_TABLE_DATA', response.data)
				commit('FORMAT_DATE')
				commit('SET_NULL_VALUES')
				commit('TOGGLE_BUSY')
      })
		},

		async addCountry({commit}, name) {
			commit('TOGGLE_BUSY')
      return await axios({
        method: 'post',
        url: 'https://barangay-api.trifectacore.tech/sample/',
				data: { name: name }
			})
		},

		async updateCountry({commit}, payload) {
      commit('TOGGLE_BUSY')
      axios({
        method: 'patch',
        url: 'https://barangay-api.trifectacore.tech/sample/'+ payload.id +'/',
        data: { 
          name: payload.name,
          updated_at: moment(Date.now()).format('Y-MM-DD HH:mm')
        }
			})
		},

		async deleteCountry({commit}, id) {
			commit('TOGGLE_BUSY')
      axios({
        method: 'delete',
        url: 'https://barangay-api.trifectacore.tech/sample/'+id+'/',
      })
		},

		setTotalRows({commit}, totalRows) {
			commit('SET_TOTAL_ROWS', totalRows)
		},

		filter({commit}, filteredItems, curPage) {
			commit('filter', filteredItems, curPage)
		}
	},

	mutations: {

		FILTER(state, filteredItems, curPage) {
			state.totalRows = filteredItems
			state.currentPage = curPage
		},

		SORT_BY (state, sortBy) {
			state.sortBy = sortBy
		},

		SET_TOTAL_ROWS (state, totalRows) {
			state.totalRows = totalRows
		},
		
		SET_TABLE_DATA(state, data) {
			state.items = data.results
		},

		FORMAT_DATE(state) {
      for (var i in state.items) {
        const dateCreated = state.items[i].created_at;
        const dateUpdated = state.items[i].updated_at;
        state.items[i].created_at = moment(dateCreated).format('MMM D, Y h:mm A')
        state.items[i].updated_at = (dateUpdated == null ? null : moment(dateUpdated).format('MMM D, Y h:mm A') )
      }
		},

		SET_NULL_VALUES(state) {
      for (var i in state.items) {
        const item = state.items[i].updated_at
        if (item == null) { 
          state.items[i].updated_at = "Not Available" 
        }
      }
		},

		TOGGLE_BUSY(state) { 
			state.isBusy = !state.isBusy
		},
	}
}