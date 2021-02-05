import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import https from "https";

import { filterManufacturer } from "./filters";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { userDevices: [], currManufacturer: "", selectedRepairDevices: [] },

  getters: {
    allUserDevices: state => state.userDevices,

    filteredByManufacturer: state => filterManufacturer(state.userDevices, state.currManufacturer),

    selectedRepairDevices: state =>
      filterManufacturer(state.selectedRepairDevices, state.currManufacturer)
  },

  mutations: {
    setUserDevices(state, devices) {
      state.userDevices = devices;
    },

    changeCurrentDevice(state, device) {
      state.currManufacturer = device;
    },

    selectRepairDevices(state, category) {
      state.selectedRepairDevices = [...state.userDevices]
        .filter(device => device.category == category && device.repairDevice)
        .map(device => {
          return (
            {
              ...device.repairDevice,
              timeTaken: device.timeTaken,
              userDeviceId: device.id,
              manufacturer: device.manufacturer
            } || {}
          );
        });
    }
  },

  actions: {
    getUserDevices({ commit }) {
      axios
        .get(Vue.prototype.$api + "/devices", {
          httpAgent: new https.Agent({
            rejectUnauthorized: false
          })
        })
        .then(devices => {
          console.log(devices);
          commit("setUserDevices", devices.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
