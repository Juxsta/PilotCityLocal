<template>
    <div class="container-fluid justify-content-center mt-5" >
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
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" value='9' v-model="Periods[index].Grade">9
                            </label>
                        </div>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" value='10' v-model="Periods[index].Grade">10
                            </label>
                        </div>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" value='11' v-model="Periods[index].Grade">11
                            </label>
                        </div>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" value='12' v-model="Periods[index].Grade">12
                            </label>
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
        </form>
        <form>
            <div class="form-row">
                <div class="form-group col-md-1">
                    <label>Period</label>
                    <select class="custom-select"  v-model="Class.Period">
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
                    <button class="btn btn-secondary dropdown-toggle align-items-end" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown button
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" value='9' v-model="Class.Grade">9
                            </label>
                        </div>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" value='10' v-model="Class.Grade">10
                            </label>
                        </div>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" value='11' v-model="Class.Grade">11
                            </label>
                        </div>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" value='12' v-model="Class.Grade">12
                            </label>
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
        <button type="button" class="btn btn-primary btn-lg btn-block" @click="pushPeriod()">
            <i class="material-icons font-weight-bold"><h2>add</h2></i>
        </button>
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
        variableSelect(event,value) {
            console.log(event.target.value)
                switch(event.target.value){
                case 0: 
                    value.min=0
                    value.max=10
                    break
                case '1': 
                    value.min=11
                    value.max=15
                    console.log(this.Class.Students)
                    break
                case 2: 
                    values.min=16
                    value.max=20
                    break
                case 3: 
                    value.min=21
                    value.max=25
                    break
                case 4: 
                    value.min=26
                    value.max=30
                    break
                case 5:
                    value.min=30
                    value.max=null  
                    break   
                }
        },
        pushPeriod() {
            this.Periods.push(this.Class)
            console.log(this.Class)
            for(var x in this.Class)
            {
                this.Class[x]=null
            }
            console.log(this.Class)
        }
    }
}
</script>

<style>

</style>
