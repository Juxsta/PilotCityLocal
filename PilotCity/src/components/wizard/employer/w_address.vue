<template>
   <div class="container ">
        <form class="mt-5"> 
            <div class="form-group">
                <label for="inputAddress">Employer Address</label>
                <input type="text" class="form-control" id="inputAddress" placeholder="435 Portage Ave,">
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                <label for="inputCity">City</label>
                <input type="text" class="form-control" id="inputCity" placeholder="Palo Alto">
                </div>
                <div class="form-group col-md-2">
                <label for="inputState">State</label>
                <input type="text" class="form-control" id="inputState" placeholder="CA">
                </div>
                <div class="form-group col-md-2">
                <label for="inputZip">Zip</label>
                <input type="text" class="form-control" id="inputZip">
                </div>
                <div class="form-group col-md-2">
                <label for="inputType">Type</label>
                <input type="text" class="form-control" id="inputType" placeholder="Primary/HQ">
                </div>
            </div>
        </form>
        <span>
            <button type ="button" class="btn btn-primary btn-block">
                <i class="material-icons">add</i>
            </button>
        </span>
   </div>
</template>

<script>
export default {
    name: "w-address",
}
</script>

<style>

</style>
