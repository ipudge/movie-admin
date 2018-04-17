/**
 * Created by 35781 on 2017/3/8.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  token: '',
  username: '',
  opened: false
};

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters
});

export default store;
