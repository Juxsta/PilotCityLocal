<template>
    <div class="container">
            <div id="w_department" class="container mt-5 pt-5">
                <div class="form-row" v-for="department in employer_data.departments" :key="department.uid">
                    <!-- <i class="material-icons font-weight-bold mr-2" id="delete_department" :class="{first_trash:departments.indexOf(department)==0}" @click="rmThisDepartment(department.uid)">clear</i> -->
                    <div class="col">
                        <label for="Department_Name" v-if="employer_data.departments.indexOf(department)==0">Department Name</label>
                        <input  type="text" class="form-control" placeholder="Department Name" v-model="department.name">
                    </div>
                    <div class="col-3">
                        <label for="Team_Size" v-if="employer_data.departments.indexOf(department)==0">Team Size</label>
                        <select class="custom-select" id="select_team" @change ="variableSelect($event,department.team_size)">
                            <option selected value='' v-if="!department.team_size.min">Select</option>
                            <option selected value='' v-if="department.team_size.min">
                                <span v-if="department.team_size.max">{{'Selected: ' + department.team_size.min+'-'+department.team_size.max}}</span>
                                <span v-if="!department.team_size.max">{{'Selected: ' + department.team_size.min+'+'}}</span>
                            </option>
                            <option value="0">1 - 3</option>
                            <option value="1">4 - 6</option>
                            <option value="2">7 - 10</option>
                            <option value="3">11 - 20</option>
                            <option value="4">21 - 50</option>
                            <option value="5">50+</option>
                        </select>
                    </div>
  <!--                   <div class="col-2">
                        <label for="team_member" v-if="employer_data.departments.indexOf(department)==0">Team Member?</label>
                        <select class="custom-select" id="select_team_member" v-model="department.team_member">
                            <option selected>Select</option> 
                            <option value=false>No</option> 
                            <option value=false>Yes</option> 
                        </select>
                    </div> -->
                </div>
            </div>
            <next_button
                route='w_employer_roi'
                :conditions="conditions"
                :collection="collection"
                :pass="filled"
            />
        <router-link :to="{ name: 'w_employer_solution_keywords' }" 
            class="prev_button btn btn-secondary btn-lg">
            Back
        </router-link>
    </div>
    
</template>

<script>
import button from '@/components/profile_builder/wizard/components/button'
import firebase from '@/firebase/init'
export default {
    name: "w_department",
    data () {
        return {
            employer_data:{
                departments :[{
                    uid: (new Date()).getTime(),
                    name: null,
                    team_size: {
                        min: null,
                        max: null
                    },
                    //team_member: null
                }],
            },
            collection: ["employers"],
            
        }
    },
    components: {
        next_button:button,
    }, 
    computed: {
        conditions(){
            return [this.employer_data]
        },
        filled() {
            return _.every(this.employer_data.departments, (department)=> {
                return Object.keys(department).every((field) => {
                    if(field == 'team_size')
                        return _.every(department[field],(size) => {return size != null})
                    else
                        return department[field]
                })
            })
        }
    },
    methods: {
        pushDepartment() {
            this.employer_data.departments.push({
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

            this.employer_data.departments = this.employer_data.departments.filter( (departments) => {
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
                    Obj.max=false  
                    break   
            }
        }
    },
    created(){
        var self = this
        let data = [self.employer_data]
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                const db = firebase.firestore()
                for(let i = 0;i<self.collection.length;i++)
                db.collection(self.collection[i]).doc(user.uid).get().then((doc) => {
                    let obj = doc.data()
                    for (let field in data[i]) {
                        if(obj.hasOwnProperty(field)) {
                            data[i][field]=obj[field]
                        }    
                    }
                })
            }
        })
    }
}
</script>

<style>

#delete_department {
    cursor: pointer;
    color: lightgray;
    margin-top: 15px;
    font-size: 100%;
}

.form-control {
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

.form-control:focus {
    background-color: rgb(222, 223, 224);
    color: white;

}

.form-control::placeholder {
    color: white;
}

.form-row {
    margin-bottom: 12px;
}

.col{
    width:100px;
}

.custom-select {
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
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='white' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E")
}

.add-button{
    margin-top:4px;
    color: #ae90b0;
}

input, input:focus, select, select:focus{
    border-radius: 50px;
    font-size: 18px;
    padding-left:20px;
    font-style: Italic;
    font-family: "Raleway";
    color: white;
    outline: none !important;
    font-weight:300;
    height: 50px;
    border-color: #dbdcde;
    box-shadow: none !important;
}

 #btn-class-add{
    border: dashed 1px #dbdcde;
    background: white;
    color: #ae90b0;
    border-radius: 50px;
    height:50px;
    width:1055px;
    margin-left: 40px;
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





.first_trash {
    padding-top:31px;
}
label {
    color: #ae90b0;
    font-weight: bold;
    font-size:15px;
    margin-left:15px;
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




.select-class-placeholder {
    font-size:18px;
    text-align:left;
    padding-left:20px;
}

.dropdown-placeholder{
    font-weight:300;
}


</style>
