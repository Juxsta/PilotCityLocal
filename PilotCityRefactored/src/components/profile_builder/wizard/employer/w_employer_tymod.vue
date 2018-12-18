<template>
    <div class="container-fluid m-auto justify-content-center">
        <!-- Modal -->
        <div class="modal fade" id="employer-thankyou-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" >
            <div class="modal-content pc-light-gray">
            <div class="d-flex flex-column modal-body">
                    <h2 class="Raleway font-weight-bold ml-auto mr-auto text-thank-you-employer">Thank you</h2>
                <div class="ml-auto mr-auto">
                    <img src='@/assets/images/matchmake_employer.png' alt="Matchmake" id='Matchmake' >
                </div>
                    <h2 class="ml-auto mr-auto text-title-notify">We will notify you when your match results are available.</h2>
                <div class="ml-auto mr-auto">
                    <button class="btn btn-lg button-over-out-employer" @click="out">Over and out</button>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>
git 
<script>
import firebase from '@/firebase/init'
import { bus } from '@/main'
export default {
    name: "w_employer_tymod",
    data() {
        return{

        }
    },
    methods:{
        out: function(){
            firebase.auth().signOut().then(() => {
                this.$router.push({name: 'Index'})
                $('#employer-thankyou-modal').modal('hide');
                bus.$emit('re-render')
            })
        }
    }
}
</script>

<style scoped>

.text-title-notify {
    font-family: Raleway;
    color: #ffffff;
    text-align: center;
    font-weight: 700;
    margin-bottom:25px;
    margin-left:100px;
    font-size: 30px;
}

.text-thank-you-employer {
    font-family: Raleway;
    color: #ae90b0;
    text-align: center;
    font-weight: 700;
    margin-top:25px;
}

.button-over-out-employer {
    border-radius: 50px;
    font-family: Raleway;
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 20px;
    padding-left:30px;
    padding-right:30px;
    background:transparent;
    border-color: #ae90b0;
    color:  #ae90b0;
}

.button-over-out-employer:hover {
    border-radius: 50px;
    font-family: Raleway;
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 20px;
    padding-left:30px;
    padding-right:30px;
    background: #ffffff;
    border-color: #ae90b0;
    color:  #ae90b0;
}

#Matchmake {
    text-align: center;
    width:100px;
    margin:20px;
}

</style>
