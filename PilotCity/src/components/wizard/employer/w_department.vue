<template>
    <div class="container">
            <div id="w_department" class="container mt-5">
                <div class="form-row" v-for="department in departments" :key="department.uid">
                    <i class="material-icons font-weight-bold mr-2" id="delete_department" :class="{first_trash:departments.indexOf(department)==0}" @click="rmThisDepartment(department.uid)">clear</i>
                    <div class="col">
                        <label for="Department_Name" v-if="departments.indexOf(department)==0">Department Name</label>
                        <input  type="text" class="form-control" placeholder="Department Name" v-model="department.name">
                    </div>
                    <div class="col-3">
                        <label for="Team_Size" v-if="departments.indexOf(department)==0">Team Size</label>
                        <select class="custom-select" id="select_team" @change ="variableSelect($event,department.team_size)">
                            <option selected>Select Team Size</option>
                           <option value="0">1 - 3</option>
                            <option value="1">4 - 6</option>
                            <option value="2">7 - 10</option>
                            <option value="3">11 - 20</option>
                            <option value="4">21 - 50</option>
                            <option value="5">50+</option>
                        </select>
                    </div>
                    <div class="col-2">
                        <label for="team_member" v-if="departments.indexOf(department)==0">Team Member?</label>
                        <select class="custom-select" id="select_team_member" v-model="department.team_member">
                            <option selected>Select</option>
                            <option value=false>No</option>
                            <option value=false>Yes</option>
                        </select>
                    </div>
                </div>
            </div>
            <button id="btn-class-add" type="button" class="btn btn-primary btn-lg btn-block" @click="pushDepartment()">
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
    font-weight:100;
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
    font-weight:100;
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
    font-weight:100;
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




.select-class-placeholder {
    font-size:18px;
    text-align:left;
    padding-left:20px;
}


</style>
