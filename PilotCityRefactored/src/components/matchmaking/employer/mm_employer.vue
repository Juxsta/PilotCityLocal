npm <template>
  <div v-if="render">
    <!-- random -->
    <div class="entire-box d-flex flex-row">
      <div class="d-flex col-8 justify-content-center m-0 p-0">
        <div class="leftside justify-content-center flex-column d-flex col-12 p-0 m-0">
          <div class="filter-bar justify-content-center d-flex flex-row">
            <mm_filter :options="courses" :selected_options="filtered_courses" :show=show @click="changeShow('Courses')" name="Courses"/>
            <mm_filter :options="skills" :selected_options="filtered_skills" :show=show @click="changeShow('Skills')" name="Skills"/>
            <mm_filter :options="grades" :selected_options="filtered_grades" :show=show @click="changeShow('Grades')" name="Grades"/>
            <mm_filter :options="locations" :selected_options="filtered_locations" :show=show  @click="changeShow('Location')" name="Location"/>
            <mm_filter
              :options="class_size"
              :selected_options="filtered_class_size"
              name="Class Size"
              :show=show
              @click="changeShow('Class Size')"
            />
          </div>

          <div class="cardstock d-flex flex-column row-12 container">
            <h2 class="text-classroom-matches">100+ Classrooms Recommended</h2>
            <mm_teacher_card
              v-if="loaded_classrooms.length && loaded_teachers.length"
              :classroom="loaded_classrooms[2]"
              :teacher="loaded_teachers[2]"
            />
          </div>
        </div>
      </div>
      <div class="google-maps container col-4 m-0 p-0">
        <GoogleMap
          name="employer_gm"
          :map_data="map_data"
          :apikey="apikey"
          :mapcenter="mapcenter"
          role="employer"
        ></GoogleMap>
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
import { createECDH } from "crypto";
export default {
  name: "mm_employer",
  data() {
    return {
      allClasses: null,
      active_card: null,
      liked_cards: [],
      apikey: GEOCODEKEY.key,
      search_options: {
        tokenize: true,
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
      class_size: ["0-10", "11-15", "16-20", "21-25", "26-30"],
      filtered_class_size: [],
      locations: [
        "Alameda, CA",
        "Berkeley, CA",
        "Emeryville, CA",
        "Fremont, CA",
        "Hayward, CA",
        "Mill Valley, CA",
        "Oakland, CA",
        "Richmond, CA",
        "San Leandro, CA",
        "San Lorenzo, CA"
      ],
      filtered_locations: [],
      courses: [
        // "Computer Science",
        // "Engineering",
        // "Digital Media",
        // "English",
        // "Manufacturing",
        // "Automotive",
        // "Graphic Design",
        // "Videography"
      ],
      filtered_courses: [],
      skills: [
        // "Manufacturing",
        // "Mapping",
        // "Mixed Reality",
        // "Networking",
        // "Sensors",
        // "Shipping",
        // "Transport",
        // "Virtual Reality",
        // "Country Governance",
        // "Laboratory",
        // "Municipality",
        // "Public Saftey",
        // "Sustainability",
        // "Space",
        // "Artificial Intelligence",
        // "Automotive",
        // "Bioprinting",
        // "Data",
        // "Drones",
        // "Gaming",
        // "Healthcare",
        // "Internet of Things",
      ],
      filtered_courses: [],
      grades: ["9th Grade", "10th Grade", "11th Grade", "12th Grade"],
      filtered_grades: [],
      filtered_skills: [],
      loaded_classrooms: [],
      loaded_teachers: [],
      recmd: [],
      invited: [],
      show:null
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
      if (
        this.filtered_locations.length == 0 &&
        this.filtered_grades.length == 0 &&
        this.filtered_class_size.length == 0 &&
        this.filtered_skills.length == 0
      )
        return this.loaded_classrooms;
      // definition of an unique class array: elements' coursename can't be duplicated, teacher_uid is Ok.
      var key = ""; // the key we use to search, consist of params from filter.
      var duplicated_results = []; // the result may be duplicate since we have courses with different periods
      var filtered_result = []; // the final array we return, all classrooms here are unique
      this.search_options.keys = [];
      var target = _.cloneDeep(this.loaded_classrooms);
      var fuse;
      // pull all the parameters from the filter, concatenate them into a string called 'key' //
      // only search for relavant keys based on the difference of params
      if (this.filtered_locations && this.filtered_locations.length) {
        key += String(this.filtered_locations);
        this.search_options.keys.push("school_address.city");
        this.search_options.keys.push("school_district");
        this.search_options.keys.push("school_name");
        this.search_options.matchAllTokens = true;
        fuse = new Fuse(target, this.search_options);
        target = fuse.search(key);
        this.search_options.matchAllTokens = false;
      }

      if (this.filtered_grades && this.filtered_grades.length) {
        key += String(this.filtered_grades);
        this.search_options.keys.push("Grade");
        key = key.replace(/th/g, "");
        key = key.replace(/Grade/g, "");
      }
      if (this.filtered_courses && this.filtered_courses.length) {
        key += String(this.filtered_courses);
        // only course name is relavant in this case
        this.search_options.keys.push("coursename");
      }
      if (this.filtered_class_size && this.filtered_class_size.length) {
        key += String(this.filtered_class_size);
        // only course name is relavant in this case
        this.search_options.keys.push("students.max");
        this.search_options.keys.push("students.min");
      }

      if (this.filtered_skills && this.filtered_skills.length) {
        key += String(this.filtered_skills);
        this.search_options.keys.push("selected_skills_keywords");
        this.search_options.keys.push("selected_industry_keywords");
      }

      key = key.replace(/\s,/g, "");
      // if no params is selected from the filter, we return the whil array.
      if (key == "") return target;

      // ======= Testing Purpose =======
      // console.log(key);
      // console.log(this.search_options.keys)
      // ==================================
      // fuse.js initialization
      fuse = new Fuse(target, this.search_options);
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
      var arr = _.filter(this.filter_list, teacher => {
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
    changeShow(name){
      this.show = name
    },
    doNewlikedCardAction(uid) {
      if (_.includes(this.liked_cards, uid))
        this.liked_cards = _.filter(this.liked_cards, card_uid => {
          return card_uid != uid;
        });
      else this.liked_cards.push(uid);
    },
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
    highlight_pin(teacher, index) {
      if (this.active_card == index) this.active_card = -1;
      else this.active_card = index;
      if (teacher.coordinate) this.mapcenter = teacher.coordinate;
      else console.log("This classroom's teacher does not have coordinate!");
    }
  },

  created() {
    var self = this;
    this.$on("markerClicked", function(key, position) {
      self.mapcenter = position;
      var index = _.findIndex(this.filter_list, function(cl) {
        return cl.poi == key;
      });
      // console.log(index)
      this.page = parseInt(index / 10);
      var i = index % 10;
      console.log(i);
      var el = document.getElementById(i);
      if (el) {
        el.scrollIntoView({ block: "center" });
        this.active_card = i;
      }
    });
    var classIds = [];
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const db = firebase.firestore();
        db.collection("employers")
          .doc(user.uid)
          .get()
          .then(doc => {
            if (
              doc.data() &&
              doc.data()["match_making"] &&
              doc.data()["match_making"]["liked_cards"]
            )
              this.liked_cards = doc.data()["match_making"]["liked_cards"];
            else this.liked_cards = [];
          });

        // console.log(user.uid)
        db.collection("teachers")
          .get()
          .then(teacher_querySnapshot => {
            teacher_querySnapshot.forEach(doc => {
              if (doc.data() && doc.data().selected_skills_keywords) {
                var teacher_data = doc.data();
                teacher_data["uid"] = doc.id;
                self.skills.push(teacher_data.selected_skills_keywords);
                self.loaded_teachers.push(teacher_data);
              }
            });
            db.collection("classroom")
              .get()
              .then(classroom_querySnapshot => {
                classroom_querySnapshot.forEach(doc => {

                  if(class_data && findbyId(
                    self.loaded_teachers,
                    doc.data().teacher_uid
                  ) && findbyId(
                    self.loaded_teachers,
                    doc.data().teacher_uid
                  ).selected_skills_keywords){
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
                  class_data["coordinate"] = self.findbyId(
                    self.loaded_teachers,
                    class_data.teacher_uid
                  ).coordinate;
                  if (class_data["coordinate"] && class_data["coordinate"].lat)
                    class_data["poi"] =
                      String(class_data["coordinate"]["lat"]) +
                      String(class_data["coordinate"]["lng"]);

                  // console.log(doc.data());
                  self.courses.push(class_data.coursename);
                  self.loaded_classrooms.push(class_data);

                  if (
                    self.findbyId(
                      self.loaded_teachers,
                      doc.data().teacher_uid
                    ) &&
                    self.findbyId(self.loaded_teachers, doc.data().teacher_uid)
                      .selected_skills_keywords
                  ) {
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
                    class_data["coordinate"] = self.findbyId(
                      self.loaded_teachers,
                      class_data.teacher_uid
                    ).coordinate;
                    if (
                      class_data["coordinate"] &&
                      class_data["coordinate"].lat
                    )
                      class_data["poi"] =
                        String(class_data["coordinate"]["lat"]) +
                        String(class_data["coordinate"]["lng"]);

                    // console.log(doc.data());
                    self.courses.push(class_data.coursename);
                    self.loaded_classrooms.push(class_data);
                  }
                });
                });
                });
                });
                var promises = [];
                  self.skills = self.skills.sort();
                  self.courses = _.uniq(self.courses);
                  self.courses = self.courses.sort();
                  // console.log(self.skills)
                });
=======
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
                })
                })
                  for(let teacher of self.loaded_teachers){
                    console.log(teacher.first_name, teacher.last_name)
                  }
                  console.log("I aint waiting for nuthin")
                
              });
          });
      }
    });
  }
};
</script>


<style >
body {
  overflow: hidden;
}
</style>
