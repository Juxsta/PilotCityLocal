<template>
    <div class= "container-fluid" id="canvas">
        <div class="d-flex flex-row">
        <h2 id = "title">Connecting classrooms to the big bad world. </h2>
        </div> 
        <div class="d-flex flex-row">
            <button type="button" class="btn btn-primary" id="index-btn-employers"> For Employers </button>
            <button type="button" class="btn btn-primary" id="index-btn-teachers" > For Teachers </button>
        </div>
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
        font-family: "Raleway";
        font-weight: 700;
        color: white;
        top:250px;
        left: 100px;
        font-size: 55px;

    }
    #index-btn-employers{
        font-family: "Raleway";
        font-size: 20px;
        background-color: #eca0be;
        color: white;
        font-weight: 700;
        border-radius: 50px;
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
        font-family: "Raleway";
        font-size: 20px;
        font-weight: 700;
        background-color: #ae90b0;
        stroke: #ae90b0;
        color: white;
        border-radius: 50px;
        height: 45px;
        width: 250px;
        text-align: center;
        position: absolute;
        top: 350px;
        left: 100px;
        border-color: transparent;
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
    
</style>
