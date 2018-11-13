<template>
    <div class="container container-fluid justify-content-center mt-5" >
        <!-- 
        <form v-for="(value,index) in Periods" :key="index">
            <div class="form-row">
                <div class="form-group col-md-1">
                    <label>Period</label>
                    <select class="custom-select"  v-model="Periods[index].Period">
                        <option selected>Select Period</option>
                        <option value="7">P0</option>
                        <option value="1">P1</option>
                        <option value="2">P2</option>
                        <option value="3">P3</option>
                        <option value="4">P4</option>
                        <option value="5">P5</option>
                        <option value="6">P6</option>
                        <option value="7">P7</option>
                    </select>
                </div>
                <div class="form-group col-md-4">
                    <label>Coursename</label>
                    <input type="text" class="form-control"  placeholder="Computer Science AP" v-model="Periods[index].Course">
                </div>
                <div class="form-group col-md-2">
                    <label>Semester</label>
                    <select class="custom-select" v-model="Periods[index].Semester">
                        <option selected>Select Semester</option>
                        <option value="Yearlong">Yearlong</option>
                        <option value="Fall">Fall</option>
                        <option value="Spring">Spring</option>
                    </select>
                </div>
                <div class="form-group col-md-2 dropdown">
                    <label>Grade</label>
                    <button class="btn btn-secondary dropdown-toggle align-items-end" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown button
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <div class="checkbox dropdown-item">
                                <input type="checkbox" value='9' v-model="Periods[index].Grade">9
                        </div>
                        <div class="checkbox dropdown-item">
                                <input type="checkbox" value='10' v-model="Periods[index].Grade">10
                        </div>
                        <div class="checkbox dropdown-item">
                                <input type="checkbox" value='11' v-model="Periods[index].Grade">11
                        </div>
                        <div class="checkbox dropdown-item">
                                <input type="checkbox" value='12' v-model="Periods[index].Grade">12
                        </div>
                 </div>
                </div>
                <div class="form-group col-md-2 ml-2">
                    <label for="inputperiod"># Students</label>
                    <select class="custom-select" @change="variableSelect($event,Period[index])" >
                        <option selected value=''>Select #Students</option>
                        <option value="0">1-10</option>
                        <option value="1">11-15</option>
                        <option value="2">16-20</option>
                        <option value="3">21-25</option>
                        <option value="4">26-30</option>
                        <option value="5">30+</option>
                    </select>
                </div>
            </div>
        </form> -->
        <form>
            <div class="form-row">
                <div class="form-group col-md-1">
                    <label>Period</label>
                    <select class="custom-select"  v-model="Class.Period">
                        <option selected>Select Period</option>
                        <option value="0">P0</option>
                        <option value="1">P1</option>
                        <option value="2">P2</option>
                        <option value="3">P3</option>
                        <option value="4">P4</option>
                        <option value="5">P5</option>
                        <option value="6">P6</option>
                        <option value="7">P7</option>
                    </select>
                </div>
                <div class="form-group col-md-4">
                    <label>Coursename</label>
                    <input type="text" class="form-control"  placeholder="Computer Science AP" v-model="Class.Course">
                </div>
                <div class="form-group col-md-2">
                    <label>Semester</label>
                    <select class="custom-select" >
                        <option selected>Select Semester</option>
                        <option value="1">Yearlong</option>
                        <option value="1">Fall</option>
                        <option value="2">Spring</option>
                    </select>
                </div>
                <div class="form-group col-md-2 dropdown">
                    <label>Grade</label>
                    <button id="dropdown-class" class="btn btn-secondary dropdown-toggle align-items-end" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Select Class
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <div class="checkbox dropdown-item checkbox-container">
                            <input type="checkbox" value="9" v-model="Class.Grade"><label class="checkbox-label">9</label>
                        </div>
                        <div class="checkbox dropdown-item checkbox-container">
                            <input type="checkbox" value="10" v-model="Class.Grade"><label class="checkbox-label">10</label>
                        </div>
                        <div class="checkbox dropdown-item checkbox-container">
                            <input type="checkbox" value="11" v-model="Class.Grade"><label class="checkbox-label">11</label>
                        </div>
                        <div class="checkbox dropdown-item checkbox-container">
                            <input type="checkbox" value="12" v-model="Class.Grade"><label class="checkbox-label">12</label>
                        </div>
                </div>
                </div>
                <div class="form-group col-md-2 ml-2">
                    <label for="inputperiod"># Students</label>
                    <select class="custom-select" id="inlineFormCustomSelectPref" @change="variableSelect($event,Class.Students)" >
                        <option selected value=''>Select #Students</option>
                        <option value="0">1-10</option>
                        <option value="1">11-15</option>
                        <option value="2">16-20</option>
                        <option value="3">21-25</option>
                        <option value="4">26-30</option>
                        <option value="5">30+</option>
                    </select>
                </div>
            </div>
        </form>
        <button id="btn-class-add" type="button" class="btn btn-primary btn-lg btn-block" @click="pushPeriod()">
            <i class="material-icons font-weight-bold"><h2>add</h2></i>
        </button>
        <button class="btn-lg" @click="view(Class)"></button>
    </div>
</template>

<script>
export default {
    name:'w_class',
    data () {
        return {
            Periods:[],
            Class: {
                Period: null,
                Coursename: null,
                Semester : null,
                Grade: [],
                Students: {
                    min: null,
                    max: null
                }
            }
        }
    },
    methods: {
        variableSelect(event,Obj) {
                switch(event.target.value){
                case '0': 
                    this.Obj.min=0
                    this.Obj.max=10
                    break
                case '1': 
                    this.Obj.min=11
                    this.Obj.max=15
                    break
                case '2': 
                    this.Objs.min=16
                    this.Obj.max=20
                    break
                case '3': 
                    this.Obj.min=21
                    this.Obj.max=25
                    break
                case '4': 
                    this.Obj.min=26
                    this.Obj.max=30
                    break
                case '5':
                    this.Obj.min=30
                    this.Obj.max=null  
                    break   
                }
        },
        pushPeriod() {
            this.Periods.push(this.Class)

        },
        view(Obj) {
            for (const prop in Obj) 
                console.log(prop)
        }  
    }
}
</script>


<style scoped>
label {
    color: #eca0be;
    font-weight: bold;
}
input, input:focus, select, select:focus{
    border-radius: 50px;
    font-size: 20px;
    font-style: Italic;
    font-family: "Raleway";
    background-color: rgb(222, 223, 224);
    color: white;
    outline: none !important;
    font-weight:100;
    height: 50px;
}
#dropdown-class{
    border-radius: 10px;
    font-size: 20px;
    font-style: Italic;
    font-family: "Raleway";
    background-color: rgb(222, 223, 224);
    color: white;
    outline: none !important;
    font-weight:100;
    height: 50px;
    border-color: rgb(222, 223, 224);
}
input::placeholder { color:white }

 .dropdown-item{
    cursor: pointer;
 }

 input[type="checkbox"]{
    height: 25px;
 }
 .checkbox-label{
    padding-left: 10px;
 }
 #btn-class-add{
    border: dotted 1px #eca0be;
    background: white;
    color: #eca0be;
    border-radius: 50px;
 }
#btn-class-add:focus{
    border: dotted 1px #eca0be;
    background:#eca0be;
    color: white;
    border-radius: 50px;
}
</style>
 