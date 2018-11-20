import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/landing/Index'
import ClassPicker from '@/components/profile_builder/wizard/ClassPicker'
import firebase from 'firebase'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path:'/profilewizard',
      name:'ClassPicker',
      component:ClassPicker
    }
  ]
})

router.beforeEach((to,from,next) =>{
  //check to see if router requires auth
  if(to.matched.some(rec => rec.meta.requiresAuth)){
    // check auth state of user
    let user = firebase.auth().currentUser
    if(user){
      //user signed in, proceed
      next()
    } else {
      // no user signed in, redirect to login
      next({ name: 'Index'})
    }
  } else {
    next()
  }
})

export default router