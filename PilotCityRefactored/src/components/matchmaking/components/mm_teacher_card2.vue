<template>
  <div class="card container">
    <div class="one d-flex flex-row h-25">
      <i class="material-icons justify-content-center" id="favorite_border">favorite_border</i>
      <h2 class="card-title">{{classroom.coursename | capitalize}}</h2>
      <!-- Computer Science AP -->
      <i class="material-icons justify-content-center" id="email">email</i>
      <button class="action-button mt-3">Accept</button>
      <i class="material-icons action-button-decline">clear</i>
    </div>

    <div class="two d-flex flex-row h-50">
      <div class="four w-25">
        <h4 class="card-subtitle">Teacher</h4>
        <h4 class="card-subtitle">Grades</h4>
        <h4 class="card-subtitle">Class Size</h4>
        <h4 class="card-subtitle">District</h4>
        <h4 class="card-subtitle">School</h4>
        <h4 class="card-subtitle">Address</h4>
      </div>
      <div class="five w-75">
        <h4 class="card-subtitle-text">
          <span>{{teacher.first_name | capitalize}}</span>
          <span>{{" "}}</span>
          <span>{{teacher.last_name | capitalize}}</span>
        </h4>
        <!-- Anthony Keithley -->
        <h4 class="card-subtitle-text" v-for="(grade,index) in classroom.Grade" :key="index">
          <span>{{grade + 'th'}}</span>
          <span v-if="index != classroom.Grade.length-1">{{", "}}</span>
        </h4>
        <!-- 9th, 10th, 11th -->
        <h4 class="card-subtitle-text">
          <span>{{classroom.students.min}}</span>
          <span v-if="classroom.students.max">
            <span>{{" - "}}</span>
            <span>{{classroom.students.max}}</span>
          </span>
          <span v-else>+</span>
          <span>{{" Students"}}</span>
        </h4>
        <h4 class="card-subtitle-text">{{teacher.school_distrct | capitalize}}</h4>
        <!-- San Leandro Unified -->
        <h4 class="card-subtitle-text">{{teacher.school_name | capitalize}}</h4>
        <h4 class="card-subtitle-text">
          <span v-for="(field,index) in Object.keys(teacher.school_address)" :key="index">
            <span>{{teacher.school_address[field] | capitalize}}</span>
            <span v-if="index != (Object.keys(teacher.school_address).length-1)">{{", "}}</span>
          </span>
        </h4>
        <!--  2250 Bancroft Avenue, San Leandro, CA 94577 -->
      </div>
    </div>

    <div class="three h-25">
      <hr class="card-line">

      <span class="d-flex mr-2 ml-2">
        <h3
          class="pc-tag1"
          v-for="(skill,index) in teacher.selected_skills_keywords"
          :key="index"
        >{{skill | capitalize}}</h3>
        <!-- Javascript C++ iOS  Android -->
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    classroom: {
      required: true //make sure to append teacher first_name and last_name into this object
    },
    teacher: {
      required: true
    }
  },
  filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
};
</script>

<style lang="scss" scoped>
</style>
