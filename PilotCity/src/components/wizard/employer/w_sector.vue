<template>
    <div class="container-fluid mt-5">
        <div class="d-flex justify-content-center" id="Sector-Prompt">
            <h1 class="Raleway class-picker-label">What sector are you coming from?</h1>
        </div>
        <div class="d-flex justify-content-center align-items-end">
                <button class="btn btn-circle pc-green">Industry</button>
                <button class="btn btn-circle pc-blue">Government</button>
                <button class="btn btn-circle pc-orange">Education</button>
                <button class="btn btn-circle pc-yellow">Community</button>
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
#Sector-Prompt {
    margin: 50px 0px 50px 0;
    font-family: 'Raleway';
}

.class-picker-label{
    color: rgb(222, 223, 224);
    font-style: italic;
    font-weight: 700;
    font-size: 30px;
}

.class-picker-label{
    color: rgb(222, 223, 224);
    font-style: italic;
    font-weight: 700;
    font-size: 30px;
}

.class-picker-btn:active {
    transition: all 0.5s;
    border-color: rgb(222, 223, 224) !important;
    outline: none !important;
}

</style>
