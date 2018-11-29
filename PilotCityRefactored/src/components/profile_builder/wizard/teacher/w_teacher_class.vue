<template>
    <div class="container container-fluid justify-content-center mt-5" >
<form class="mt-5">
    <div class="form-row mt-auto" v-for="period in data.classes" :key="period.uid">
            <i class="material-icons font-weight-bold mr-2" id="delete_class" :class="{first_trash:data.classes.indexOf(period)==0}" @click="rmThisClass(period.uid)">clear</i>
        <div class="form-group col-md-1">
            <label v-if="data.classes.indexOf(period)==0">Period</label>
            <select class="custom-select" id="dropdown_period" 
             v-model="period.Period" 
             @change="periodChange(period)">
                <option selected v-if="!period.Period">Select Period</option>
                <option :id=period.uid v-if="period.Period" :value="period.Period">{{'P' + period.Period}}</option>
                <option v-for="(val,index) in pool" :key="period.uid + index" 
                :value="val.toString()">{{'P' + val}}</option> 
            </select>
        </div>
        <div class="form-group col-md-3">
            <label v-if="data.classes.indexOf(period)==0">Course Name</label>
            <input type="text" class="form-control"  placeholder="Enter Course Name" @keypress.enter.prevent v-model="period.coursename">
        </div>
        <div class="form-group col-md-2">
            <label v-if="data.classes.indexOf(period)==0">Semester</label>
            <select class="custom-select" v-model="period.semester" @change='changeYear(period)'>
                <option selected>Select</option>
                <option value="Full Year">Full Year</option>
                <option value="Fall">Fall</option>
                <option value="Spring">Spring</option>
            </select>
        </div>
        <div class="form-group col-md-3 dropdown">
            <label v-if="data.classes.indexOf(period)==0">Grade</label>
            <div>
                <button class="btn btn-secondary dropdown-toggle align-items-end btn-block dropdown-class select-class-placeholder" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span v-if="!period.Grade.length">Selected</span>
                    <span v-if="period.Grade.length">
                        <span>Selected:</span>
                        <span v-for="(grade,index) in period.Grade" :key=index>{{grade}}
                            <span v-if="period.Grade.indexOf(grade) != period.Grade.length-1">,</span>
                        </span>
                    </span>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <div class="checkbox dropdown-item checkbox-container" >
                        <input type="checkbox" value="9" v-model="period.Grade" ><label class="checkbox-label">Grade 9</label>
                    </div>
                    <div class="checkbox dropdown-item checkbox-container">
                        <input type="checkbox" value="10" v-model="period.Grade" ><label class="checkbox-label">Grade 10</label>
                    </div>
                    <div class="checkbox dropdown-item checkbox-container">
                        <input type="checkbox" value="11" v-model="period.Grade" ><label class="checkbox-label">Grade 11</label>
                    </div>
                    <div class="checkbox dropdown-item checkbox-container">
                        <input type="checkbox" value="12" v-model="period.Grade" ><label class="checkbox-label">Grade 12</label>
                    </div>
                </div>

            </div>
        </div>
        <div class="form-group col-md-2 ml-1">
            <label for="inputperiod" v-if="data.classes.indexOf(period)==0">Class Size</label>
            <select class="custom-select" id="inlineFormCustomSelectPref" @change="variableSelect($event,period.students)" >
                <option selected value='' v-if="period.students.min==null">Select</option>
                <option selected value='' v-if="period.students.min">{{period.students.min+'-'+period.students.max+' Students'}}</option>
                <option value="0">1-10 Students</option>
                <option value="1">11-15 Students</option>
                <option value="2">16-20 Students</option>
                <option value="3">21-25 Students</option>
                <option value="4">26-30 Students</option>
                <option value="5">30+ Students</option>
            </select>
        </div>
    </div>
