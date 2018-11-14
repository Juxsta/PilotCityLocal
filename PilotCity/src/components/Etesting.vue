<template>
    <div>
        <w_ptype />
    </div>
</template>
<script>
import w_skills from '@/components/wizard/teacher/w_skills'
import w_teacher_address from '@/components/wizard/teacher/w_teacher_address'
import w_industry from '@/components/wizard/teacher/w_industry'
import w_story from '@/components/wizard/teacher/w_story'
import w_class from '@/components/wizard/teacher/w_class'
import w_ptype from '@/components/wizard/teacher/w_ptype'
export default {
    name: 'Etesting',
    data (){
        return {
            
        }
    },
    components:
    {
        w_skills,
        w_teacher_address,
        w_industry,
        w_story,
        w_class,
        w_ptype,
    }
}
</script>
