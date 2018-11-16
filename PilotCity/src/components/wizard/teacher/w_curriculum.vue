<template>
<div>
<h3 class="pc-keyword-title">Please enter the curriculum you are teaching</h3>

<div class="form-group col-md-5">

    <input   v-for="course in courses" 
    		type="text" 
    		class="form-control pc-input-box"  
    		:placeholder="course"
    		@keypress.enter.prevent="addCurriculum(curriculum,curriculumAdded)" v-model="curriculum">

</div>
</div>

</template>

<script>

import { bus } from '../../../main'

export default{

	name: "w_curriculum",

    data () {

    	return{

    		curriculum: null,
    		courses:["Computer Science" , "Engineering Principles", "Intro to Programming"],
    		curriculumAdded:[],
    		colors: ['pc-green', 'pc-blue', 'pc-yellow', 'pc-orange', 'pc-pink', 'pc-purple','pc-red']

    	}

    }, 
    methods:{

    	addCurriculum(item, array){
    		if(this.notFound(item,this.curriculumAdded)) {
    			
    		 	this.array.push(item)
    		}
    		 this.curriculum = null

    	}

    },
    computed:{


    }
}


</script>

<style scoped>
	
.pc-input-box {
    border:solid 1px #f1f1f1;
    font-family: "Raleway";
    border-radius:25px;
    margin-top:20px;
    color:#dbdcde;
    font-style: italic;
    font-size:20px;
    padding-left:30px;
    width:550px;
}

.pc-input-box::placeholder{
    color:#dbdcde;
    font-weight:300;
}

.pc-keyword-title {
    font-family: Raleway;
    font-size:20px;
    font-weight: 700;
    color:#eca0be;
    padding-top:9px;
    margin-left:30px;
     
}

</style>