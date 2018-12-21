import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/landing/Index'
import firebase from 'firebase'
import { store } from '@/store/store'
//import test from '@/views/test'
import camitest from '@/views/camitest'

import wizard from '@/components/profile_builder/wizard/wizard.vue'
//#region Prfile Builder Routes
import ClassPicker from '@/components/profile_builder/wizard/ClassPicker'

import w_teacher_story from '@/components/profile_builder/wizard/teacher/w_teacher_story'
import w_teacher from '@/components/profile_builder/wizard/teacher/w_teacher'
import w_teacher_address from '@/components/profile_builder/wizard/teacher/w_teacher_address'
import w_teacher_class from '@/components/profile_builder/wizard/teacher/w_teacher_class'
import w_teacher_class_schedule from '@/components/profile_builder/wizard/teacher/w_teacher_class_schedule'
import w_teacher_industry_keywords from '@/components/profile_builder/wizard/teacher/w_teacher_industry_keywords'
import w_teacher_skills_keywords from '@/components/profile_builder/wizard/teacher/w_teacher_skills_keywords'

import w_employer from '@/components/profile_builder/wizard/employer/w_employer'
import w_employer_story from '@/components/profile_builder/wizard/employer/w_employer_story'
import w_employer_address from '@/components/profile_builder/wizard/employer/w_employer_address'
import w_employer_sector from '@/components/profile_builder/wizard/employer/w_employer_sector'
import w_employer_industry_keywords from '@/components/profile_builder/wizard/employer/w_employer_industry_keywords'
import w_employer_solutions_picker from '@/components/profile_builder/wizard/employer/w_employer_solutions_picker'
import w_employer_solution_keywords from '@/components/profile_builder/wizard/employer/w_employer_solution_keywords'
import w_employer_department from '@/components/profile_builder/wizard/employer/w_employer_department'
import w_employer_roi from '@/components/profile_builder/wizard/employer/w_employer_roi'
import w_employer_flock from '@/components/profile_builder/wizard/employer/w_employer_flock'

import w_student from '@/components/profile_builder/wizard/student/w_student'
import w_student_story from '@/components/profile_builder/wizard/student/w_student_story'
import w_student_demographic from '@/components/profile_builder/wizard/student/w_student_demographic'
//#endregion

import matchmaking from '@/components/matchmaking/matchmaking.vue'
import mm_employer from '@/components/matchmaking/employer/mm_employer.vue'
import mm_teacher from '@/components/matchmaking/teacher/mm_teacher.vue'
import wall from '@/components/matchmaking/wall/wall.vue'

// import Admin from '@/pages/testing_page/Admin.vue'
import Settings from '@/components/settings/Settings'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/test',
      name: 'test',
      // component: Settings,
      children: [
        {
          path: 'cami',
          name: 'camitest',
          component: Settings
        },
        {
          path: 'wall',
          name: 'wall',
          component: wall
        }
      ]
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/wizard',
      name: 'wizard',
      component: wizard,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/classpicker',
          name: 'ClassPicker',
          component: ClassPicker,
        },
        {
          path: 'teacher',
          name: 'w_teacher',
          component: w_teacher,
          children: [
            {
              path: '1',
              name: 'w_teacher_story',
              component: w_teacher_story
            },
            {
              path: '2',
              name: 'w_teacher_address',
              component: w_teacher_address
            },
            {
              path: '3',
              name: 'w_teacher_class',
              component: w_teacher_class
            },
            {
              path: '4',
              name: 'w_teacher_class_schedule',
              component: w_teacher_class_schedule
            },
            {
              path: '5',
              name: 'w_teacher_industry_keywords',
              component: w_teacher_industry_keywords
            },
            {
              path: '6',
              name: 'w_teacher_skills_keywords',
              component: w_teacher_skills_keywords
            }
          ],
          //#region RouteGuard for teacher class
          beforeEnter: (to, from, next) => {
            const db = firebase.firestore()
            let user = firebase.auth().currentUser
            if (store.state.test) {
              if (user) {
                db.collection("Users").doc(user.uid).get().then((doc) => {
                  if (doc.data().isTeacher)
                    next()
                  else
                    next({ name: 'ClassPicker' })
                })
              }
              else
                next({ name: 'ClassPicker' })
            }
          },
          //#endregion
        },
        {
          path: 'employer',
          name: 'w_employer',
          component: w_employer,
          children: [
            {
              path: '1',
              name: 'w_employer_story',
              component: w_employer_story
            },
            {
              path: '2',
              name: 'w_employer_address',
              component: w_employer_address
            },
            {
              path: '3',
              name: 'w_employer_sector',
              component: w_employer_sector
            },
            {
              path: '4',
              name: 'w_employer_industry_keywords',
              component: w_employer_industry_keywords
            },
            {
              path: '5',
              name: 'w_employer_solutions_picker',
              component: w_employer_solutions_picker
            },
            {
              path: '6',
              name: 'w_employer_solution_keywords',
              component: w_employer_solution_keywords
            },
            {
              path: '7',
              name: 'w_employer_department',
              component: w_employer_department
            },
            {
              path: '8',
              name: 'w_employer_roi',
              component: w_employer_roi
            },
            {
              path: '9',
              name: 'w_employer_flock',
              component: w_employer_flock
            }
          ],
          //#region RouteGuard for employer class
          beforeEnter: (to, from, next) => {
            const db = firebase.firestore()
            let user = firebase.auth().currentUser
            if (store.state.test) {
              if (user) {
                db.collection("Users").doc(user.uid).get().then((doc) => {
                  if (doc.data().isTeacher)
                    next()
                  else
                    next({ name: 'ClassPicker' })
                })
              }
              else
                next({ name: 'ClassPicker' })
            }
          },
          //#endregion
        },
        {
          path: 'student',
          name: 'w_student',
          component: w_student,
          children: [
            {
              path: '1',
              name: 'w_student_story',
              component: w_student_story
            },
            {
              path: '2',
              name: 'w_student_demographic',
              component: w_student_demographic
            },
          ],
          // #region RouteGuard for student class
          beforeEnter: (to, from, next) => {
            const db = firebase.firestore()
            let user = firebase.auth().currentUser
            if (user) {
              db.collection("Users").doc(user.uid).get().then((doc) => {
                if (doc.data().isStudent)
                  next()
                else
                  next({ name: 'ClassPicker' })
              })
            }
            else
              next({ name: 'ClassPicker' })
          },
          // #endregion
        },
      ]
    },
    { //Sends user back to index if page does not exist
      path: '*',
      redirect: { name: 'Index' }
    },
    {
      path: '/matchmaking',
      name: 'matchmaking',
      component: matchmaking,
      children: [
        {
          path: 'employer',
          name: 'mm_employer',
          component: mm_employer
        },
        {
          path: 'teacher',
          name: 'mm_teacher',
          component: mm_teacher
        }
      ]
    }
  ]
})
// #region  RouterGuard Implementation to check for user Authentication
router.beforeEach((to, from, next) => {
  //check to see if router requires auth
  console.log(store)
  if (to.matched.some(rec => rec.meta.requiresAuth) && !store.state.test) {
    // check auth state of user
    let user = firebase.auth().currentUser
    if (user) {
      //user signed in, proceed
      next()
    } else {
      // no user signed in, redirect to login
      next({ name: 'Index' })
    }
  } else {
    next()
  }
})
//#endregion

export default router