import Vue from 'vue'
import Vuex from 'vuex'
import { reqUserInfo, reqCityLocation } from 'network/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    selectCity: '定位中...'
  },
  mutations: {
    changeUserInfo(state, newInfo) {
      state.userInfo = newInfo;
    },
    changeAddresList(state, newAddressInfo) {
      if(newAddressInfo.type == 'add') {
        state.userInfo.addressList.push(newAddressInfo.data);
      }else if(newAddressInfo.type == 'del') {
        state.userInfo.addressList = state.userInfo.addressList.filter(item => item.id != newAddressInfo.data);
      }else {
        let index = state.userInfo.addressList.findIndex(item => item.id == newAddressInfo.data.id);
        state.userInfo.addressList.splice(index, 1, newAddressInfo.data);
      }
    },
    changeUserBasicInfo(state, newInfo) {
      state.userInfo[newInfo.name] = newInfo.value;
    },
    changeSelectCity(state, newCity) {
      state.selectCity = newCity;
    },
  },
  actions: {
    getUserInfo(content) {
      if(sessionStorage.getItem('token')) {
        reqUserInfo().then(res => {
          content.commit('changeUserInfo', res.data);
        });
      }
    },
    getCityLocation() {
      window.navigator.geolocation.getCurrentPosition(async position => {
        const { latitude, longitude } = position.coords;
        console.log(position.coords);
        const res = await reqCityLocation(latitude, longitude)
        console.log(res);
      })
    }
  },
  modules: {
  }
})
