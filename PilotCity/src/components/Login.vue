<template>
    <div>
        <!-- Button trigger modal -->
        <button type="button" class="navbar-btn btn-primary btn-lg active Raleway float-right active" data-toggle="modal" data-target="#exampleModalCenter1">
        Login
        </button>

        <!-- Modal -->
        <div class="modal faded" id="exampleModalCenter1" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" >
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
                    <button type="submit" class="btn btn-primary button-regular pc-blue">Login</button>
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
    name: 'Login',
    data() {
        return{

        }
    }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Raleway');
.Raleway {
	font-family: 'Raleway';
	font-weight: 700;
}

.navbar-btn {
	border-radius: 50px;
	background-color: #404041 !important;
    border: solid 2px #404041 !important;
	padding-left : 40px;
	padding-right: 40px;
    margin: auto 20px;
}

.active:hover {
	border: solid 2px #ffffff !important;
}

.modal-content  {
    -webkit-border-radius: 30px !important;
    -moz-border-radius: 30px !important;
    border-radius: 30px !important; 
}
#Heartlogo{
    padding-bottom: 20px;
    height: 100px;
    width: 80px;
}
.padding{
    padding: 15px;
}
.form-rounded {
    border-radius: 50px;
    background-color: #414042;
    color: #ffffff !important;

}
.form-active:focus-within {
    color: #000000 !important;
}
.icon-gray{
    background-color: #939598;
}

.form-margin {
    margin: 2px 0 2px 0;
}
.button-regular {
    width:200px;
    border-radius: 50px;
    font-size: 20px;
    font-family: Raleway;
    color: white;
    text-align: center;
    margin:15px auto;
}
.pc-blue {
    background-color:#3C93CD;
}

.pc-light-gray{
    background-color: #58595b
}
</style>

