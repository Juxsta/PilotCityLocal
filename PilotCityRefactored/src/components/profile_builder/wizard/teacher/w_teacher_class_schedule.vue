<template>
    <div class="container container-fluid justify-content-center mr-auto ml-auto" >
        <form class="mt-5">
            <div class="form-row mt-auto" v-for="(period,index) in Periods" :key="period.uid+index">
                <i class="material-icons font-weight-bold mr-2" id="delete_class" 
                :class="{first_trash:Periods.indexOf(period)==0}" 
                @click="rmThisClass(period.uid)">clear</i>
            <div class="form-group-period">
                <label v-if="Periods.indexOf(period)==0" >Period</label>
                <select class="custom-select"  v-model="period.period">
                    <option selected>Select Period</option>
                    <option v-if="pool[0].status" value="0">P0</option> 
                    <option v-if="pool[1].status" value="1">P1</option> 
                    <option v-if="pool[2].status" value="2">P2</option> 
                    <option v-if="pool[3].status" value="3">P3</option> 
                    <option v-if="pool[4].status" value="4">P4</option> 
                    <option v-if="pool[5].status" value="5">P5</option> 
                    <option v-if="pool[6].status" value="6">P6</option> 
                    <option v-if="pool[7].status" value="7">P7</option> 
                </select>
            </div>
            <div class="form-group-days">
                <label v-if="Periods.indexOf(period)==0">Days</label>
            <div>
                <button class="btn btn-secondary dropdown-toggle align-items-end btn-block dropdown-class select-class-placeholder" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span :id="period.uid">Select</span>
                </button>
                <div class="dropdown-menu mr-auto ml-auto" aria-labelledby="dropdownMenuButton">
                    <div class="checkbox dropdown-item checkbox-container mr-auto ml-auto" >
                        <input type="checkbox" value="M" v-model="period.days" @change="checkbox_changed($event, period.uid, period.days)"><label class="checkbox-label">Monday</label>
                    </div>
                    <div class="checkbox dropdown-item checkbox-container mr-auto ml-auto">
                        <input type="checkbox" value="T" v-model="period.days" @change="checkbox_changed($event, period.uid, period.days)"><label class="checkbox-label">Tuesday</label>
                    </div>
                    <div class="checkbox dropdown-item checkbox-container mr-auto ml-auto">
                        <input type="checkbox" value="W" v-model="period.days" @change="checkbox_changed($event, period.uid, period.days)"><label class="checkbox-label">Wednesday</label>
                    </div>
                    <div class="checkbox dropdown-item checkbox-container mr-auto ml-auto">
                        <input type="checkbox" value="Th" v-model="period.days" @change="checkbox_changed($event, period.uid, period.days)"><label class="checkbox-label">Thursday</label>
                    </div>
                    <div class="checkbox dropdown-item checkbox-container mr-auto ml-auto">
                        <input type="checkbox" value="F" v-model="period.days" @change="checkbox_changed($event, period.uid, period.days)"><label class="checkbox-label">Friday</label>
                    </div>
                </div>

            </div>
        </div>
        <div class="form-group-starttime">
            <label v-if="Periods.indexOf(period)==0">Start Time</label>
            <input type="time" class="form-control"   v-model="period.start_time">
        </div>
        <div class="form-group-endtime dropdown">
            <label v-if="Periods.indexOf(period)==0">End Time</label>
            <input type="time" class="form-control"   v-model="period.end_time">
            <div>

            </div>
        </div>
    </div>
</form>
        <button id="btn-class-add" type="button" class="btn btn-primary btn-lg btn-block" @click="pushPeriod()">
            <i class="material-icons font-weight-bold add-button">add</i>
        </button>
        <!-- <button class="btn-lg" @click="view(Class)"></button> -->
        <next_button
            route='w_teacher_industry_keywords'
            :conditions="teacher_data"
            :collection= collection
            :pass = pass
            :errormsg= "errormsg"
            />
    </div>
</template>

<script>

