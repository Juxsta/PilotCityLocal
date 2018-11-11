<template>
    <div>
        <!-- Button trigger modal -->
        <button type="button" class="navbar-btn btn-primary btn-lg active Raleway float-right active" data-toggle="modal" data-target="#exampleModalCenter1">
        Login
        </button>

        <!-- Modal -->
        <div class="modal faded" id="exampleModalCenter1" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" >
            <div class="modal-content">
            <div class="modal-body">
                <div class="d-flex justify-content-center">
                    <img src='@/assets/2_heart.png' alt="Heart Logo" id='Heartlogo' >
                </div>
                <form>
                <div class="col-auto">
                    <label class="sr-only" for="inlineFormInputGroup">Username</label>
                    <div class="input-group mb-2 rounded">
                        <div class="input-group-prepend">
                        <div class="input-group-text">
                            <i class="material-icons">account_circle</i>
                        </div>
                        </div>
                        <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Username">
                    </div>
                </div>
                <div class="col-auto">
                    <label class="sr-only" for="inlineFormInputGroup">Password</label>
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                            <i class="large material-icons">lock</i>
                            </div>
                        </div>
                        <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Password">
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
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

</style>

