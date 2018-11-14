<template id="demo">
    <div class="mt-3">
        <ClassPicker id="class_picker" class="animated fadeIn"/>
            <w_story id="w_story" class="animated fadeIn"/>
            <w_teacher_address   id="w_teacher_address" class="animated fadeIn"/>   
            <w_industry id="w_industry" class="animated fadeIn"/>
            <w_class id="w_class" class="animated fadeIn" />
            <w_skills id="w_skills" class="animated fadeIn" />
        <Button_next />
    </div>
</template>

<script>
import { bus } from '../main'

import ClassPicker from '@/components/ClassPicker'

import w_teacher_address from '@/components/wizard/teacher/w_teacher_address'
import w_address from '@/components/wizard/employer/w_address'
import w_sector from '@/components/wizard/employer/w_sector'
import w_tags from '@/components/wizard/employer/w_tags'
import w_story from '@/components/wizard/teacher/w_story'
import w_descrbe_product_n_service from '@/components/wizard/employer/w_descrbe_product_n_service'
import w_department from '@/components/wizard/employer/w_department'
import w_bottom_line from '@/components/wizard/employer/w_bottom_line'
import w_question from '@/components/wizard/employer/w_question'
import Button_next from '@/components/Button_next'
import w_industry from '@/components/wizard/teacher/w_industry'
import w_skills from '@/components/wizard/teacher/w_skills'
import w_class from '@/components/wizard/teacher/w_class'
import w_ptype from '@/components/wizard/teacher/w_ptype'
import firebase from '@/firebase/init'


export default {
    name: "Demo",
    data(){
        return{
            authUser: null,
            role: null,
            e_w_wizards: ['#w_story', '#w_address', '#w_sector', '#w_question'],
            t_w_wizards: ['#w_story', '#w_teacher_address', '#w_industry', '#w_class', '#w_ptype', '#w_skills'],
            data_arr: [],
            db_doc: {}
        }
    },
    components: {
        ClassPicker,
        w_address,
        w_sector,
        w_tags,
        w_story,
        w_descrbe_product_n_service,
        w_department,
        w_bottom_line,
        w_question,
        Button_next,
        w_industry,
        w_skills,
        w_teacher_address,
        w_class,
        w_ptype
    },
    methods:{
        movePage: function(dirct, step, arr){
            if (step < arr.length){
                if (dirct == 'right') {
                    $(arr[(step - 1)]).hide();
                    $(arr[step]).show();
                } else {
                    this.data_arr.pop();
                    $(arr[(step - 1)]).show();
                    $(arr[step]).hide();
                }
            }
            if (step == 0){
                document.getElementById('the_best_prev_button').style.display = "none";
                document.getElementById('the_best_next_button').disabled = true;
                $("#class_picker").removeClass('fadeOut');
                $('#class_picker').show();
            }
        }
    },
    created(){
        var self = this;
        const db = firebase.firestore();
        var userRef;
		firebase.auth().onAuthStateChanged(function(user) {
            if (!firebase.auth().currentUser)
                self.$router.push('/');
            if (firebase.auth().currentUser && !firebase.auth().currentUser.emailVerified)
                self.$router.push('/');
            if (user && user.uid){
                userRef = db.collection("users").doc(user.uid);
                userRef.get().then(function(doc) {
                    if (doc.exists) {
                        self.db_doc = doc.data();
                    } else {
                        userRef.set({});
                    }
                });
            }  
        });
        bus.$on('move', function(obj){
            if (self.role == 'employer')
                self.movePage(obj.dirct, obj.step, self.e_w_wizards);
            else if (self.role == 'teacher') {
                self.movePage(obj.dirct, obj.step, self.t_w_wizards);
            }
        });
        bus.$on('userSignedIn', function(user){
            self.authUser = user;
        })
        bus.$on('pickedRole', function(role){
            document.getElementById('the_best_next_button').disabled = false;
            document.getElementById('the_best_prev_button').style.display = "block";
            self.role = role;
            $("#class_picker").addClass('fadeOut');
            setTimeout(function(){
                $('#class_picker').hide();
                if (self.role == 'employer')
                    $(self.e_w_wizards[0]).show();
                else if (self.role == 'teacher')
                    $(self.t_w_wizards[0]).show();
            }, 300);
        })
        bus.$on('form_completed', obj => {
            self.data_arr.push(obj);
        });
    }
}
</script>

<style>
#w_address, 
#w_question, #w_story, #w_teacher_address, #w_tags, #w_industry, #w_class, #w_skills #w_ptype{
    display: none;
}

::-webkit-scrollbar {
    width: 0px;  /* remove scrollbar space */
    background: transparent;  /* optional: just make scrollbar invisible */
}
/* optional: show position indicator in red */
::-webkit-scrollbar-thumb {
    background: transparent; 
}

</style>
