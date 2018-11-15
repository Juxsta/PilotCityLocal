<template>
    <div class="container">
            <div id="w_department" class="container mt-5">
                <div class="form-row" v-for="department in departments" :key="department.uid">
                    <i class="material-icons font-weight-bold" id="delete_department" :class="{first_trash:departments.indexOf(department)==0}" @click="rmThisDepartment(department.uid)">clear</i>
                    <div class="col">
                        <label for="Department_Name">Department Name</label>
                        <input  type="text" class="form-control" placeholder="department name" v-model="department.name">
                    </div>
                    <div class="col">
                        <label for="Team_Size">Team Size</label>
                        <select class="custom-select" id="select_team" @change ="variableSelect($event,department.team_size)">
                            <option value="0">1 - 3</option>
                            <option value="1">4 - 6</option>
                            <option value="2">7 - 10</option>
                            <option value="3">11 - 20</option>
                            <option value="4">21 - 50</option>
                            <option value="5">50+</option>
                        </select>
                    </div>
                    <div class="col">
                        <label for="team_member">Team Member</label>
                        <select class="custom-select" id="select_team_member" v-model="department.team_member">
                            <option value=false>No</option>
                            <option value=false>Yes</option>
                        </select>
                    </div>
                </div>
            </div>
            <button id="btn-class-add" type="button" class="btn btn-primary btn-lg btn-block mt-5" @click="pushDepartment()">
                <i class="material-icons font-weight-bold add-button">add</i>
            </button>
    </div>
    
</template>

<script>
export default {
    name: "w_department",
    data () {
        return {
            departments :[
                {
                uid: (new Date()).getTime(),
                name: null,
                team_size: {
                    min: null,
                    max: null
                },
                team_member: null
                }
            ]
            
        }
    },
    methods: {
        pushDepartment() {
            this.departments.push({
                uid: (new Date()).getTime(),
                name: null,
                team_size: {
                    min: null,
                    max: null
                },
                team_member: null
            })
        },
        rmThisDepartment(id) {
            this.departments = this.departments.filter( (departments) => {
                return departments.uid != id
            })
        },
        variableSelect(event, Obj) {
                switch(event.target.value){
                case '0': 
                    Obj.min=1
                    Obj.max=3
                    break
                case '1': 
                    Obj.min=4
                    Obj.max=6
                    break
                case '2': 
                    Obj.min=7
                    Obj.max=10
                    break
                case '3': 
                    Obj.min=11
                    Obj.max=20
                    break
                case '4': 
                    Obj.min=21
                    Obj.max=50
                    break
                case '5':
                    Obj.min=50
                    Obj.max=null  
                    break   
                }
        }
    }
}
</script>

<style>

</style>
