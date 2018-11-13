<template>
    <div class="container-fluid">
        <div class="d-flex flex-row justify-content-center">
            <div class="form-row">
                <div class="form-group col-md-8">
                    <label for="inputSchoolAddress">School Address</label>
                    <input type="text" class="form-control" id="inputSchoolAddress" placeholder="Irvington High School, 41800 Blacow Road, Fremont, CA 94538">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputRoomNumber">Room Number</label>
                    <input type="text" class="form-control" id="inputRoomNumber" placeholder="#">
                </div>
            </div>
        </div>
        <div class="d-flex flex-row justify-content-center">
            <div class="form-row">
                <div class="form-group col-md-2">
                    <label for="Period">Period</label>
                    <input type="text" class="form-control" id="Period">
                </div>
                <div class="form-group col-md-4">
                    <label for="Course Name">Course Name</label>
                    <input type="text" class="form-control" id="Course Name">
                </div>
                <div class="form-group col-md-2">
                    <label for="Semester">Semester</label>
                    <input type="text" class="form-control" id="Semester">
                </div>
                <div class="form-group col-md-2">
                    <label for="Grade">Grade</label>
                    <input type="text" class="form-control" id="Grade">
                </div>
                <div class="form-group col-md-2">
                    <label for="Students">#Students</label>
                    <input type="text" class="form-control" id="Students">
                </div>
            </div>
        </div>
        <span>
            <button type ="button" class="btn btn-primary btn-block">
                <i class="material-icons">add</i>
            </button>
        </span>
    </div>  
</template>

<script>
export default {
    name:"w_story",
    data() {
        return {
            
        }
    },
    methods: {
        
    }
}
</script>
<style>
#inputSchoolAddress {
    width: 600px;
    margin-right:100px
}
</style>
