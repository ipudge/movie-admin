/**
 * Created by 35781 on 2017/3/8.
 */
import {setLocalJson, getLocalJson} from '../utils.js';

export default {
  setTokenAndUsername (state, { tokenAndUsername }) {
    setLocalJson('tokenAndUsername', tokenAndUsername);
    state.username = tokenAndUsername.username;
    state.token = tokenAndUsername.token;
  },
  getTokenAndUsername (state) {
    let tokenAndUsername = getLocalJson('tokenAndUsername');
    if (tokenAndUsername) {
      state.username = tokenAndUsername.username;
      state.token = tokenAndUsername.token;
    }
  },
  toggleSideBar (state) {
    state.opened = !state.opened
  }
};
