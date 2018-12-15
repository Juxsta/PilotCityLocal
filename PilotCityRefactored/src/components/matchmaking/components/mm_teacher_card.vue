<template>
  <div class="card container">
    <div class="one d-flex flex-row h-25">
      <i
        class="material-icons justify-content-center pt-2 px-3"
        id="favorite_border"
      >favorite_border</i>
      <h2 class="card-title">{{classroom.coursename | capitalize}}</h2>
      <div class="card-buttons">
        <i class="material-icons justify-content-center pt-2 px-3" id="email">email</i>
        <button @click="message()" class="action-button mt-3">Accept</button>
        <!-- place holder button -->
        <i class="material-icons action-button-decline pl-3">clear</i>
        <!--Place holder [x]  -->
      </div>
    </div>

    <div class="two d-flex flex-row">
      <div class="four ml-5 mr-3 pb-3 justify-content-start">
        <h4 class="card-subtitle">Teacher</h4>
        <h4 class="card-subtitle">Grades</h4>
        <h4 class="card-subtitle">Class Size</h4>
        <h4 class="card-subtitle">District</h4>
        <h4 class="card-subtitle">School</h4>
        <h4 class="card-subtitle">Address</h4>
      </div>
      <div class="five">
        <h4 class="card-subtitle-text text">
          <span>{{teacher.first_name | capitalize}}</span>
          <span>{{" "}}</span>
          <span>{{teacher.last_name | capitalize}}</span>
        </h4>
        <!-- Anthony Keithle -->
        <div class="container p-0 d-flex flex-row">
          <h4
            class="card-subtitle-text text row"
            v-for="(grade,index) in classroom.Grade"
            :key="index"
          >
            <li>{{grade + 'th'}}</li>
            <span v-if="index != classroom.Grade.length-1">{{" "}}</span>
          </h4>
        </div>

        <!-- 9th, 10th, 11th -->
        <h4 class="card-subtitle-text text">
          <span>{{classroom.students.min}}</span>
          <span v-if="classroom.students.max">
            <span>{{" - "}}</span>
            <span>{{classroom.students.max}}</span>
          </span>
          <span v-else>+</span>
          <span>{{" Students"}}</span>
        </h4>
        <h4 class="card-subtitle-text text">{{teacher.school_district | capitalize}}</h4>
        <!-- San Leandro Unified -->
        <h4 class="card-subtitle-text text">{{teacher.school_name | capitalize}}</h4>
        <h4 class="card-subtitle-text text">
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
      <div class="container">
        <span class="d-flex row">
          <h4
            class="pc-tag1 col-2"
            v-for="(skill,index) in teacher.selected_skills_keywords"
            :key="index"
          >{{skill | capitalize}}</h4>
          <!-- Javascript C++ iOS  Android -->
        </span>
      </div>
    </div>
  </div>
</template>

<script>

// import tagging from @/components
export default {
  props: {
    classroom: {
      required: true
    },
    teacher: {
      required: true
    }
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  created(){

  }
};
</script>

<style lang="scss" scoped>


// temporarily
li {
  display: inline-block;
}

// .card-buttons{
//   padding-left: 125px
// }
</style>
