 <template>
  <div v-if="render">
    <!-- random -->
    <div class="entire-box d-flex flex-row">
      <div class="d-flex col-8 justify-content-center m-0 p-0">
        <div class="leftside justify-content-center flex-column d-flex col-12 p-0 m-0">
          <div class="filter-bar justify-content-center d-flex flex-row" id="m-filter-bar">
            <mm_filter
              :options="courses"
              :selected_options="filtered_courses"
              :show="show"
              name="Courses"
            />
            <mm_filter
              :options="skills"
              :selected_options="filtered_skills"
              :show="show"
              name="Skills"
            />
            <mm_filter
              :options="grades"
              :selected_options="filtered_grades"
              :show="show"
              name="Grades"
            />
            <mm_filter
              :options="locations"
              :selected_options="filtered_locations"
              :show="show"
              name="Location"
            />
            <mm_filter
              :options="class_size"
              :selected_options="filtered_class_size"
              :show="show"
              name="Class Size"
            />
          </div>
          <div class="cardstock" id="results">
            <h2 class="text-classroom-matches" id="recommended">
              <span>{{(results=='recommended')?(filter_list.length):(results=='invited')?(invited.length):(liked_cards.length)}}</span>
              <span>+ Classrooms Listed</span>
              <div class="mt-4 text-center">
                <b-btn-group>
                  <b-button
                    @click="results='recommended',page=0"
                    class="results__btngroup col-4"
                    :class="{'results__btngroup--active':results=='recommended'}"
                  >Recommended</b-button>
                  <b-button
                    @click="results='invited',page=0"
                    class="results__btngroup col-4"
                    :class="{'results__btngroup--active':results=='invited'}"
                  >Invited</b-button>
                  <b-button
                    @click="results='saved',page=0"
                    class="results__btngroup col-4"
                    :class="{'results__btngroup--active':results=='saved'}"
                  >Saved</b-button>
                </b-btn-group>
              </div>
            </h2>
            <mm_teacher_card
              :id="classroom.uid"
              v-if="loaded_teachers[index]"
              :classroom="classroom"
              :teacher="findbyId(loaded_teachers,classroom.teacher_uid)"
              v-for="(classroom,index) in render_class"
              :key="index"
              :invited="invited"
              :number="index"
              :page="page"
              :active_card="active_card"
              class="row-12 card-teacher-match"
              :likedlist="liked_cards"
              @teacherCardClicked="highlight_pin(findbyId(loaded_teachers,classroom.teacher_uid), index)"
              @newLikedCardAction="doNewLikedCardAction"
            />
            <!-- :likedlist=likedlist -->
            <div class="d-flex mm__pagination--row">
              <b-btn
                class="prevpage__btn justify-content-start"
                @click="page=(page>0)?page-1:page"
                v-scroll-to="{el:'#recommended',container:'#results'}"
              >Previous</b-btn>
              <b-btn
                class="nextpage__btn ml-auto"
                @click="page=page+1"
                v-scroll-to="{el:'#recommended',container:'#results'}"
              >Next</b-btn>
            </div>
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

import axios from "axios";