import { bus } from '@/main'
import firebase from '@/firebase/init'
import { Prompter } from '@/main'
import button from '@/components/profile_builder/wizard/components/button'
export default {
    name:'w_teacher_class_schedule',
    data () {
        return {
            Periods:[ {
                uid: (new Date()).getTime(),
                period: null,
                days: [],
                start_time: null,
                end_time:null
            } ],
            pval: [0,1,2,3,4,5,6,7],
            selectpval: [],
            pool: [
                {status:true},
                {status:true},
                {status:true}, 
                {status:true},
                {status:true},
                {status:true},
                {status:true},
                {status:true}
            ],
            errormsg:null,
            collection: ["teachers"],
            db_classes:[]
        }
    },
    components: {
        next_button:button
    },
    computed: {
        filled() {
            let Periods = this.Periods
            let arr = []
            return Periods.every((period) => {
                return Object.values(period).every((field) => {
                    return field != null
                })
            })
        },
        schedules() {
            var self = this
            let schedule = {}
            var arr = []
            for (let period = 0; period < self.Periods.length; period++) {
                /* return self.Periods[period].days[0] */
                for(let i=0;i<self.Periods[period].days.length;i++){
                    schedule[self.Periods[period].days[i]]={
                        start_time:self.Periods[period].start_time,
                        end_time:self.Periods[period].end_time
                    }
                }
                arr.push({'Period':self.Periods[period].period, schedule})
                schedule = {}
            }
            return arr
        },
        merged_schedules() {
           let merged = []
            for(let i in this.schedules) {
                for(let j=1;j < this.schedules.length; j++) {
                    if(i!=j && this.schedules[i].Period==this.schedules[j].Period) {
                        if( Object.keys(this.schedules[i].schedule).every((prop1)=> {
                            return Object.keys(this.schedules[j].schedule).every((prop2) => {
                                return prop1 != prop2
                            })
                        })) {
                            let obj = {}
                            let new_schedule = {}
                            obj.Period= this.schedules[i].Period
                            new_schedule = Object.assign(this.schedules[i].schedule,this.schedules[j].schedule)
                            obj.schedule = new_schedule
                            merged.push(obj)
                            this.errormsg=null
                        }
                        else {
                            this.errormsg="Conflicting Period Schedules"
                            break
                        }
                    }
                }
                if(merged.every((obj) => {
                    return obj.Period != this.schedules[i].Period
                })) {
                    merged.push(this.schedules[i])
                }
            }
            return merged
        },
        pass () {
            return (this.filled && (!this.errormsg))
        },
        format_schedule () {
            var arr = []
            var obj = {}
            obj["classes"]= []
            var schedules = this.merged_schedules
            for(let schedule in schedules) {
                var class_obj= this.Periods.filter((period) => {
                    return period.period==schedules[schedule].Period
                })
                let index = class_obj[0].index
                arr[index]=schedules[schedule]
            }
            return arr
        },
        teacher_data() {
            var classes = this.db_classes
            for(let item in classes){
                for(let schedule in this.format_schedule){
                    if(classes[item].period == this.format_schedule[schedule].period){
                        classes[item]['schedule'] = this.format_schedule[schedule].schedule
                    }
                }
            }
            return [{classes}]
        }
    },
    created() {
        var self = this
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                var new_periods =[]
                const db = firebase.firestore()
                db.collection("teachers").doc(user.uid).get().then((doc) => {
                    let obj = doc.data()
                    for (let field in obj.classes) {
                        let new_period = { 
                        uid: null,
                        period: null,
                        days: [],
                        start_time: null,
                        end_time:null
                        }
                        new_period.period = obj.classes[field].Period
                        new_period.uid = obj.classes[field].uid
                        new_period.index=obj.classes.indexOf(obj.classes[field])
                        new_periods.push(new_period)
                    }
                    this.db_classes = obj.classes
                })
                self.Periods=new_periods
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
                uid: (new Date()).getTime(),
                period: null,
                days: [],
                start_time: null,
                end_time:null
            });
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
        },
    },

}
</script>


<style scoped>

#delete_class {
    cursor: pointer;
    color: lightgray;
    margin-top: 22px;
    font-size: 100%;
    margin-left:42px;
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
    width:682px;
    margin-left:220px;
    margin-top:10px;

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

.form-row {
    margin-left:150px;
    margin-right:125px;
}

.form-group-period {
    width:100px;
    margin:5px;
}

.form-group-days {
    width:250px;
    margin:5px;
}

.form-group-starttime {
    width:150px;
    margin:5px;
}

.form-group-endtime {
    width:150px;
    margin:5px;
}


</style>