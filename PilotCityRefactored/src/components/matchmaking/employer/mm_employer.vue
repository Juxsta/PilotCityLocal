<template>
  <div v-if="render">
    <!-- random -->
    <div class="entire-box d-flex flex-row" >
      <div class="d-flex col-7 justify-content-center m-0 p-0" >
      
        <div class="leftside justify-content-center flex-column d-flex col-12 p-0 m-0" >
          <div class="filter-bar justify-content-center d-flex flex-row container">
            <mm_filter
              :options="courses"
              :selected_options="filtered_courses"
              name="Courses"
            />
            <mm_filter :options="skills" :selected_options="filtered_skills" name="Skills"/>
            <mm_filter :options="grades" :selected_options="filtered_grades" name="Grades"/>
            <mm_filter
              :options="locations"
              :selected_options="filtered_locations"
              name="Location"
            />
            <!-- <mm_filter_skills
              :options="skills"
              :selected_options="selected_skills"
              name="Class Size"
            />-->
          </div>

          <div class="cardstock container">
            <h2 class="text-classroom-matches row">100+ Classrooms Recommended</h2>
            <mm_teacher_card
              v-if="loaded_teachers[index]"
              :invited="invited"
              :classroom="classroom"
              :teacher="findbyId(loaded_teachers,classroom.teacher_uid)"
              v-for="(classroom,index) in filter_list"
              :key="index"
              class="row-12"
            />
            <b-btn @click="filter_list" class="justify-content-start">Next</b-btn>
            <b-btn @click="filter_list" class="justify-content-end">Prev</b-btn>
          </div>
        </div>
      </div>
       <div class="google-maps container col-5 m-0 p-0">
     
       <GoogleMap name="test" :addresses=address_arr :apikey=apikey> </GoogleMap>
      </div>
    </div>
  </div>
</template>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDfuNr3RaCZkituTfoB7b7pR2u2rWuraWE&callback=initMap"
async defer></script>
<script>
import _ from "lodash";
import firebase from "@/firebase/init";
import mm_filter from "@/components/matchmaking/components/mm_filter.vue"
import mm_teacher_card from "@/components/matchmaking/components/mm_teacher_card.vue";

import GoogleMap from '@/components/map/GoogleMap'
import {  GEOCODEKEY } from '@/main'
import "@/assets/SASS/pages/_matchmaking.scss";

export default {
  name: "mm_employer",
  data() {
    return {
      apikey: GEOCODEKEY.key,
      gmap_prop:{
        center: { lat:37.7249, lng:-122.1561 },
        zoom: 11
      },
      gmap_markers: [],
      render: false,
      class_size: ["1-10", "11-15", "16-20", "21-25", "26-30"],
      filtered_class_size: [],
      locations: [
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
      filtered_locations: [],
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
      filtered_skills: [],
      loaded_classrooms: [],
      render_classroms: [],
      loaded_teachers: [],
      recmd: [],
      invited: [],
    };
  },
  computed: {
    filter_list() {
      var arr_filters = [
        this.filtered_skills,
        this.filtered_locations,
        this.filtered_courses,
        this.filtered_grades,
        this.filtered_class_size
      ];
      var self = this;
      return _.filter(self.loaded_classrooms, clas => {
        // check through all the classes
        return arr_filters.every(filter => {
          // check through each filter
          return filter.every(item => {
            //make sure the class has all the filters applied form each filter
            return _.some(clas, field => {
              if (typeof field == "string")
                return field
                  .trim()
                  .toLowerCase()
                  .includes(item.trim().toLowerCase());
              else return field == item;
            });
          });
        });
      })
    },
    address_arr() {
      var arr = [];
      var str = "";
      for (var i = 0; i < this.loaded_teachers.length;i++)
      {
        str = this.loaded_teachers[i].school_address.street + '+' +
              this.loaded_teachers[i].school_address.city   + '+' +
              this.loaded_teachers[i].school_address.state  + '+' +
              this.loaded_teachers[i].school_address.zip;
        str = str.replace(/\s/g, '+');
        arr.push(str);
      }
      return (arr);
    }
  },
  components: {
    mm_teacher_card,
    mm_filter,
    GoogleMap 
  },
  methods: {
    shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
    findbyId(arr, uid) {
      return arr.filter(obj => {
        return obj.uid == uid;
      })[0];
    },
    pinAllClassroomsOnMap(arr_of_classrooms_addr) {
      for (var i = 0; i < arr_of_classrooms_addr.length; i++) {
        this.pinMarkerWithLink(this.getLink(arr_of_classrooms_addr[i]));
      }
    },
    getLink(address) {
      var api_link =
        "https://maps.googleapis.com/maps/api/geocode/json?address=";
      var key = "&key=" + GEOCODEKEY.key;
      return api_link + address.replace(/\s/g, "+") + key;
    },
    pinMarkerWithLink(link) {
      axios
        .get(link)
        .then(response => {
          this.gmap_markers.push({
            position: response.data.results[0].geometry.location
          });
        })
        .catch(error => {
          console.log(error.message);
        });
    }
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
                  self.shuffle(self.loaded_classrooms);
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
