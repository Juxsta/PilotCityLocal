<template>
    <div class= "container-fluid" id="canvas">     
        <h2 id = "title">Connecting classrooms to the big bad world. </h2>
        <button type="button" class="btn btn-primary" id="index-btn-employers"> For Employers </button>
        <button type="button" class="btn btn-primary" id="index-btn-teachers" > For Teachers </button>
    </div>
</template>
<script>
export default {
    name: "Index",
    data() {
        return{
            
        }
    }
}
</script>
<style>
    #title{
        position: absolute;
        font-family: Raleway-Bold;
        color: white;
        top:250px;
        left: 100px;
        font-size: 50px;
        padding-left:0px;

    }
    #index-btn-employers{
        font-family: Raleway-Bold;
        font-size: 20px;
        background-color: #ae90b0;
        color: white;
        border-radius: 37.5px;
        height: 45px;
        width: 250px;
        text-align: center;
        position: absolute;
        top: 350px;
        left: 375px;
        border-color: transparent;
    }
    
    #index-btn-employers:hover{
        border: solid 1px white;
    }
    #index-btn-teachers{
        font-family: Raleway-Bold;
        font-size: 20px;
        background-color: #eca0be;
        stroke: #ae90b0;
        color: white;
        border-radius: 37.5px;
        height: 45px;
        width: 250px;
        text-align: center;
        position: absolute;
        top: 350px;
        left: 100px;
        border-color: transparent;
        float:left;
    }
    #index-btn-teachers:hover{
        border: solid 1px white;
    }
    #canvas{
        height:calc(100% - 65px);
        width: 100%;
        position:absolute !important;
        background: url('../assets/header.jpg') no-repeat center scroll;
        background-size:100% 100%;
    }
    .pc-purple {
    background-color: #ae90b0;
}

.pc-pink {
    background-color: #eca0be;
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
