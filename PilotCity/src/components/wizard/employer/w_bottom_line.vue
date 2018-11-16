<template>
    <div class="container ">
        <employer_industry_tag class="d-flex flex-col justify-content-center"
            name="What's your return on investment?"
            :keywords=bottom_line_keywords
            placeholder ="Enter keywords here to describe your bottom line"
        ></employer_industry_tag>
        <employer_industry_tag class="d-flex flex-col justify-content-center mt-5"
            name="How are you doing it now?"
            :keywords=strategies_initiatives_keywords
            placeholder ="Enter keywords here to describe your strategies and initiatives"
        ></employer_industry_tag>
    </div>
</template>

<script>
import tagging from "@/components/wizard/tools/tagging.vue"
export default {
    name: "w_bottom_line",
    data () {
        return {
            bottom_line_keywords: ['Client Acquisition', 'Use Cases','Building Community','Training Talent',
            'Sales','Marketing','Public Relations','Operational Optimization','Automation',
            'Research & Development','Innovation','Talent Generation','Client Engagement'],
            roi_keywords: [],
            strategies_initiatives_keywords: ['stuff']
        }
    },
    components: {
        employer_industry_tag:tagging
    }
}
</script>

<style scoped>

.container {
    margin-top:50px;
}

</style>
