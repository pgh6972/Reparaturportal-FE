<template>
  <v-container id="auftrag-tabelle">
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="tableHeaders"
          v-bind:items="myUserDevices"
          class="elevation-1"
          :items-per-page="15"
          width
          :footer-props="{
            showFirstLastPage: true,
            'items-per-page-text': 'Aufträge Pro Seite'
          }"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr
                class="row-pointer"
                v-for="auftrag in items"
                :key="auftrag.id"
                @click="openModal(auftrag)"
              >
                <td>{{ auftrag.id }}</td>

                <td>{{ auftrag.manufacturer }} {{ auftrag.model }}</td>

                <td>{{ auftrag.model }}</td>

                <td>{{ auftrag.date }}</td>

                <td>{{ auftrag.anleitung.substring(1) }}</td>

                <v-dialog
                  v-model="auftrag.showModal"
                  transition="dialog-bottom-transition"
                  persistent
                  fullscreen
                >
                  <auftrag @close="closeModal(auftrag)" :auftrag="auftrag" />
                </v-dialog>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import AuftragModal from "./auftrag/auftrag";
  import { mapGetters, mapMutations } from "vuex";

  export default {
    components: {
      auftrag: AuftragModal
    },

    data() {
      return {
        headers: [
          {
            text: "ID",
            value: "id"
          },
          {
            text: "Hersteller",
            value: "manufacturer"
          },
          {
            text: "Modell",
            value: "model"
          },
          {
            text: "Lieferdatum",
            value: "date"
          },
          {
            text: "Anleitung",
            value: "anleitung"
          }
        ],
        openModalId: null
      };
    },

    mounted() {
      this.changeCurrentDevice("");
    },

    computed: {
      ...mapGetters(["filteredByManufacturer"]),

      myUserDevices() {
        return this.filteredByManufacturer.map(device => ({
          ...device,

          date: new Date(device.deliveryDay).toLocaleDateString("en-US"),

          anleitung: device.repairDevice == null ? "2Nicht Vorhanden" : "1Vorhanden", //!!TODO: take it out when back end has one available

          //FIXME: take care of this hack in a better way
          showModal: this.openModalId == device.id ? true : false
        }));
      },

      tableHeaders() {
        return this.headers.map(it => ({ ...it, width: 20 }));
      }
    },

    methods: {
      ...mapMutations(["changeCurrentDevice"]),

      openModal(auftrag) {
        auftrag.showModal = true;
        this.openModalId = auftrag.id;
      },

      closeModal(auftrag) {
        auftrag.showModal = false;
        this.openModalId = null;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .row-pointer:hover {
    cursor: pointer;
  }
</style>
