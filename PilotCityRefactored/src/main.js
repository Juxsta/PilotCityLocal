import Vue from 'vue'
import App from './App.vue'
import router from './router'
import swal from 'sweetalert'
import BootstrapVue from "bootstrap-vue"
import * as VueGoogleMaps from 'vue2-google-maps'
 
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(BootstrapVue)
Vue.config.productionTip = false

export const GEOCODEKEY = {key: "AIzaSyDfuNr3RaCZkituTfoB7b7pR2u2rWuraWE"}; 
export const bus = new Vue();
Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyDfuNr3RaCZkituTfoB7b7pR2u2rWuraWE',
      libraries: 'places', 
    },
   
  })
  
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
