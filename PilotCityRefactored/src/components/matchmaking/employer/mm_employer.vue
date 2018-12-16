npm <template>
  <div v-if="render">
    <!-- random -->
    <div class="entire-box d-flex flex-row">
      <div class="d-flex col-7 justify-content-center m-0 p-0">
        <div class="leftside justify-content-center flex-column d-flex col-12 p-0 m-0">
          <div class="filter-bar justify-content-center d-flex flex-row">
            <mm_filter :options="courses" :selected_options="filtered_courses" name="Courses"/>
            <mm_filter :options="skills" :selected_options="filtered_skills" name="Skills"/>
            <mm_filter :options="grades" :selected_options="filtered_grades" name="Grades"/>
            <mm_filter :options="locations" :selected_options="filtered_locations" name="Location"/>
            <mm_filter
              :options="class_size"
              :selected_options="filtered_class_size"
              name="Class Size"
            />
          </div>

          <div class="cardstock">
            <h2 class="text-classroom-matches" id>100+ Classrooms Recommended</h2>
            <mm_teacher_card
              v-if="loaded_teachers[index]"
              :classroom="classroom"
              :teacher="findbyId(loaded_teachers,classroom.teacher_uid)"
              v-for="(classroom,index) in render_class"
              :key="index"
              :invited="invited"
              class="row-12 card-teacher-match"
              @teacherCardClicked="highlight_pin(findbyId(loaded_teachers,classroom.teacher_uid))"
            />
            <b-btn
              class="prevpage__btn justify-content-start"
              @click="page=(page>0)?page-1:page"
            >Previous</b-btn>
            <b-btn
              class="nextpage__btn justify-content-end"
              @click="page=page+1"
              v-scroll-to="'#topresult'"
            >Next</b-btn>
          </div>
        </div>
      </div>
      <div class="google-maps container col-5 m-0 p-0">
        <GoogleMap name="test" :map_data="map_data" :apikey="apikey" :mapcenter="mapcenter"></GoogleMap>
      </div>
    </div>
  </div>
