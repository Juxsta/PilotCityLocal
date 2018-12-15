<template>
  <div class="card container">
    <div class="one d-flex flex-row h-25">
      <i
        class="material-icons justify-content-center pt-2 px-3"
        id="favorite_border"
      >favorite_border</i>
      <h2 class="card-title">{{classroom.coursename | capitalize}}</h2>
      <div class="card-buttons pt-3">
        <i class="material-icons justify-content-center pr-4" id="email">email</i>
        <button
          @click="update"
          :class="{'action-button':invite, 'action-button-decline':pending}"
        >{{ text }}</button>
        <!-- place holder button -->
        <i class="material-icons action-button-decline">clear</i>
        <!--Place holder [x] -->
      </div>
    </div>

    <div class="two d-flex flex-row h-200 justify-content-start">
      <div class="four w-25 justified-content-start">
        <h4 class="card-subtitle">Teacher</h4>
        <h4 class="card-subtitle">Grades</h4>
        <h4 class="card-subtitle">Class Size</h4>
        <h4 class="card-subtitle">District</h4>
        <h4 class="card-subtitle">School</h4>
        <h4 class="card-subtitle">Address</h4>
      </div>
      <div class="five justified-content-start">
        <h4 class="card-subtitle">
          <span>{{teacher.first_name | capitalize}}</span>
          <span>{{" "}}</span>
          <span>{{teacher.last_name | capitalize}}</span>
        </h4>
        <!-- Anthony Keithle -->
        <div class="container d-flex flex-row">
          <h4
            class="card-subtitle text row mr-3"
            v-for="(grade,index) in classroom.Grade"
            :key="index"
          >
            <li>{{grade + 'th'}}</li>
            <span v-if="index != classroom.Grade.length-1">{{" "}}</span>
          </h4>
        </div>

        <!-- 9th, 10th, 11th -->
        <h4 class="card-subtitle">
          <span>{{classroom.students.min}}</span>
          <span v-if="classroom.students.max">
            <span>{{" - "}}</span>
            <span>{{classroom.students.max}}</span>
          </span>
          <span v-else>+</span>
          <span>{{" Students"}}</span>
        </h4>
        <h4 class="card-subtitle text">{{teacher.school_district | capitalize}}</h4>
        <!-- San Leandro Unified -->
        <h4 class="card-subtitle text">{{teacher.school_name | capitalize}}</h4>
        <h4 class="card-subtitle text">
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
        <!-- <h3
          class="pc-tag1"
          v-for="(skill,index) in teacher.selected_skills_keywords"
          :key="index"
        >{{skill | capitalize}}</h3>-->
        <!-- Javascript C++ iOS  Android -->
      </span>
    </div>
  </div>
</template>

<script>
// import tagging from @/components
export default {
  data() {
    return {
      invite: true,
      pending: false,
      text: " ",
    };
  },
  props: {
    classroom: {
      required: true
    },
    teacher: {
      required: true
    }
  },
  methods: {
    update (event) {
        this.invite = !this.invite;
        this.pending = !this.pending;
        if(this.invite == true){
          this.text = "Invite"
        }
        else{
          this.text = "Invited";
        }
    }
  },
  computed: {
    // status: function() {
    //   return {
    //     'action-button': this.
    //   };
    // }
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>

<style lang="scss" scoped>
//#region
$white: #fff;
$black: #000;
$green: #6eba7f;
$blue: #3c9ccc;
$orange: #f79960;
$yellow: #fdd25a;
$red: #ea6763;
$purple: #ae90b0;
$pink: #eca0be;

$popover-max-width: 1000px;
.text-classroom-matches {
  font-family: "Raleway";
  font-size: 20px;
  color: #939597;
  font-weight: 700;
  margin: 30px auto 15px auto;
}

.pc-tag1 {
  width: 150px;
  height: 31px;
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: 6px;
  margin-right: 6px;
  border-radius: 25px;
  text-align: center;
  padding-top: 8px;
  font-family: "Raleway";
  font-weight: 700;
  color: #ffffff;
  font-size: 12px;
  background-color: #6eba7f;
}

.pc-tag2 {
  width: 150px;
  height: 31px;
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: 6px;
  margin-right: 6px;
  border-radius: 25px;
  text-align: center;
  padding-top: 8px;
  font-family: "Raleway";
  font-weight: 700;
  color: #ffffff;
  font-size: 12px;
  background-color: #3c9ccc;
}

.pc-tag3 {
  width: 150px;
  height: 31px;
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: 6px;
  margin-right: 6px;
  border-radius: 25px;
  text-align: center;
  padding-top: 8px;
  font-family: "Raleway";
  font-weight: 700;
  color: #ffffff;
  font-size: 12px;
  background-color: #ea6763;
}

.pc-tag4 {
  width: 150px;
  height: 31px;
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: 6px;
  margin-right: 6px;
  border-radius: 25px;
  text-align: center;
  padding-top: 8px;
  font-family: "Raleway";
  font-weight: 700;
  color: #ffffff;
  font-size: 12px;
  background-color: #fdd25a;
}

.pc-tag5 {
  width: 150px;
  height: 31px;
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: 6px;
  margin-right: 6px;
  border-radius: 25px;
  text-align: center;
  padding-top: 8px;
  font-family: "Raleway";
  font-weight: 700;
  color: #ffffff;
  font-size: 12px;
  background-color: #f79960;
}

#favorite_border {
  color: #dbdcde;
  margin: auto 0px auto 35px;
}

#favorite_border:hover {
  color: #eca0be;
  margin: auto 0px auto 35px;
  cursor: pointer;
}