export default {
  name: "mm_employer",
  data() {
    return {
      allClasses: null,
      active_card: null,
      liked_cards: [],
      apikey: GEOCODEKEY.key,
      results: "recommended",
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
      class_size: ["0-10", "11-15", "16-20", "21-25", "26-30"],
      filtered_class_size: [],
      show: null,
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
      invited: []
    };
  },
  computed: {
    listByPage() {
      var big_arr = [];
      var i = -1;
      do {
        i++;
        big_arr.push(this.page_uids(i));
      } while (this.page_uids(i)[0] != this.page_uids(i + 1)[0]);
      return big_arr;
    },
    render_class() {
      var display_list = [];
      var to_move = [];
      if (this.results == "recommended") {
        display_list = this.filter_list;
      } else if (this.results == "invited") {
        to_move = _.filter(this.loaded_classrooms, obj => {
          return _.find(this.invited, invitee => invitee == obj.uid);
        });
        display_list.push(to_move, this.loaded_classrooms);
        display_list = _.flattenDeep(display_list);
        display_list = _.uniq(display_list);
      } else if (this.results == "saved") {
        to_move = _.filter(this.loaded_classrooms, obj => {
          return _.find(this.liked_cards, likee => likee == obj.uid);
        });
        display_list.push(to_move, this.loaded_classrooms);
        display_list = _.flattenDeep(display_list);
        display_list = _.uniq(display_list);
      }

      var to_display = 10; // number of classes to display per page
      if (
        this.page * to_display + to_display - display_list.length >
        to_display
      )
        this.page =
          parseInt((display_list.length - to_display) / to_display) + 1;
      var min = this.page > 0 ? (this.page - 1) * to_display + to_display : 0;
      var max = this.page * to_display + to_display;
      return display_list.slice(min, max);
    },
    filter_list() {
      // definition of an unique class array: elements' coursename can't be duplicated, teacher_uid is Ok.
      var key = ""; // the key we use to search, consist of params from filter.
      var duplicated_results = []; // the result may be duplicate since we have courses with different periods
      var filtered_result = []; // the final array we return, all classrooms here are unique
      this.search_options.keys = [];
      // pull all the parameters from the filter, concatenate them into a string called 'key' //
      // only search for relavant keys based on the difference of params
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

      if (this.filtered_courses && this.filtered_courses.length) {
        key += String(this.filtered_courses);
        // only course name is relavant in this case
        this.search_options.keys.push("coursename");
      }

      if (this.filtered_skills && this.filtered_skills.length) {
        key += String(this.filtered_skills);
        this.search_options.keys.push("selected_skills_keywords");
        this.search_options.keys.push("selected_industry_keywords");
      }
      if (this.filtered_locations && this.filtered_locations.length) {
        key += String(this.filtered_locations);
        this.search_options.keys.push("school_address.city");
        this.search_options.keys.push("school_district");
        this.search_options.keys.push("school_name");
      }
      key = key.replace(/\s,/g, "");
      // if no params is selected from the filter, we return the whil array.
      if (key == "") return this.loaded_classrooms;

      // ======= Testing Purpose =======
      // console.log(key);
      // console.log(this.search_options.keys)
      // ==================================
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
    scrollToThatCard(uid) {
      var self = this;
      for (let i = 0; i < self.listByPage.length; i++)
        if (_.includes(self.listByPage[i], uid)) this.page = i;
      var el = document.getElementById(uid);
      if (el) {
        el.scrollIntoView({ block: "center" });
        this.active_card = uid;
        return true;
      }
      return false;
    },
    page_uids(page) {
      var to_display = 10; // number of classes to display per page
      if (page * to_display + to_display - this.filter_list.length > to_display)
        page =
          parseInt((this.filter_list.length - to_display) / to_display) + 1;
      var min = page > 0 ? (page - 1) * to_display + to_display : 0;
      var max = page * to_display + to_display;
      var temp_list = this.filter_list.slice(min, max);
      return temp_list.map(obj => {
        return obj.uid;
      });
    },
    getMuddersResult(uid, user) {
      // var MUDDERSLINK =
      //   "http://35.197.64.87:5000/matchmaker/classroomranking?employer_id=";
      // return axios.get(MUDDERSLINK + uid);
      return firebase
        .firestore()
        .collection("rankings")
        .doc(user.uid)
        .get();
    },
    doNewLikedCardAction(uid) {
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
    },
    retrieveLikedCard(uid) {
      var self = this;
      const db = firebase.firestore();
      db.collection("employers")
        .doc(uid)
        .get()
        .then(doc => {
          if (
            doc.data() &&
            doc.data()["match_making"] &&
            doc.data()["match_making"]["liked_cards"]
          )
            self.liked_cards = doc.data()["match_making"]["liked_cards"];
          else self.liked_cards = [];
          // console.log(self.liked_cards)
        });
    },
    getClassrooms(classes) {
      if (!classes) {
        return db.collection("classroom").get();
      } else
        return new Promise(function(resolve, reject) {
          resolve(classes);
        });
    },
    retrievedTheWholeList(user, classes) {
      var self = this;
      db.collection("teachers")
        .get()
        .then(teacher_querySnapshot => {
          teacher_querySnapshot.forEach(doc => {
            var teacher_data = doc.data();
            teacher_data["uid"] = doc.id;
            self.skills.push(teacher_data.selected_skills_keywords);
            self.loaded_teachers.push(teacher_data);
          });
          self.getClassrooms(classes).then(classroom_querySnapshot => {
            classroom_querySnapshot.forEach(doc => {
              var class_data = typeof doc.data == "function" ? doc.data() : doc;
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
              self.recmd = _.cloneDeep(self.loaded_classrooms);
            });
            var promises = [];
            // async getNames(){
            for (
              let teacher = 0;
              teacher < self.loaded_teachers.length;
              teacher++
            ) {
              promises.push(
                new Promise(function(resolve, reject) {
                  setTimeout(() => {
                    db.collection("Users")
                      .doc(self.loaded_teachers[teacher]["uid"])
                      .get()
                      .then(doc => {
                        var user_data = doc.data();
                        if (user_data) {
                          self.loaded_teachers[teacher]["first_name"] =
                            user_data.first_name;
                          self.loaded_teachers[teacher]["last_name"] =
                            user_data.last_name;
                        } else
                          console.log(
                            "broken id: ",
                            self.loaded_teachers[teacher]["uid"]
                          );

                        return resolve();
                      });
                    // console.log("timeout")
                  }, 300);
                })
              );
            }
            // }

            Promise.all(promises).then(val => {
              db.collection("employers")
                .doc(user.uid)
                .get()
                .then(doc => {
                  // console.log(doc.data())
                  if (doc.data().invited) self.invited = doc.data().invited;
                });
              self.render = true;
              self.skills = _.flattenDeep(self.skills);
              self.skills = _.uniq(self.skills);
              self.skills = self.skills.filter(skill => skill);
              self.skills = self.skills.sort();
              self.courses = _.uniq(self.courses);
              self.courses = self.courses.sort();
              // console.log("rendered")
            });
          });
        });
    },
    retrievedCardsWithMudderUIDS(user, uids) {
      var self = this,
        db = firebase.firestore();
      db.collection("classroom")
        .get()
        .then(ss => {
          var filter_arr = [],
            all = [];
          ss.forEach(doc => {
            all.push(doc.data());
          });
          var temp;
          for (let i = 0; i < uids.length; i++) {
            temp = _.find(all, arr => {
              return arr.uid == uids[i];
            });
            if (temp) filter_arr.push(temp);
          }
          self.retrievedTheWholeList(user, filter_arr);
        });
    }
  },
  mounted() {
    var self = this;
    this.$on("markerClicked", function(uid, position) {
      self.mapcenter = position;
      self.scrollToThatCard(uid);
      setTimeout(() => {
        self.scrollToThatCard(uid);
      }, 500);
    });
  },
  created() {
    // console.log("hi")
    var self = this;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        var uid = "GZ9T2h4u6DhX4DWcbk5z6oFtkmC2" || user.uid; // since the test account is not working correctly we use a temp uid,
        // for production environment, just remove the uid to null or set uid = user.uid
        try {
          self.getMuddersResult(uid).then(result => {
            var ret_arr = result.data.result || [];
            // if the status is not 200 then there's something wrong, since we got no result from the mudder,
            // we just go an fetch the whole list
            //console.log(ret_arr)
            if (result.status != 200 || ret_arr.length == 0)
              self.retrievedTheWholeList(user);
            // Eric's original code
            // if we do have the result from mudder, we do retrievedCardsWithMudderUIDS
            else {
              self.retrievedCardsWithMudderUIDS(user, ret_arr); // this is just temporarily purpose
            }
          });
        } catch (err) {
          db.collection("rankings")
            .doc(uid)
            .get()
            .then(doc => {
              var ret_arr = [];
              if (doc.data() && doc.data().rankings) {
                ret_arr = doc.data().rankings;
              }
              if (ret_arr.length)
                self.retrievedCardsWithMudderUIDS(user, ret_arr);
              else self.retrievedTheWholeList(user);
            });
        }

        self.retrieveLikedCard(user.uid);
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
