<template>
    <div class="container mt-5">
        <bottom_line_tag
        name="Whats your bottom line?"
        :keywords=bottom_line_keywords
        placeholder ="Example: Client Acquistion"
        ></bottom_line_tag>
        <bottom_line_tag class="mt-5"
        name="How are you doing it now?"
        :keywords=roi_keywords
        placeholder ="Example: Social Media Marketing"
        ></bottom_line_tag>
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
            roi_keywords: []
        }
    },
    components: {
        bottom_line_tag:tagging
    }
}
</script>
<style scoped>

</style>
