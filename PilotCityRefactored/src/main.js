import Vue from 'vue'
import App from './App.vue'
import router from './router'
import swal from 'sweetalert'
import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(BootstrapVue)
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
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
