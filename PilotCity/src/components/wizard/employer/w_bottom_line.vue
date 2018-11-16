<template>
    <div class="container d-flex flex-col justify-content-center">
        <employer_industry_tag
        name="Whats your bottom line?"
        :keywords=bottom_line_keywords
        placeholder ="Enter keywords here to describe your bottom line"
        ></employer_industry_tag>
    </div>
    
</template>

<script>
import tagging from "@/components/wizard/tools/tagging.vue"
export default {
    name: "w_solutions_tagging",
    data () {
        return {
            bottom_line_keywords: ['Client Acquisition', 'Use Cases','Building Community','Training Talent',
            'Sales','Marketing','Public Relations','Operational Optimization','Automation',
            'Research & Development','Innovation','Talent Generation','Client Engagement'],
        }
    },
    components: {
        employer_industry_tag:tagging
    }
}
</script>
<style scoped>

</style>
