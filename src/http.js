import Vue from 'vue';
import VueResource from 'vue-resource';
import {
  SUCCESS_CODE,
  INVALID_CODE,
  BASE_URL
} from '@/constsAlias';
import store from './store';

Vue.use(VueResource);

Vue.http.options.credentials = true;
if (process.env.NODE_ENV === 'development') {
  Vue.config.devtools = true;
}

Vue.http.options.root = `${BASE_URL}admin/v0/`;
Vue.http.options.timeout = 5000;

Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', 'Bearer ' + store.state.token);
  next((response) => {
    if (response.body.code !== SUCCESS_CODE) {
      if (response.body.code === INVALID_CODE) {
        Vue.prototype.$message({
          type: 'error',
          message: '登陆超时请重新登陆',
          onClose () {
            store.commit('setTokenAndUsername', {
              tokenAndUsername: {
                username: '',
                token: ''
              }
            });
            Vue.prototype.$router.push('/login')
          }
        });
      } else {
        Vue.prototype.$message.error(response.body.msg || '系统异常请稍后再试');
        return false;
      }
    }
    return response;
  });
});
