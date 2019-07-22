<template>
  <div>
    <CountriesTable />
    <InputModal />
  </div>
</template>

<script>
import InputModal from "../components/InputModal";
import CountriesTable from "../components/table.vue";

export default {
  head() {
    return {
      title: "CRUD",
      meta: [
        {
          hid: "Description",
          name: "Description",
          content: "A simple CRUD app made with Nuxt.js"
        }
      ]
    }
  },
  components: {
    InputModal,
    CountriesTable
  }
}
</script>

<style>

</style>
