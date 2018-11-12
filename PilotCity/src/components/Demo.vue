<template>
    <div id="w_sector" class="mt-3">
        <w_sector />
    </div>
</template>

<script>
import w_address from '@/components/wizard/employer/w_address'
import w_sector from '@/components/wizard/employer/w_sector'
import w_tags from '@/components/wizard/employer/w_tags'
export default {
    name: "Demo",
    components: {
        w_address,
        w_sector,
        w_tags
    }
}
</script>

<style>

</style>
