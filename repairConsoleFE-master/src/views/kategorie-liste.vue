<template>
  <div class="categories">
    <v-card
      @click="handleCategorySelection(category)"
      v-for="category in categories"
      :key="category.key"
      min-width="300px"
      class="card"
    >
      <v-img :src="require(`../assets/categories/${category.label}.png`)" height="200px" contain />
      <v-card-title class="justify-center">{{ category.label }}</v-card-title>
    </v-card>
  </div>
</template>

<script>
  import { mapMutations } from "vuex";

  export default {
    data() {
      return {
        categories: [
          { key: "Fernseher", label: "Fernseher" },
          { key: "Hifi", label: "HIFI" },
          { key: "Lautsprecher/Box", label: "Lautsprecher" },
          { key: "Spielekonsole", label: "Spielkonsole" },
          { key: "Elektrisches Spielzeug", label: "E-Spielzeug" },
          { key: "Elektrisches Musikinstrument", label: "E-Instrumente" },
          { key: "Sonstiges", label: "Sonstiges" }
        ]
      };
    },

    methods: {
      ...mapMutations(["selectRepairDevices"]),

      handleCategorySelection(category) {
        this.selectRepairDevices(category.key);
        this.$router.push("/reparatur-geraet-liste");
      }
    }
  };
</script>

<style>
  .categories {
    padding: 4em 0em 0em 0em;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }

  .card:hover {
    cursor: pointer;
    background-color: rgb(185, 187, 185);
  }
</style>
