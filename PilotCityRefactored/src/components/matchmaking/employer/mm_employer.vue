<template>
  <div v-if="render">
    <!-- random -->
    <div class="entire-box d-flex flex-row">
      <div class="d-flex col-7 justify-content-center m-0 p-0">
        <div class="leftside justify-content-center flex-column d-flex col-12 p-0 m-0">
          <div class="filter-bar justify-content-center d-flex flex-row container">
            <b-btn class="filter__button">Courses</b-btn>
            <mm_filter_skills :skills="skills" :selected_skills="selected_skills"/>
            <b-btn class="filter__button">Grades</b-btn>
            <b-btn class="filter__button">Location</b-btn>
            <b-btn class="filter__button">Class Size</b-btn>
          </div>

          <div class="cardstock container">
            <h2 class="text-classroom-matches row">100+ Classrooms Recommended</h2>
            <mm_teacher_card
            v-if="loaded_teachers[index]"
              :classroom="classroom"
              :teacher="loaded_teachers[index]"
              v-for="(classroom,index) in loaded_classrooms"
              :key="index"
              class="row-12"
            />
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
import mm_teacher_card from "@/components/matchmaking/components/mm_teacher_card.vue";
import mm_filter_skills from "@/components/matchmaking/components/mm_filter_skills.vue";
import "@/assets/SASS/pages/_matchmaking.scss";
export default {
  name: "mm_employer",
  data() {
    return {
      render: false,
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
      selected_skills: [],
      loaded_classrooms: [],
      loaded_teachers: [],
      recmd: []
    };
  },
  components: {
    mm_teacher_card,
    mm_filter_skills
  },
  created() {
    var self = this;
    var classIds = [];
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const db = firebase.firestore();

        db.collection("teachers")
          .get()
          .then(teacher_querySnapshot => {
            teacher_querySnapshot.forEach(doc => {
              var teacher_data = doc.data();
              teacher_data["uid"] = doc.id;
              self.loaded_teachers.push(teacher_data);
            });
            db.collection("classroom")
              .get()
              .then(classroom_querySnapshot => {
                classroom_querySnapshot.forEach(doc => {
                  var class_data = doc.data();
                  // console.log(doc.data());
                  self.loaded_classrooms.push(class_data);
                });
                var promises = [];
                for (
                  let teacher = 0;
                  teacher < self.loaded_teachers.length;
                  teacher++
                ) {
                  promises.push(
                    db
                      .collection("Users")
                      .doc(self.loaded_teachers[teacher]["uid"])
                      .get()
                      .then(doc => {
                        var user_data = doc.data();
                        self.loaded_teachers[teacher]["first_name"] =
                          user_data.first_name;
                        self.loaded_teachers[teacher]["last_name"] =
                          user_data.last_name;
                      })
                  );
                }
                Promise.all(promises).then(val => {
                  self.render = true;
                });
              });
          });
      }
    });
  }
};
</script>


<style lang="scss">
</style>
