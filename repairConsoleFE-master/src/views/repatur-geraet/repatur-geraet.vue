<template>
  <v-card>
    <v-card-title>
      Reparaturanleitung
      <v-spacer />

      <anhaenge :repair-device="repairDevice" />
    </v-card-title>

    <v-card-text>
      <v-list>
        <v-container>
          <v-row>
            <v-list-item
              class="elevation-1"
              v-for="(prop, propName) in transformedRepairDevice"
              :key="propName"
            >
              <v-col cols="4">{{ propName }}</v-col>

              <v-col cols="8">
                <p v-if="propName == 'Durchschnittszeit' && prop == null && !editTime">
                  keine Angabe
                  <v-btn @click="editTime = true" text color="green white--text">
                    <v-icon>mdi-square-edit-outline</v-icon>
                  </v-btn>
                </p>

                <p v-if="propName == 'Durchschnittszeit' && prop != null">
                  {{ prop }}
                  <v-btn @click="editTime = true" text>
                    <v-icon>mdi-square-edit-outline</v-icon>
                  </v-btn>
                </p>

                <p v-if="editTime && propName == 'Durchschnittszeit'">
                  <v-container class="pb-0">
                    <v-row>
                      <v-col cols="4" class="pb-0">
                        <v-text-field v-model="timeInput" label="hh:mm:ss"></v-text-field>
                      </v-col>

                      <v-col cols="4" class="pb-0">
                        <v-select
                          :items="timeTypes"
                          label="Zeit Typ auswählen"
                          :menu-props="{ offsetY: true }"
                          v-model="selectedTimeType"
                        />
                      </v-col>

                      <v-col cols="1" class="pt-5">
                        <v-btn @click="sendTime" outlined color="green white--text">
                          <v-icon size="26">mdi-check</v-icon>
                        </v-btn>
                      </v-col>

                      <v-col cols="1" class="pt-5 ml-6">
                        <v-btn @click="editTime = false" outlined color="red darken-1">
                          <v-icon size="26">mdi-window-close</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="2"></v-col>
                    </v-row>
                  </v-container>
                </p>

                <anleitungen
                  :anleitungen="prop"
                  :name="propName"
                  v-else-if="propName == 'Dokumente' || propName == 'Linke'"
                />

                <p v-else-if="propName != 'Durchschnittszeit'">{{ prop }}</p>
              </v-col>
            </v-list-item>
          </v-row>
        </v-container>
      </v-list>

      <v-card-actions class="justify-end">
        <v-btn outlined color="red  lighten-1 " @click="close" class="text-capitalize">
          Abbrechen
        </v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
  import Anhaenge from "./anhaenge/anhaenge.vue";
  import Anleitungen from "./anleitungen/anleitungen.vue";

  export default {
    components: {
      anhaenge: Anhaenge,
      anleitungen: Anleitungen
    },

    props: {
      repairDevice: {
        type: Object,
        required: true
      }
    },

    mounted() {
      this.getAverageTime();
    },

    data() {
      return {
        timeInput: null,
        editTime: false,
        timeTypes: [
          {
            value: "ErrorDiagnosis",
            text: "Fehler Diagnose"
          },
          {
            value: "Repair",
            text: "Reparatur"
          },
          {
            value: "PartSearch",
            text: "Teilen Suche"
          }
        ],
        selectedTimeType: null,
        averageTime: null
      };
    },

    computed: {
      transformedRepairDevice() {
        return (
          {
            "Name des Geräts": this.repairDevice.name,
            Notizen: this.repairDevice.notes,
            Durchschnittszeit: this.averageTime,
            Dokumente: this.repairDevice.documents,
            Linke: this.repairDevice.links
          } || {}
        );
      }
    },

    methods: {
      close() {
        this.$emit("close");
      },

      sendTime() {
        console.log(this.timeInput, this.repairDevice, this.selectedTimeType);
        this.editTime = false;
        this.$axios
          .patch(
            this.$api +
              `/devices/${this.repairDevice.userDeviceId}/setTimeTaken?timeSpan=${this.timeInput}&type=${this.selectedTimeType}`
          )
          .then(resp => {
            console.trace(resp);
            if (resp.status == 200) {
              this.$store.dispatch("getUserDevices");
              this.getAverageTime();
            }
          });
      },

      getAverageTime() {
        this.$axios.get(this.$api + `/repairdevices/${this.repairDevice.id}`).then(resp => {
          this.averageTime = resp.data.averageTimeTaken;
        });
      }
    }
  };
</script>

<style lang="css">
  .v-card p {
    margin: unset;
  }
</style>