</form>
        <button id="btn-class-add" type="button" class="btn btn-primary btn-lg btn-block ml-4" @click="pushPeriod()">
            <i class="material-icons font-weight-bold add-button">add</i>
        </button>
        <!-- <button class="btn-lg" @click="view(Class)"></button> -->
        <next_button @click="parseData()"
            route='w_teacher_class_schedule'
            :conditions="conditions"
            :collection="collection"
            :pass = filled
            :force_pass = filled
            />
    </div>
</template>

<script>

import { bus } from '@/main'
import { Prompter } from '@/main'
import firebase from '@/firebase/init'
import button from '@/components/profile_builder/wizard/components/button.vue'
import merge from 'deepmerge'
export default {
    name:'w_teacher_class',
    data () {
        return {
            data: {
                classes:[ {
                uid: null,
                Period: null,
                coursename: null,
                semester : null,
                Grade: [],
                students: {
                    min: null,
                    max: null
                },
                school_year:{
                    start: null,
                    end: null
                }
            } 
        ] },
        collection: ['teachers'],
        }
    },
    components: {
        next_button:button
    },
    computed: {
        calcUid() {
            var self = this
            firebase.auth().onAuthStateChanged((user) => {
                if(user) {
                    var classes = self.data.classes
                    for(let clas in classes) {
                        classes[clas].uid = user.uid + (new Date()).getTime()
                    }
                }
            })
        },
        conditions () {
            return [this.data]
        },
        filled() {
            var self = this.data;
            var pass = true;
            for (var i = 0; i < self.classes.length; i++){
                for (var _attr in self.classes[i]){
                    if (self.classes[i][_attr] == null || !self.classes[i].Grade.length) {
                        pass = false;
                        break ;
                    }
                }
                if (pass === false)
                    break ;
            }
            if (pass === false){
                return false
            }
            if (pass){
                return true
            }
        },
        pool() {
            let used_periods=[]
            let values=['0','1','2','3','4','5','6','7']
            var self = this.data;
             for (var i = 0; i < self.classes.length; i++){
                used_periods.push(self.classes[i].Period)
             }
             return values.filter((values) => {
                 return used_periods.indexOf(values) == -1
             })
        }
    },
    created () {
        var self = this
        //create an array reference to user and teacher data
        let classes = []
        const deepmerge = require('deepmerge')
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                const db = firebase.firestore()
                for(let i = 0;i<self.collection.length;i++)
                db.collection(self.collection[i]).doc(user.uid).get().then((doc) => {
                    let obj = doc.data()
                    //loop through each class in database classes
                    for (let dbclass of obj['classes']){
                        let new_obj = {
                                    uid: null,
                                    Period: null,
                                    coursename: null,
                                    semester : null,
                                    Grade: [],
                                    students: {
                                        min: null,
                                        max: null
                                    },
                                    school_year:{
                                        start: null,
                                        end: null
                                    }
                                }
                        //loop through each field of those classes
                        for(let field in dbclass) {
                            if(new_obj.hasOwnProperty(field)) {
                                new_obj[field] = dbclass[field]
                            }
                        }
                        classes.push(new_obj)
                    }
                })
                self.data.classes = classes
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
        periodChange(period) {
            let id = '._'+period.uid
            $(id).val(period.Period)
        },
        pushPeriod() {
            this.data.classes.push( {
                uid: null,
                Period: null,
                coursename: null,
                semester : null,
                Grade: [],
                students: {
                    min: null,
                    max: null
                },
                school_year:{
                    start: null,
                    end: null
                }
            });
        },
        rmThisClass: function(uid)
        {
            this.data.classes = this.data.classes.filter((object) => {
                return object.uid != uid
            });
        },
        changeYear(period) {
            if(period.semester == 'Fall' || period.semester == 'Spring') {
                period.school_year.start = (new Date()).getFullYear()
                period.school_year.end = (new Date()).getFullYear()
            }
            else if (period.semester == 'Full Year' ){
                period.school_year.start = (new Date()).getFullYear()
                period.school_year.end = (new Date()).getFullYear() + 1
            }
        } 
    },
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
    font-weight:300;
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
    font-weight:300;
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
 