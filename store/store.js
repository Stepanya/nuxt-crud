import Vue from 'vue'
import Vuex from 'vuex'
import table from './modules/table.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  modules: {
    table,
  }
})