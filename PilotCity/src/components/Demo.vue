<template id="demo">
    <div class="mt-3">
        <class-picker />

    </div>
</template>

<script>
import { bus } from '../main'

import ClassPicker from '@/components/ClassPicker'

import w_address from '@/components/wizard/employer/w_address'
import w_sector from '@/components/wizard/employer/w_sector'
import w_tags from '@/components/wizard/employer/w_tags'
import w_story from '@/components/wizard/teacher/w_story'
import w_classinfo1 from '@/components/wizard/teacher/w_classinfo1'
import w_descrbe_product_n_service from '@/components/wizard/employer/w_descrbe_product_n_service'
import w_department from '@/components/wizard/employer/w_department'
import w_bottom_line from '@/components/wizard/employer/w_bottom_line'
import w_question from '@/components/wizard/employer/w_question'
import Button_next from '@/components/Button_next'
import w_industry from '@/components/wizard/teacher/w_industry'
export default {
    name: "Demo",
    data(){
        return{
            authUser: null,
            role: null,
            e_w_wizards: ['w_address', 'w_sector', 'w_question'],
            t_w_wizards: ['w_address', 'w_sector', 'w_question'],
        }
    },
    components: {
        ClassPicker,
        w_address,
        w_sector,
        w_tags,
        w_story,
        w_classinfo1,
        w_descrbe_product_n_service,
        w_department,
        w_bottom_line,
        w_question,
        Button_next,
        w_industry
    },
    created(){
        var self = this;
        bus.$on('next', function(count){
            if (self.role == 'employer'){
                if (count < self.e_w_wizards.length){
                    $('#' + self.e_w_wizards[(count - 1)]).hide();
                    $('#' + self.e_w_wizards[count]).show();
                }
            }
            else if (self.role == 'teacher') {
                if (count < self.t_w_wizards.length){
                    $('#' + self.t_w_wizards[(count - 1)]).hide();
                    $('#' + self.t_w_wizards[count]).show();
                }
            }
        });
        bus.$on('userSignedIn', function(user){
            self.authUser = user;
        })
        bus.$on('pickedRole', function(role){
            document.getElementById('the_best_next_button').disabled = false;
            self.role = role;
            $("#class_picker").addClass('fadeOutLeft');
            setTimeout(function(){
                $('#class_picker').hide();
                if (self.role == 'employer')
                    $('#' + self.e_w_wizards[0]).show();
                else if (self.role == 'teacher')
                    $('#' + self.t_w_wizards[0]).show();
            }, 300);
            
        })
    }
}
</script>

<style>
#w_address{
    display: none;
}
#w_question{
    display: none;
}
#w_sector{
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
