<template>
    <div class="container-fluid">
        <div class="d-flex justify-content-center">
            <h2> What sector are you coming from?</h2>
        </div>
        <div class="d-flex justify-content-center align-items-end">
                <button class="btn btn-circle pc-green">Teacher</button>
                <button class="btn btn-circle pc-blue">Employer</button>
                <button class="btn btn-circle pc-orange">Student</button>
                <button class="btn btn-circle pc-yellow">Student</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "w_sector"
}
</script>

<style>

.btn-circle {
    width:250px;
    height:250px;
    border-radius: 200px;
    margin: auto 20px;
    font-family: 'Raleway';
    font-weight:700 !important;
    font-size: 30px;
    color: #ffffff
}
.pc-green {
    background-color: #6eba7f
}
.pc-blue {
    background-color: #3c9ccc
}
.pc-orange {
    background-color: #f79960
}
.pc-yellow {
    background-color: #fdd25a
}
</style>
