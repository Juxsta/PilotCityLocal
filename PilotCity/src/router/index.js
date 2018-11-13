import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Signup from '@/components/Signup'
import ClassPicker from '@/components/ClassPicker'
import Foremployer from '@/components/ClassPicker'
import Forteacher from '@/components/ClassPicker'
import Demo from '@/components/Demo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
      {
        path: '/signup',
        name: 'Signup',
        component: Signup,
      },
      {
        path:'/classpicker',
        name:'ClassPicker',
        component: ClassPicker,
      },
      {
        path:'/forteacher',
        name:'Forteacher',
        component: Forteacher
      },
      {
        path:'/foremployer',
        name:'Foremployer',
        component: Foremployer
      },
      {
        path:'/demo',
        name:'Demo',
        component: Demo
      }
    ]

})
