<template>
    <div id="w_department" class="container mt-5">
        <div class="form-row" v-for="department in departments" :key=id>
            <div class="col">
                <label for="Department_Name">Department Name</label>
                <input  type="text" class="form-control" placeholder="department name">
            </div>
            <div class="col">
                <label for="Team_Size">Team Size</label>
                <select class="custom-select" id="select_team">
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
                <select class="custom-select" id="select_team_member">
                    <option value=false>No</option>
                    <option value=false>Yes</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "w_department",
    data () {
        return {
            department: {
                uid: new Date,
                name: null,
                team_size: null,
                team_member: null
            }
        }
    }
}
</script>

<style>
#w_department {
    
}
</style>
