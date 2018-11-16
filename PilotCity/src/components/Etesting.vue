<template>
    <div class="container Raleway font-weight-bold mt-5">
        <div class="d-flex flex-col justify-content-center">
            <h2 class="justify-content-center">If you had a flock of fresh minds to generate solutions for you,</h2>
        </div>
        <div class="d-flex flex-col justify-content-center">
            <h2 class="justify-content-center">what challenge would you ask them to solve?</h2>
        </div>
        <div class="d-flex flex-col justify-content-center">
            <w_flock />
        </div>
    </div>
</template>
<script>
import w_skills from '@/components/wizard/teacher/w_skills'
import w_teacher_address from '@/components/wizard/teacher/w_teacher_address'
import w_industry from '@/components/wizard/teacher/w_industry'
import w_story from '@/components/wizard/teacher/w_story'
import w_class from '@/components/wizard/teacher/w_class'
import w_address from '@/components/wizard/employer/w_address'
import w_department from '@/components/wizard/employer/w_department'
import w_ptype from '@/components/wizard/teacher/w_ptype'
import w_solutions_tagging from '@/components/wizard/employer/w_solutions_tagging'
import w_tags from '@/components/wizard/employer/w_tags'
import w_bottom_line from '@/components/wizard/employer/w_bottom_line'
import w_flock from '@/components/wizard/employer/w_flock'
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
        w_address,
        w_department,
        w_ptype,
        w_solutions_tagging,
        w_tags,
        w_bottom_line,
        w_flock
    }
}
</script>
