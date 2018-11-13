<template>
    <div>
        <w_teacher_address />
    </div>
</template>
<script>
import w_skills from '@/components/wizard/teacher/w_skills'
import w_teacher_address from '@/components/wizard/teacher/w_teacher_address'
export default {
    name: 'Testing',
    data (){
        return {
            
        }
    },
    components:
    {
        w_skills,
        w_teacher_address
    }
}
</script>
