<template>
    <div id="w_bottom_line" class="container">
        <form>
            <h3 class="font-weight-light"> What's your bottom line? </h3>
            <div class="panel_tagspanel">
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
        </form>
        <form class="mt-3">
            <h3 class="font-weight-light"> How are you doing it now? </h3>
            <div class="panel_tagspanel">
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
        </form>
    </div>
</template>

<script>
export default {
    name: "w_bottom_line"
}
</script>

<style>
.panel_tagspanel{
    border-radius:10px;
    padding: 10px;
    background-color: rgba(235, 235, 235, 0.904);
}
.badge {
    cursor: pointer;
    margin-left: 10px;
}
</style>
