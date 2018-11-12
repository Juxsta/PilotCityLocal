<template>
    <div id="w_sector" class="mt-3">
        <w_bottom_line />
    </div>
</template>

<script>
import w_address from '@/components/wizard/employer/w_address'
import w_sector from '@/components/wizard/employer/w_sector'
import w_tags from '@/components/wizard/employer/w_tags'
import w_descrbe_product_n_service from '@/components/wizard/employer/w_descrbe_product_n_service'
import w_department from '@/components/wizard/employer/w_department'
import w_bottom_line from '@/components/wizard/employer/w_bottom_line'
export default {
    name: "Demo",
    components: {
        w_address,
        w_sector,
        w_tags,
        w_descrbe_product_n_service,
        w_department,
        w_bottom_line
    }
}
</script>

<style>

</style>
