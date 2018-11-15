<template>
    <div class="container mt-5">
        <employer_industry_tag
        name="Whats your bottom line?"
        :keywords=bottom_line_keywords
        placeholder ="Example: Client Acquistion"
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
        }
    },
    components: {
        employer_industry_tag:tagging
    }
}
</script>

<style>

</style>
