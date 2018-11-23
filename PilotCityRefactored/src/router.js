import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/landing/Index'
import firebase from 'firebase'

import ClassPicker from '@/components/profile_builder/wizard/ClassPicker'

import w_teacher_story from '@/components/profile_builder/wizard/teacher/w_teacher_story'
import w_teacher from '@/components/profile_builder/wizard/teacher/w_teacher'
import w_teacher_address from '@/components/profile_builder/wizard/teacher/w_teacher_address'
import w_teacher_class from '@/components/profile_builder/wizard/teacher/w_teacher_class'
import w_teacher_class_schedule from '@/components/profile_builder/wizard/teacher/w_teacher_class_schedule'

import w_employer from '@/components/profile_builder/wizard/employer/w_employer'
import w_employer_story from '@/components/profile_builder/wizard/employer/w_employer_story'
import w_employer_address from '@/components/profile_builder/wizard/employer/w_employer_address'
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
          name:'w_teacher_story',
          component:w_teacher_story
        },
        {
          path:'2',
          name:'w_teacher_address',
          component:w_teacher_address
        },
        {
          path:'3',
          name:'w_teacher_class',
          component: w_teacher_class
        },
        {
          path:'4',
          name:'w_teacher_class_schedule',
          component:w_teacher_class_schedule
        }
      ],
      /* beforeEnter: (to,from,next) => {
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
      } */
    },
    {
      path:'/wizard/employer',
      name:'w_employer',
      component: w_employer,
      children: [
        {
          path:'1',
          name:'w_employer_story',
          component: w_employer_story
        },
        {
          path:'2',
          name:'w_employer_address',
          component: w_employer_address
        }
      ]
    }
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
})  */

export default router