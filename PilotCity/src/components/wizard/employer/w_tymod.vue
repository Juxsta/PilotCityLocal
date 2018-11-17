<template>
    <div class="container-fluid m-auto justify-content-center">
        <!-- Modal -->
        <div class="modal fade" id="thankyou-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" >
            <div class="modal-content pc-light-gray">
            <div class="d-flex flex-column modal-body">
                    <h2 class="Raleway font-weight-bold ml-auto mr-auto text-thank-you" :style="{color:colors.color_type}">Thank you</h2>
                <div class="ml-auto mr-auto">
                    <img :src=image alt="Matchmake" id='Matchmake' >
                </div>
                    <h2 class="ml-auto mr-auto text-title-notify">We will notify you when your match results are available.</h2>
                <div class="ml-auto mr-auto">
                    <button class="btn btn-lg button-over-out" :style="{color:colors.color_type, 'border-color':colors.color_type}" @click="out">Over and out</button>
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
    name:'w_tymod',
    data() {
        return{

        }
    },
    methods:{
        out: function(){
            firebase.auth().signOut();
            location.reload();
        }
    }
}
</script>

<style>

.text-title-notify {
    font-family: Raleway;
    color: #ffffff;
    text-align: center;
    font-weight: 700;
    margin-bottom:25px;
    margin-left:100px;
    font-size: 30px;
}

.text-thank-you {
    font-family: Raleway;
    text-align: center;
    font-weight: 700;
    margin-top:25px;
}

.button-over-out {
    border-radius: 50px;
    font-family: Raleway;
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 20px;
    padding-left:30px;
    padding-right:30px;
    background:transparent;

}

.button-over-out:hover {
    border-radius: 50px;
    font-family: Raleway;
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 20px;
    padding-left:30px;
    padding-right:30px;
    background: #ffffff;
}

#Matchmake {
    text-align: center;
    width:100px;
    margin:20px;
}

.pc-purple {
    color: #ae90b0;
}
.pc-pink {
    color: #eca0be;
}
.pc-green {
    color: #6eba7f
}
.pc-blue {
    color: #3c9ccc
}
.pc-orange {
    color: #f79960
}
.pc-yellow {
    color: #fdd25a
}
.pc-red {
    color: #ea6763
}
</style>
