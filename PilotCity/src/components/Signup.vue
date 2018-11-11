<template>
    <div>
        <!-- Button trigger modal -->
        <button type="button" class="navbar-btn btn-primary btn-lg active Raleway float-right active" data-toggle="modal" data-target="#exampleModal">
        Signup
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                ...
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
    name: 'Signup',
    data() {
        return{

        }
    }
}
</script>
<style>
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
</style>

