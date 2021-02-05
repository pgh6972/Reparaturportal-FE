<template>
  <div>
    <v-card>
      <v-card-title>
        <v-btn @click="openModal(geraet)" text class="text-capitalize" title="Anleitung Öffnen">
          Anleitung Nr. {{ geraet.id }}
        </v-btn>
      </v-card-title>

      <v-card-text>
        <p>
          <b>Name:</b>
          {{ geraet.name }}
        </p>

        <p>
          <b>Durchschnittszeit:</b>
          {{ time == null ? "Keine Daten" : time }}
        </p>

        <p>
          <b>Hersteller:</b>
          <v-btn
            text
            class="text-capitalize"
            :title="
              `Nur ${geraet.manufacturer.charAt(0).toUpperCase() +
                geraet.manufacturer.slice(1)} Anleitungen anzeigen`
            "
            @click="changeFilterTerm(geraet.manufacturer)"
          >
            {{ geraet.manufacturer }}
          </v-btn>
        </p>

        <p>
          <b>Notizen:</b>
          {{ geraet.notes }}
        </p>
      </v-card-text>
    </v-card>
    <v-dialog v-model="modalBool" persistent>
      <reparaturGeraet :repair-device="data" @close="closeModal()" />
    </v-dialog>
  </div>
</template>

<script>
  import reparaturGerät from "../repatur-geraet/repatur-geraet.vue";

  export default {
    components: {
      reparaturGeraet: reparaturGerät
    },

    props: {
      geraet: {
        type: Object,
        required: true
      }
    },

    mounted() {
      this.getAverageTimeTaken();
    },

    data() {
      return {
        time: null,
        data: null,
        modalBool: false
      };
    },

    methods: {
      getAverageTimeTaken() {
        this.$axios.get(this.$api + `/repairdevices/${this.geraet.id}`).then(resp => {
          console.log(resp);
          this.time = resp.data.averageTimeTaken;
        });
      },

      openModal() {
        this.data = this.geraet;
        this.modalBool = true;
      },

      closeModal() {
        this.modalBool = false;
        this.getAverageTimeTaken();
      },

      changeFilterTerm(filterTerm) {
        this.$emit("changeFilterTerm", filterTerm);
      }
    }
  };
</script>

<style lang="css" scoped>
  .card:hover {
    cursor: pointer;
    background-color: rgb(185, 187, 185);
  }

  .row-pointer:hover {
    cursor: pointer;
  }

  .v-card p {
    background-color: #a9b8bb;
    margin: 2px;
    padding: 4px;
    border-radius: 0.3em;
  }
</style>
