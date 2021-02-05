<template>
  <div>
    <h1 v-if="filterTerm != ''" class="pt-5 pl-5">
      {{ filterTerm.charAt(0).toUpperCase() + filterTerm.slice(1) }}
      <v-btn text @click="clearFilter" title="Filter beheben">
        <v-icon>mdi-window-close</v-icon>
      </v-btn>
    </h1>

    <div class="manuals">
      <div v-for="reparaturGeraet in selectedRepairDevices" :key="reparaturGeraet.id">
        <list-geraet :geraet="reparaturGeraet" @changeFilterTerm="filterManufacturers" />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from "vuex";
  import listGerät from "./list-graet.vue";

  export default {
    components: {
      "list-geraet": listGerät
    },

    mounted() {
      this.changeCurrentDevice("");
    },

    data() {
      return {
        filterTerm: ""
      };
    },

    computed: {
      ...mapGetters(["selectedRepairDevices"])
    },

    methods: {
      ...mapMutations(["changeCurrentDevice"]),

      filterManufacturers(manufacturer) {
        this.filterTerm = manufacturer;
        this.changeCurrentDevice(this.filterTerm);
      },

      clearFilter() {
        this.filterTerm = "";
        this.changeCurrentDevice("");
      }
    }
  };
</script>

<style lang="scss" scoped>
  .manuals {
    padding: 2em 0em 0em 0em;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
  }

  .card:hover {
    cursor: pointer;
    background-color: rgb(185, 187, 185);
  }

  .row-pointer:hover {
    cursor: pointer;
  }
</style>
