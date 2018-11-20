<template>
    <div class= "container-fluid " id="canvas">
        <div class= "justify-content-left align-items-center">
            <div class="class d-flex col-12 mt-5">
                <h2 id = "title">Connecting classrooms to the big bad world. </h2>
            </div>
            <div class="class d-flex flex-row mb-auto mr-auto ml-5">
                <button type="button" class="btn btn-primary mr-4" id="index-btn-teachers" @click="open_modal">  For Teachers </button>
                <button type="button" class="btn btn-primary" id="index-btn-employers" @click="open_modal">  For Employers </button>
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
    },
    methods:{
    
    }
}
</script>
<style>
    #title{
        font-family: "Raleway";
        font-weight: 700;
        color: white;
        font-size: 7vh;
        margin-left:30px;
        margin-top:190px;
        margin-bottom:40px;
    }
    #index-btn-teachers{
        font-family: "Raleway";
        font-size: 20px;
        background-color: #eca0be;
        color: #ffffff;
        font-weight: 700;
        border-radius: 50px;
        height: 45px;
        width: 250px;
        text-align: center;
        border-color: transparent;
        padding-left:30px;
        padding-right:30px;
    }
    
    #index-btn-employers:hover{
        border: solid 1px white;
    }
#index-btn-employers {
        font-family: "Raleway";
        font-size: 20px;
        font-weight: 700;
        background-color: #ae90b0;
        stroke: #ae90b0;
        color: #ffffff;
        border-radius: 50px;
        height: 45px;
        width: 250px;
        padding-left:30px;
        padding-right:30px;
        text-align: center;
        border-color: transparent;
    }
    #index-btn-teachers:hover{
        border: solid 1px white;
    }
    #canvas{
        height:calc(100% - 65px);
        width: 100%;
        position: absolute !important;
    
        background-size:cover;
    }
  
</style>
