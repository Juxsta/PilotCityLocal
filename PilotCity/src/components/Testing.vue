<template>
    <div>
        <w_skills />
    </div>
</template>
<script>
import w_skills from '@/components/wizard/teacher/w_skills'
import w_teacher_address from '@/components/wizard/teacher/w_teacher_address'
import w_industry from '@/components/wizard/teacher/w_industry'
import w_story from '@/components/wizard/teacher/w_story'
export default {
    name: 'Testing',
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
    }
}
</script>
