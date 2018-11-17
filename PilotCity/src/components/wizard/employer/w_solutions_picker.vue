<template>
    <div class="container-fluid mt-5">
        <div class="d-flex justify-content-center">
            <h1 class="Raleway solutions-picker-label">Do you have a product and/or service?</h1>
        </div>
        <div class="d-flex justify-content-center mt-5">
                <button class="btn button-square solutions-picker-btn color-blue" 
                data-toggle="buttons" 
                @click="isProduct = !isProduct"
                :class="{border_gray:isProduct}">Product</button>
                <button class="btn button-square solutions-picker-btn color-yellow" data-toggle="buttons"
                 @click="isService = !isService"
                 :class="{border_gray:isService}">Service</button>
        </div>
    </div>
</template>

<script>
import { bus } from '../../../main'
import { Prompter } from '../../../main'

export default {
    name:'w_solutions_picker',
    data () {
        return {
            isProduct:false,
            isService:false
        }
    },
    methods: {

    },
    created(){
    var self = this;
    console.log(self.isProduct || self.isService)  
    bus.$on('grab_data', function(obj){
        if (obj.step != 'employer_solution_type')
            return ;
        if (self.isProduct || self.isService){
            var obj = {};
            obj['employer_solution_type'] = {
                isProduct: self.isProduct,
                isService: self.isService
            }
            bus.$emit('solution_type',[self.isProduct,self.isService])
            bus.$emit('form_completed', obj);
            bus.$emit('validated');
            return;
        }
        else{
            Prompter().failed("You're missing a few things","Hey there,");
        }
    });
}
}
</script>

<style scoped>
.border_gray {
    border: solid 5px lightgray !important;
}
.button-regular {
    background-color:#6eba7f;
    width:250px;
    height:96px;
    border-radius: 50px;
    margin: auto 20px;
}

.button-square {
    background-color:#6eba7f;
    width:250px;
    height:250px;
    border-radius: 50px;
}

.solutions-picker-btn {
    margin: auto 20px;
    color: white;
    font-size: 30px;
    font-weight: 700;
}

.color-pink{
    background-color: rgb(226, 165, 190);
}

.color-purple{
    background-color: rgb(169, 145, 174);
}

.color-blue{
    background-color:#3c9ccc;
}

.color-yellow{
    background-color:#fdd25a;
}

.solutions-picker-label{
    color: rgb(222, 223, 224);
    font-style: italic;
    font-weight: 700;
    font-size: 30px;
}
.solutions-picker-btn:active{
    transition: all 0.5s;
    border-color: rgb(222, 223, 224) !important;
    outline: none !important;
}

</style>
