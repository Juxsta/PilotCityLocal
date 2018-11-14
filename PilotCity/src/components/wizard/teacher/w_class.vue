<template>
    <div class="container container-fluid justify-content-center mt-5" >
<form class="mt-5">
    <div class="form-row mt-auto" v-for="period in Periods" :key="period.uid">
            <i class="material-icons font-weight-bold mr-2" id="delete_class" :class="{first_trash:Periods.indexOf(period)==0}" @click="rmThisClass(period.uid)">clear</i>
        <div class="form-group col-md-1">
            <label v-if="Periods.indexOf(period)==0">Period</label>
            <select class="custom-select"  v-model="period.Period" >
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
        <div class="form-group col-md-3">
            <label v-if="Periods.indexOf(period)==0">Course Name</label>
            <input type="text" class="form-control"  placeholder="Enter Course Name" @keypress.enter.prevent v-model="period.Coursename">
        </div>
        <div class="form-group col-md-2">
            <label v-if="Periods.indexOf(period)==0">Semester</label>
            <select class="custom-select" v-model="period.Semester" >
                <option selected>Select</option>
                <option value="0">Full Year</option>
                <option value="1">Fall</option>
                <option value="2">Spring</option>
            </select>
        </div>
        <div class="form-group col-md-3 dropdown">
            <label v-if="Periods.indexOf(period)==0">Grade</label>
            <div>
                <button class="btn btn-secondary dropdown-toggle align-items-end btn-block dropdown-class select-class-placeholder" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span :id="period.uid">Select</span>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <div class="checkbox dropdown-item checkbox-container" >
                        <input type="checkbox" value="9" v-model="period.Grade" @change="checkbox_changed($event, period.uid, period.Grade)"><label class="checkbox-label">Grade 9</label>
                    </div>
                    <div class="checkbox dropdown-item checkbox-container">
                        <input type="checkbox" value="10" v-model="period.Grade" @change="checkbox_changed($event, period.uid, period.Grade)"><label class="checkbox-label">Grade 10</label>
                    </div>
                    <div class="checkbox dropdown-item checkbox-container">
                        <input type="checkbox" value="11" v-model="period.Grade" @change="checkbox_changed($event, period.uid, period.Grade)"><label class="checkbox-label">Grade 11</label>
                    </div>
                    <div class="checkbox dropdown-item checkbox-container">
                        <input type="checkbox" value="12" v-model="period.Grade" @change="checkbox_changed($event, period.uid, period.Grade)"><label class="checkbox-label">Grade 12</label>
                    </div>
                </div>

            </div>
        </div>
        <div class="form-group col-md-2 ml-2">
            <label for="inputperiod" v-if="Periods.indexOf(period)==0"># of Students</label>
            <select class="custom-select" id="inlineFormCustomSelectPref" @change="variableSelect($event,period.Students)" >
                <option selected value=''>Select</option>
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
        <button id="btn-class-add" type="button" class="btn btn-primary btn-lg btn-block ml-4" @click="pushPeriod()">
            <i class="material-icons font-weight-bold add-button">add</i>
        </button>
        <!-- <button class="btn-lg" @click="view(Class)"></button> -->
    </div>
</template>

<script>

import { bus } from '../../../main'
import { Prompter } from '../../../main'
export default {
    name:'w_class',
    data () {
        return {
            Periods:[ {
                uid: (new Date()).getTime(),
                Period: null,
                Coursename: null,
                Semester : null,
                Grade: [],
                Students: {
                    min: null,
                    max: null
                }
            } ],
            pval: [],
            pool:[],
            selectpval: [],
        }
    },
    created(){
        var self = this;
        bus.$on('grab_data', obj =>{ 
            if (obj.step != 'teacher_class')
                return ;
            var pass = true;
            for (var i = 0; i < self.Periods.length; i++){
                for (var _attr in self.Periods[i]){
                    if (self.Periods[i][_attr] == null) {
                        pass = false;
                        break ;
                    }
                }
                if (pass === false)
                    break ;
            }
            if (pass === false){
                Prompter().failed("missing field(s)!");
                return ;
            }
            if (pass){
                var obj = {};
                obj['teacher_class'] = self.Periods;
                bus.$emit('form_completed', obj);
                bus.$emit('validated'); 
            }
        })
    },
     methods: {
        variableSelect(event, Obj) {
                switch(event.target.value){
                case '0': 
                    Obj.min=0
                    Obj.max=10
                    break
                case '1': 
                    Obj.min=11
                    Obj.max=15
                    break
                case '2': 
                    Obj.min=16
                    Obj.max=20
                    break
                case '3': 
                    Obj.min=21
                    Obj.max=25
                    break
                case '4': 
                    Obj.min=26
                    Obj.max=30
                    break
                case '5':
                    Obj.min=30
                    Obj.max=null  
                    break   
                }
        },
        pushPeriod() {
            this.Periods.push( {
                uid: this.Periods.length,
                Period: null,
                Coursename: null,
                Semester : null,
                Grade: [],
                Students: {
                    min: null,
                    max: null
                }
            });
        },
        view(Obj) {
            for (const prop in Obj) 
                console.log(prop)
        },
        checkbox_changed: function(e, id, arr){
            document.getElementById(id).innerText = 'Selected: ' + arr;
        },
        rmThisClass: function(uid)
        {
            this.Periods = this.Periods.filter((object) => {
                return object.uid != uid
            });
        },
        popVal: function(val,event) {
            this.pool[val] = false
        },
        selected: function(val) {
            return this.pval.indexOf(val) > -1 || this.selectpval.indexOf(val) > -1 
        }
    }
}
</script>


<style scoped>

#delete_class {
    cursor: pointer;
    color: lightgray;
    margin-top: 15px;
    font-size: 100%;
}
.first_trash {
    padding-top:31px;
}
label {
    color: #eca0be;
    font-weight: bold;
    font-size:15px;
    margin-left:15px;
}
input, input:focus, select, select:focus{
    border-radius: 50px;
    font-size: 18px;
    padding-left:20px;
    font-style: Italic;
    font-family: "Raleway";
    background-color: rgb(222, 223, 224);
    color: white;
    outline: none !important;
    font-weight:100;
    height: 50px;
    border-color: #dbdcde;
    box-shadow: none !important;
}

.dropdown-class, .dropdown-class:focus{
    border-radius: 50px;
    font-size: 18px;
    font-style: Italic;
    font-family: "Raleway";
    background-color: rgb(222, 223, 224) !important;
    color: white;
    outline: none !important;
    font-weight:100;
    height: 50px;
    border-color: #dbdcde;
    box-shadow: none !important;
}
 input:focus, select:focus, .dropdown-class:focus{
    border-color: #c6c8ca !important;
 }
input::placeholder { 
    color:white;

    }

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
    border: dashed 1px #dbdcde;
    background: white;
    color: #eca0be;
    border-radius: 50px;
    height:50px;
    width:1025px;
 }

  #btn-class-add:hover{
    border: solid 1px #dbdcde;
  }
#btn-class-add:focus{
    border: dashed 1px #dbdcde;
    background:white;
    color: white;
    border-radius: 50px;
}

.add-button{
    margin-top:4px;
    color: #eca0be;
}

.select-class-placeholder {
    font-size:18px;
    text-align:left;
    padding-left:20px;
}
.custom-select {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='white' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E")
}

</style>
 