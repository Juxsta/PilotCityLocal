<template>
    <div class= "container-fluid" id="canvas">
        <div class= "row h-100 justify-content-center align-items-center">
            <div class="class d-flex col-12 mt-5">
                <h2 id = "title">Connecting classrooms to the big bad world. </h2>
            </div>
            <div class="class d-flex flex-row mb-auto mr-auto ml-5">
                <button type="button" class="btn btn-primary mr-4" id="index-btn-employers"> <router-link to="/demo"> For Employers </router-link> </button>
                <button type="button" class="btn btn-primary" id="index-btn-teachers" > <router-link to="/demo"> For Teachers </router-link> </button>
            </div>
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
        font-family: "Raleway";
        font-weight: 700;
        color: white;
        font-size: 8vh;

    }
    #index-btn-employers{
        font-family: "Raleway";
        font-size: 20px;
        background-color: #eca0be;
        color: #ffffff;
        font-weight: 700;
        border-radius: 50px;
        height: 45px;
        width: 250px;
        text-align: center;
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
        color: #ffffff;
        border-radius: 50px;
        height: 45px;
        width: 250px;
        text-align: center;
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
        background: url('../assets/header.jpg') no-repeat;
        background-size:cover;
    }
  
</style>
