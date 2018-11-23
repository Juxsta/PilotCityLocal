<template>
<div>
<h3 class="pc-keyword-title">Please enter the curriculum you are teaching</h3>

<div class="form-group col-md-5">

    <input   v-for="course in courses" 
    		type="text" 
    		class="form-control pc-input-box"  
    		:placeholder="course.courseTitle"
    		@keypress.enter.prevent="addCurriculum(course.thisCourseCurriculum,course.courseCurriculumArr)" v-model="course.thisCourseCurriculum">

</div>
</div>

</template>

<script>

import { bus } from '../../../main'

export default{

	name: "w_curriculum",

    data () {

    	return{

    		 
    		courses:[

		    			{
		    				courseTitle:"Computer Science A",
		    				courseCurriculumArr:[],
		    				thisCourseCurriculum: null

		    			} ,
		    			{
		    				courseTitle:"Engineering Principles",
		    				courseCurriculumArr:[],
		    				thisCourseCurriculum: null
		    			},
		    			{
		    				courseTitle:"Intro to Programming",
		    				courseCurriculumArr:[],
		    				thisCourseCurriculum: null
		    			}

    			],

    		curriculumAdded:[],
    		colors: ['pc-green', 'pc-blue', 'pc-yellow', 'pc-orange', 'pc-pink', 'pc-purple','pc-red']

    	}

    }, 
    methods:{
    	 notFound(item,array) {
            return array.indexOf(item)==-1?1:0
        },

    	addCurriculum(item, array){
    		 
    			console.log(item)
    		 	array.push(item)
    		 	console.log("adding " + item)
    		 

 

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