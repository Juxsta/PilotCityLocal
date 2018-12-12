<template>
  <div>
    <div class="entire-box d-flex flex-row">
      <div class="d-flex col-7 justify-content-center m-0 p-0">
        <div class="leftside justify-content-center flex-column d-flex col-12 p-0 m-0">
          <div class="filter-bar justify-content-center d-flex flex-row container">
            <b-btn class="filter-button">Courses</b-btn>

            <b-btn class="filter-button" id="PopoverSkills">Skills</b-btn>

            <b-popover target="PopoverSkills" placement="auto">
              <div class="container-fluid">
                <b-btn class="pc-tag1 pl-y col">hi</b-btn>
              </div>
            </b-popover>
            <div class="filter-button">Grades</div>
            <div class="filter-button">Location</div>
            <div class="filter-button">Class Size</div>
          </div>

          <div class="cardstock d-flex flex-column row-12 container">
            <h2 class="text-classroom-matches">100+ Classrooms Recommended</h2>
          </div>
        </div>
      </div>

      <!-- <div class="google-maps container col-5 m-0 p-0">
        <google-map/>
      </div>-->
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import firebase from "@/firebase/init";
import fb from 'firebase'
import w_teacherVue from '../../profile_builder/wizard/teacher/w_teacher.vue';
export default {
  name: "mm_employer",
  data() {
    return {
      class_size: ["1-10", "11-15", "16-20", "21-25", "26-30"],
      location: [
        "Alameda",
        "Emeryville",
        "Fremont",
        "Hayward",
        "Mill Valley",
        "Oakland",
        "Richmond",
        "San Leandro",
        "San Lorenzo"
      ],
      courses: [
        "Computer Science",
        "Engineering",
        "Digital Media",
        "English",
        "Manufcturing",
        "Automotive",
        "Graphic Design",
        "Videography"
      ],
      filtered_courses: [],
      skills: [
        "Manufacturing",
        "Mapping",
        "Mixed Reality",
        "Networking",
        "Sensors",
        "Shipping",
        "Transport",
        "Virtual Reality",
        "Country Governance",
        "Laboratory",
        "Municipality",
        "Public Saftey",
        "Sustainibility",
        "Space",
        "Artificial Intelligence",
        "Automotive",
        "Bioprinting",
        "Data",
        "Drones",
        "Gaming",
        "Healthcare",
        "Internet of Things",
        "Lifestyle"
      ],
      filtered_courses: [],
      grades: ["9th Grade", "10th Grade", "11th Grade", "12th Grade"],
      filtered_grades: [],
      loaded_classrooms: [],
      loaded_teachers: [],
      recmd: []
    };
  },
  created() {
    var self = this;
    var teacherIds = [];
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const db = firebase.firestore();
        db.collection("classroom")
          .get()
          .then(classroom_querySnapshot => {
            //get info from all the classrooms
            // console.log(classroom_querySnapshot)
            classroom_querySnapshot.forEach(doc => {
              var class_data = doc.data();
              //keep a reference to all the teacher ids in an array
              teacherIds.push(class_data.teacher_uid);
              //keep local reference to the classrooms that were loaded
              self.loaded_classrooms.push(class_data);
            });
            // filter out repeated teacher ids
            teacherIds = _.uniq(teacherIds);
            // console.log(teacherIds)
            // create a query reference to the teachers collection
            var query_teacher = db.collection("teachers");
            // set query to get all teacher documents that are in teacher ids
            console.log(...teacherIds)
            // for(let id of teacherIds)
                query_teacher = query_teacher.where(_.includes(teacherIds,fb.firestore.FieldPath.documentId()), '==', true)
                // query_teacher = query_teacher.where(fb.firestore.FieldPath.documentId(), '==', "49Z7lfsLuihpCaJUZBpuZ0g2rGt1")
                // query_teacher = query_tea(fb.firestore.FieldPath.documentId(), '==', "C6D3Y2PoHIXoFJvgbzVQG2kIwX02")
            // const refs = teacherIds.map(id => query_teacher.doc())
            query_teacher.get().then(teacher_querySnapshot => {
                console.log(teacher_querySnapshot)
              teacher_querySnapshot.forEach(doc => {
                // store all loaded teacher data and keep local reference of their uid's
                var teacher_data = doc.data();
                teacher_data["uid"] = doc.id;
                self.loaded_teachers.push(teacher_data);
              });
              // Get teacher names from Users collection and store them in teacher
              var query_user = db.collection("Users");
              query_user = query_user.doc(...teacherIds);
              query_user.get().then(doc => {
                var user_data = doc.data();
                var teacher_ref = _.find(self.loaded_teachers, { uid: doc.id });
                teacher_ref.first_name = user_data.first_name;
                teacher_ref.last_name = user_data.last_name;
              });
            });
          });
      }
    });
  }
};
</script>


<style lang="scss" scoped>
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

//bootstrap imports
</style>
