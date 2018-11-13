<template id="demo">
    <div class="mt-3">
<!--         <w_address  id="w_address" class="animated fadeInRight"/>
        <w_sector id="w_sector" class="animated fadeInRight"/>
        <w_question id="w_question"  class="animated fadeInRight"/>
        <Button_next /> -->
        <w_sector />
    </div>
</template>

<script>
import { bus } from '../main'

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
export default {
    name: "Demo",
    data(){
        return{
            w_wizards: ['w_address', 'w_sector', 'w_question'],
        }
    },
    components: {
        w_address,
        w_sector,
        w_tags,
        w_story,
        w_classinfo1,
        w_descrbe_product_n_service,
        w_department,
        w_bottom_line,
        w_question,
        Button_next 
    },
    created(){
        var self = this;
        bus.$on('next', function(count){
            $('#' + self.w_wizards[(count - 1) % self.w_wizards.length]).hide();
            $('#' + self.w_wizards[count % self.w_wizards.length]).show();
        });
    }
}
</script>

<style>

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