</template>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDfuNr3RaCZkituTfoB7b7pR2u2rWuraWE&callback=initMap"
async defer></script>
<script>
import _ from "lodash";
import firebase from "@/firebase/init";
import mm_filter from "@/components/matchmaking/components/mm_filter.vue";
import mm_teacher_card from "@/components/matchmaking/components/mm_teacher_card.vue";
import GoogleMap from "@/components/map/GoogleMap";
import { GEOCODEKEY } from "@/main";
import "@/assets/SASS/pages/_matchmaking.scss";
import Fuse from "fuse.js";
export default {
  name: "mm_employer",
  data() {
    return {
      allClasses: null,
      apikey: GEOCODEKEY.key,
      search_options: {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: []
      },
      mapcenter: { lat: 37.7249, lng: -122.1561 },
      gmap_markers: [],
      render: false,
      page: 0,
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
        "Manufacturing",
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
        "Sustainability",
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
      loaded_teachers: [],
      recmd: [],
      invited: []
    };
  },
  computed: {
    render_class() {
      var to_display = 10; // number of classes to display per page
      if (
        this.page * to_display + to_display - this.filter_list.length >
        to_display
      )
        this.page =
          parseInt((this.filter_list.length - to_display) / to_display) + 1;
      var min = this.page > 0 ? (this.page - 1) * to_display + to_display : 0;
      var max = this.page * to_display + to_display;
      return this.filter_list.slice(min, max);
    },
    filter_list() {
      // definition of an unique class array: elements' coursename can't be duplicated, teacher_uid is Ok.
      var key = ""; // the key we use to search, consist of params from filter.
      var duplicated_results = []; // the result may be duplicate since we have courses with different periods
      var filtered_result = []; // the final array we return, all classrooms here are unique
      this.search_options.keys = [];
      // pull all the parameters from the filter, concatenate them into a string called 'key' //
      // only search for relavant keys based on the difference of params
      if (this.filtered_courses && this.filtered_courses.length) {
        key += String(this.filtered_courses);
        // only course name is relavant in this case
        this.search_options.keys.push("coursename");
      }
      if (this.filtered_grades && this.filtered_grades.length) {
        key += " " + String(this.filtered_grades);
        this.search_options.keys.push("Grade");
      }
      if (this.filtered_skills && this.filtered_skills.length) {
        key += " " + String(this.filtered_skills);
        this.search_options.keys.push("selected_skills_keywords");
        this.search_options.keys.push("selected_industry_keywords");
      }
      if (this.filtered_locations && this.filtered_locations.length) {
        key += " " + String(this.filtered_locations);
        this.search_options.keys.push("school_address");
        this.search_options.keys.push("school_district");
        this.search_options.keys.push("school_name");
      }
      // if no params is selected from the filter, we return the whil array.
      if (key == "") return this.loaded_classrooms;
      /* ======= Testing Purpose =======
          console.log(key);
          console.log(this.search_options.keys)
      ================================== */
      // fuse.js initialization
      var fuse = new Fuse(this.loaded_classrooms, this.search_options);
      duplicated_results = fuse.search(key);

      // uniqueness check
      var ht = {};
      for (var i = 0; i < duplicated_results.length; i++) {
        if (
          duplicated_results[i].teacher_uid &&
          !Array.isArray(ht[duplicated_results[i].teacher_uid])
        ) {
          ht[duplicated_results[i].teacher_uid] = [];
          filtered_result.push(duplicated_results[i]);
          ht[duplicated_results[i].teacher_uid].push(
            duplicated_results[i].coursename
          );
        } else if (
          duplicated_results[i].teacher_uid &&
          Array.isArray(ht[duplicated_results[i].teacher_uid]) &&
          !ht[duplicated_results[i].teacher_uid].includes(
            duplicated_results[i].coursename
          )
        ) {
          filtered_result.push(duplicated_results[i]);
          ht[duplicated_results[i].teacher_uid].push(
            duplicated_results[i].coursename
          );
        }
      }

      return filtered_result;
    },
    map_data() {
      // the following commented code parse addresses with space to formatted address
      // var str = "";
      // for (var i = 0; i < this.loaded_teachers.length;i++)
      // {
      //   str = this.loaded_teachers[i].school_address.street + '+' +
      //         this.loaded_teachers[i].school_address.city   + '+' +
      //         this.loaded_teachers[i].school_address.state  + '+' +
      //         this.loaded_teachers[i].school_address.zip;
      //   str = str.replace(/\s/g, '+');
      //   arr.push(str);
      // }
      var arr = _.filter(this.loaded_teachers, teacher => {
        return teacher.coordinate;
      });
      return arr;
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
    highlight_pin(teacher) {
      if (teacher.coordinate) this.mapcenter = teacher.coordinate;
      else console.log("This classroom's teacher does not have coordinate!");
    }
  },

  created() {
    var self = this;
    var classIds = [];
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const db = firebase.firestore();
        console.log(user.uid)
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
                  class_data["school_address"] = self.findbyId(
                    self.loaded_teachers,
                    class_data.teacher_uid
                  ).school_address;
                  class_data["school_district"] = self.findbyId(
                    self.loaded_teachers,
                    class_data.teacher_uid
                  ).school_district;
                  class_data["school_name"] = self.findbyId(
                    self.loaded_teachers,
                    class_data.teacher_uid
                  ).school_name;
                  class_data["selected_industry_keywords"] = self.findbyId(
                    self.loaded_teachers,
                    class_data.teacher_uid
                  ).selected_industry_keywords;
                  class_data["selected_skills_keywords"] = self.findbyId(
                    self.loaded_teachers,
                    class_data.teacher_uid
                  ).selected_skills_keywords;
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
                  db.collection("employers")
                    .doc(user.uid)
                    .get()
                    .then(doc => {
                      console.log(doc.data())
                      if (doc.data().invited) self.invited = doc.data().invited;
                    });
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
