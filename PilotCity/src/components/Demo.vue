<template>
    <div  class="mt-3">
        <w_classinfo1 />
    </div>
</template>

<script>
import w_address from '@/components/wizard/employer/w_address'
import w_sector from '@/components/wizard/employer/w_sector'
import w_tags from '@/components/wizard/employer/w_tags'
import w_story from '@/components/wizard/teacher/w_story'
import w_classinfo1 from '@/components/wizard/teacher/w_classinfo1'
export default {
    name: "Demo",
    components: {
        w_address,
        w_sector,
        w_tags,
        w_story,
        w_classinfo1
    }
}
</script>

<style>

</style>
