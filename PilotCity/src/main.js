// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import swal from 'sweetalert';

Vue.config.productionTip = false

export const bus = new Vue();

export const Prompter = () => {
  return ({
      failed : (msg, title) => {
          swal({
              title: title || "Failed!",
              text: msg,
              icon: "error",
              button: "ok",
          });
      },
      success : (msg, title, callback) => {
          swal({
              title: title || "Successed!",
              text: msg,
              icon: "success",
              button: "ok",
          }).then(callback);
      },
  });
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
