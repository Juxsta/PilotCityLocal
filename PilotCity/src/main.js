// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import swal from 'sweetalert'
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
    load: {
      key: "AIzaSyCKAqodQ85PnaiSX_oJfxveubj-qil0W7k",
      libraries: "places" // necessary for places input
    }
  });

Vue.config.productionTip = false

export const bus = new Vue();

export const Prompter = () => {
  return ({
      failed : (msg, title) => {
          swal({
              title: title || "Failed!",
              text: msg,
              icon: "error",
              button: "Okay",
          });
      },
      success : (msg, title, callback) => {
          swal({
              title: title || "Successed!",
              text: msg,
              icon: "success",
              button: "Okay",
          }).then(callback);
      },
      info : (msg, title, callback) => {
        swal({
            title: title || "Successed!",
            text: msg,
            icon: "info",
            button: "Okay",
        }).then(callback);
    }
  });
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
