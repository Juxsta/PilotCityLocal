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
        text-transform: capitalize;
        position: absolute;
        font-family: Raleway;
        font-weight: 600;
        color: white;
        top:250px;
        left: 100px;
        font-size: 60px;

    }
    #index-btn-employers{
        font-family: Raleway;
        font-size: 23px;
        background-color: #eca0be;
        color: white;
        font-weight: 700;
        border-radius: 20px;
        height: 50px;
        width: 270px;
        text-align: center;
        position: absolute;
        top: 400px;
        left: 400px;
        padding: 10px;
        border-color: transparent;
    }
    
    #index-btn-employers:hover{
        border: solid 2px white;
    }
    #index-btn-teachers{
        font-family: Raleway;
        font-size: 23px;
        font-weight: 700;
        background-color: #ae90b0;
        stroke: #ae90b0;
        color: white;
        border-radius: 20px;
        height: 50px;
        width: 270px;
        text-align: center;
        position: absolute;
        top: 400px;
        left: 100px;
        border-color: transparent;
    }
    #index-btn-teachers:hover{
        border: solid 2px white;
    }
    #canvas{
        height:calc(100% - 86px);
        width: 100%;
        position:absolute !important;
        background: url('../assets/header.jpg') no-repeat center scroll;
        background-size:100% 100%;
    }
</style>
