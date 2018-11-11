<template>
    <div>
        <!-- Button trigger modal -->
        <button type="button" class="btn navbar-btn btn-primary btn-lg active Raleway float-right active" data-toggle="modal" data-target="#exampleModalCenter2">
        Signup
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModalCenter2" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content pc-light-gray">
            <div class="modal-body">
                <div class="d-flex justify-content-center">
                    <img src='@/assets/2_heart.png' alt="Heart Logo" id='Heartlogo' >
                </div>
                <form>
                <div class="col-auto form-margin">
                    <label class="sr-only" for="inlineFormInputGroup">Username</label>
                    <div class="input-group mb-2 padding">
                        <div class="input-group-prepend">
                        <div class="input-group-text icon-gray">
                            <i class="material-icons">account_circle</i>
                        </div>
                        </div>
                        <input type="text" class="form-control form-rounded padding form-active form-active" id="inlineFormInputGroup" placeholder="Username">
                    </div>
                </div>
                <div class="col-auto form-margin">
                    <label class="sr-only" for="inlineFormInputGroup">Password</label>
                    <div class="input-group mb-2 padding">
                        <div class="input-group-prepend">
                            <div class="input-group-text icon-gray">
                            <i class="large material-icons">lock</i>
                            </div>
                        </div>
                        <input type="password" class="form-control form-rounded padding form-active" id="inlineFormInputGroup" placeholder="Password">
                    </div>
                </div>
                <div class="d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary button-regular pc-blue">Signup</button>
                </div>
                </form>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Signup',
    data() {
        return{

        }
    }
}
</script>
<style>

</style>

