<template>
    <div class="container-fluid mt-5">
        <div class="d-flex justify-content-center" id="Sector-Prompt">
            <h1 class="Raleway class-picker-label">What sector are you coming from?</h1>
        </div>
        <div class="d-flex justify-content-center align-items-end" >
                <button class="btn btn-circle" 
                v-for="(sector,index) in sector_types" :key="index"
                :class="colors[index]" @click="changeSector(index)">{{sector_types[index]}}</button>
        </div>
    </div>
</template>

<script>
import { bus } from '../../../main'
import { Prompter } from '../../../main'
export default {
    name: "w_sector",
    data () {
        return {
            sector: "null",
            sector_types: ["Industry", "Government", "Education", "Community"],
            colors:["pc-green","pc-blue","pc-orange","pc-yellow"]
        }
    },
    methods: {
        changeSector (index) {
            this.sector = this.sector_types[index]
        }
    },
    created(){
        var self = this;
        console.log('sector')
        bus.$on('grab_data', function(obj){
            if (obj.step != 'employer_sector')
                return ;
            if (self.sector){
                console.log('obj')
                var obj = {};
                obj['employer_sector'] = {
                    sector: self.sector
                }
                bus.$emit('form_completed', obj);
                bus.$emit('validated');
                console.log('validated')
                return ;
            }
            else
                Prompter().failed("You're missing a few things","Hey there,");
        });
    }
}
</script>

<style scoped>

.btn-circle {
    width:250px;
    height:250px;
    border-radius: 250px;
    margin: auto 15px;
    padding: 35px 35px 35px 35px;
    font-family: 'Raleway';
    font-weight:700 !important;
    font-size: 30px;
    color: #ffffff;
    border: 0px;
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
