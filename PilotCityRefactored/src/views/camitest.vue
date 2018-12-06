<template>
<div class = "d-flex flex-column  mt-5">
    <div class="d-flex justify-content-center mr-auto ml-5 mt-5">
        <p class = "curriculum">
        Enter the curriculum you teach for each course
        </p>
    </div>
    <div class = "d-flex flex-row justify-content-center mt-5" v-for="(course,index) in coursenames" :key=index>
        <span class="curriculum_input col-3 mr-5"><p class="mt-1" @click="changeClass(course)">{{course}}</p></span>
        <span class="curriculum_input col-3 mr-5"><p class ="mt-1">World </p></span>
    </div>

</div>
</template>

<script>
export default {
    name: "camitest",
    data () {
        return {
            coursenames:['Stuff','More stuff', 'AP Stuff'],
        }
    },
    methods: {
        changeClass(course) {
            this.coursenames.splice(0,1)
        }
    },
    created() {
        
    }
}
</script>

<style>

    .curriculum_input{
       font-size: 1.5em;
       font-family: railway;
       font-style: bold;
       border-radius: 50px;
       color: 	#696969;
       width: 12em;
       height: 2em;
       border: 2px dotted grey;
       
       
    }
  

</style>

