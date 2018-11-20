import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/landing/Index'
import ClassPicker from '@/components/profile_builder/wizard/ClassPicker'
import firebase from 'firebase'
import w_story from '@/components/profile_builder/wizard/teacher/w_story'
import w_teacher from '@/components/profile_builder/wizard/teacher/w_teacher'
import w_teacher_address from '@/components/profile_builder/wizard/teacher/w_teacher_address'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path:'/classpicker',
      name:'ClassPicker',
      component:ClassPicker,
      meta: {
        requiresAuth: true
      },
    },
    {
      path:'/wizard/teacher',
      name:'w_teacher',
      component: w_teacher,
      children: [
        {
          path: '1',
          name:'w_story',
          component:w_story
        },
        {
          path:'2',
          name:'w_teacher_address',
          component:w_teacher_address
        }
      ],
      beforeEnter: (to,from,next) => {
        const db = firebase.firestore()
        let user = firebase.auth().currentUser
        if (user) {
          db.collection("Users").doc(user.uid).get().then( (doc) => {
            if(doc.data().isTeacher) 
              next()
            else
              next({name: 'ClassPicker'})
          })
        }
        else
          next({name: 'ClassPicker'})
      },
      meta: {
        requiresAuth: true
      }
    },
/*     {
      path: '*',
      redirect: {name: 'Index'}
    } */
  ]
})

/* router.beforeEach((to,from,next) =>{
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
}) */ 

export default router