<template>
    <div>
        <div class="d-flex justify-content-center">
            <h1 class="Raleway problem-picker-label">If you had a flock of students to create solutions for you, what problems would you have them solve?</h1>
        </div>
        <flock_tag class=" container d-flex flex-col justify-content-center"
        name="Problems"
        placeholder="Enter keywords that describe problems you want students to solve"
        :keywords=flock_keywords
        ></flock_tag>
    </div>
</template>

<script>
import tagging from "@/components/wizard/tools/tagging.vue"
export default {
    name:"w_flock",
    data () {
        return {
            flock_keywords: [x]
        }
    },
    components: {
        flock_tag: tagging
    }
}
</script>

<style scoped>

.problem-picker-label {
    color: rgb(222, 223, 224);
    font-style: italic;
    font-weight: 700;
    font-size: 30px;
    margin-bottom:50px;
    margin-top:50px;
    width:850px;
    text-align: center;
}

</style>
