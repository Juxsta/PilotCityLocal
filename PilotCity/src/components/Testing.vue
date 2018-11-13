<template>
    <div>
        <w_story />
    </div>
</template>
<script>
import w_skills from '@/components/wizard/teacher/w_skills'
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
        w_industry,
        w_story,
    }
}
</script>
