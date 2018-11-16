<template>
    <div>
        <flock_tag
        name="Enter Question"
        placeholder="State your challenge in the form of question here"
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
            flock_keywords: []
        }
    },
    components: {
        flock_tag: tagging
    }
}
</script>

<style scoped>

</style>