#favorite_border:active {
  color: #c47e9b;
  margin: auto 0px auto 35px;
  cursor: pointer;
}

.one {
  background-color: transparent;
}

.action-button {
  width: 125px;
  height: 25px;
  border-radius: 50px;
  background-color: #ffffff;
  border: solid 2px #6eba7f;
  color: #6eba7f;
  font-family: "Raleway";
  font-weight: 700;
  font-size: 11px;
  margin: auto;
  padding-top: 3px;
}

.action-button:hover {
  width: 125px;
  height: 25px;
  border-radius: 50px;
  background-color: #6eba7f;
  border: 0px;
  color: #ffffff;
  font-family: "Raleway";
  font-weight: 700;
  font-size: 11px;
  margin: auto;
  padding-top: 3px;
}

.action-button:active {
  width: 125px;
  height: 25px;
  border-radius: 50px;
  background-color: #408b54;
  border: 0px;
  color: #ffffff;
  font-family: "Raleway";
  font-weight: 700;
  font-size: 11px;
  margin: auto;
  padding-top: 3px;
}

.action-button-decline {
  border-radius: 5px;
  width: 17px;
  height: 17px;
  background-color: #ea6763;
  border: 0px;
  margin: auto 20px auto auto;
  color: #ffffff;
  font-size: 80%;
  text-align: center;
  padding-top: 3px;
  font-weight: 700;
  cursor: pointer;
}

.action-button-decline:hover {
  border-radius: 5px;
  width: 17px;
  height: 17px;
  background-color: #bb3e40;
  border: 0px;
  margin: auto 20px auto auto;
}

.action-button-decline:active {
  border-radius: 5px;
  width: 17px;
  height: 17px;
  background-color: #ea6763;
  border: 0px;
  margin: auto 20px auto auto;
}

#email {
  font-size: 22px;
  color: #c6c8ca;
  margin: auto;
}

#email:hover {
  font-size: 22px;
  color: #939597;
  margin: auto;
  cursor: pointer;
}

#email:active {
  font-size: 22px;
  color: #c6c8ca;
  margin: auto;
  cursor: pointer;
}

.two {
  background-color: transparent;
}

.three {
  background-color: transparent;
}

.four {
  background-color: transparent;
}

.five {
  background-color: transparent;
}

.six {
  background-color: #dbdcde;
}

.seven {
  background-color: #3c9ccc;
}

.eight {
  background-color: #f79960;
}

.nine {
  background-color: #fdd25a;
}

.ten {
  background-color: #eca0be;
}

.entire-box {
  background-color: #f79960;
}

.leftside {
  background-color: #fdd25a;
  height: 100vh;
  overflow: scroll;
}

.filter-bar {
  background-color: #ffffff;
  height: 75px;
}

.filter-button {
  width: 125px;
  height: 45px;
  border-radius: 50px;
  background-color: #ffffff;
  margin: 15px 10px 15px 10px;
  text-align: center;
  padding-top: 10px;
  font-family: "Raleway";
  color: #939597;
  font-weight: 700;
  border: solid 1px #dbdcde;
}

.filter-button:hover {
  width: 125px;
  height: 45px;
  border-radius: 50px;
  background-color: #eca0be;
  margin: 15px 10px 15px 10px;
  text-align: center;
  padding-top: 10px;
  font-family: "Raleway";
  color: #ffffff;
  border: solid 1px #eca0be;
  font-weight: 700;
  cursor: pointer;
}

.cardstock {
  background-color: #ffffff;
  height: 100%;
  overflow: scroll;
}

.card {
  width: 750px;
  height: 225px;
  margin: 20px auto 20px auto;
  border: dashed 1px #dbdcde;
  border-radius: 25px;
  padding: 0px;
}

.card-line {
  border-style: dashed;
  padding: 0px;
  margin: 0px;
}

.card-title {
  font-family: "Raleway";
  font-size: 18px;
  font-weight: 700;
  color: #939597;
  width: 400px;
  margin: 14px 0px 14px 35px;
  padding-top: 3px;
}

.card-subtitle {
  font-family: "Raleway";
  font-size: 12px;
  font-weight: 700;
  text-align: right;
  color: #939597;
  padding: 1px 5px 1px 1px;
  margin: 0;
}

.card-subtitle-text {
  font-family: "Raleway";
  font-size: 12px;
  font-weight: 300;
  text-align: left;
  color: #939597;
  padding: 1px 1px 1px 5px;
  margin: 0;
}

.google-maps {
  background-color: #3c9ccc;
}
//#endregion
// temporarily
li {
  display: inline-block;
  margin: 3px;
}
</style>
