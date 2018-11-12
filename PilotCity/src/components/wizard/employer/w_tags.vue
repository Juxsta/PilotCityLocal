<template>
    <div id="w_tags" class="container">
        <h3>Descrbe your industry here with keywords</h3>
        <div id="panel_tagspanel">
                <span class="badge badge-pill badge-primary">Primary</span>
                <span class="badge badge-pill badge-primary">Primary</span>
                <hr />
                <span class="badge badge-pill badge-primary">Primary</span>
                <span class="badge badge-pill badge-secondary">Secondary</span>
                <span class="badge badge-pill badge-success">Success</span>
                <span class="badge badge-pill badge-danger">Danger</span>
                <span class="badge badge-pill badge-warning">Warning</span>
                <span class="badge badge-pill badge-info">Info</span>
                <span class="badge badge-pill badge-light">Light</span>
                <span class="badge badge-pill badge-dark">Dark</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "w_tags"
}
</script>

<style>
#panel_tagspanel{
    border-radius:10px;
    padding: 10px;
    background-color: rgba(235, 235, 235, 0.904);
}
.badge {
    cursor: pointer;
    margin-left: 10px;
}
</style>
