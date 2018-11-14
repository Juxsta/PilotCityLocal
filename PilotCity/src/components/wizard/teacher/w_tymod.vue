<template>
    <div class="container-fluid m-auto justify-content-center">
        <!-- Button trigger modal -->
        <button type="button" id="btn-login" class="navbar-btn btn-primary btn-lg active Raleway float-right active" data-toggle="modal" data-target="#thankyou-modal">
        MODAL
        </button>

        <!-- Modal -->
        <div class="modal fade" id="thankyou-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" >
            <div class="modal-content pc-light-gray">
            <div class="d-flex flex-column modal-body">
                    <h2 class="Raleway font-weight-bold ml-auto mr-auto">Thank you</h2>
                <div class="ml-auto mr-auto">
                    <img src='@/assets/2_Heart.png' alt="Heart Logo" id='Heartlogo' >
                </div>
                <h2 class="ml-auto mr-auto">We Will Notify you when your match results are available</h2>
                <div class="ml-auto mr-auto">
                    <button class="btn btn-lg">Over and out</button>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import firebase from '@/firebase/init'

export default {
    name: "w_tymod",
    data() {
        return{

        }
    },
    methods:{
 
    }
}
</script>

<style>

</style>
