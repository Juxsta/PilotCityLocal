<template>
  <div v-if="render">
    <!-- random -->
    <div class="entire-box d-flex flex-row">
      <div class="d-flex col-8 justify-content-center m-0 p-0">
        <div class="leftside justify-content-center flex-column d-flex col-12 p-0 m-0">
          <div class="filter-bar justify-content-center d-flex flex-row">
            <mm_filter
              :options="industry"
              :selected_options="filtered_industry"
              :show="show"
              @click.native="changeShow('Industry')"
              name="Industry"
            />
            <mm_filter
              :options="sector"
              :selected_options="filtered_sector"
              @click.native="changeShow('Sector')"
              :show="show"
              name="Sector"
            />
            <mm_filter
              :options="solutions"
              :selected_options="filtered_solutions"
              @click.native="changeShow('Solutions')"
              :show="show"
              name="Solutions"
            />
            <mm_filter
              :options="location"
              :selected_options="filtered_location"
              @click.native="changeShow('Location')"
              :show="show"
              name="Location"
            />
          </div>
          <div class="cardstock" id="results">
            <h2 class="text-classroom-matches" id="recommended">
              <!-- <span>{{filter_list.length}}</span> -->
              <span>{{filter_list.length}}+ Employers Recommended</span>
            </h2>
            <mm_employer_card
              v-for="(employer,index) in render_class"
              v-if="employer.first_name"
              :id="employer.uid"
              :key="index"
              :employer="employer"
              :invited="invited"
              :number="index"
              :page="page"
              :active_card="active_card"
              class="row-12 card-teacher-match"
              :likedlist="liked_cards"
              @employerCardClicked="highlight_pin(findbyId(loaded_employers,employer.uid), index)"
              @newlikedCardAction="doNewlikedCardAction"
            />
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
          name="teacher_gm"
          :map_data="map_data"
          :apikey="apikey"
          :mapcenter="mapcenter"
          role="teacher"
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
import mm_employer_card from "@/components/matchmaking/components/mm_employer_card.vue";
import GoogleMap from "@/components/map/GoogleMap";
import { GEOCODEKEY } from "@/main";
import Fuse from "fuse.js";
import { createECDH } from "crypto";

import axios from "axios";
export default {
  name: "mm_teacher",
  data() {
    return {
      allClasses: null,
      active_card: null,
      liked_cards: [],
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
      render: false,
      page: 0,
      industry: ["stuff", "placeholder"],
      filtered_industry: [],
      sector: ["Industry", "Government", "Education", "Community"],
      filtered_sector: [],
      solutions: [],
      filtered_solutions: [],
      location: [],
      interests: [],
      filtered_interests: [],
      filtered_location: [],
      loaded_employers: [],
      recmd: [],
      invited: [],
      show: null
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
        this.filtered_location.length == 0 &&
        this.filtered_industry.length == 0 &&
        this.filtered_solutions.length == 0 &&
        this.filtered_sector.length == 0
      )
        return this.loaded_employers;
      // definition of an unique class array: elements' coursename can't be duplicated, teacher_uid is Ok.
      var key = ""; // the key we use to search, consist of params from filter.
      // var duplicated_results = []; // the result may be duplicate since we have industry with different periods
      // var filtered_result = []; // the final array we return, all classrooms here are unique
      this.search_options.keys = [];
      // pull all the parameters from the filter, concatenate them into a string called 'key' //
      // only search for relavant keys based on the difference of params

      var target = _.cloneDeep(this.loaded_employers);

      if (this.filtered_location && this.filtered_location.length) {
        key += String(this.filtered_location);
        this.search_options.keys.push("address.city");
        this.search_options.matchAllTokens = true;
        fuse = new Fuse(target, this.search_options);
        target = fuse.search(key);
        this.search_options.matchAllTokens = false;
      }
      if (this.filtered_industry && this.filtered_industry.length) {
        key += String(this.filtered_industry);
        this.search_options.keys.push("selected_industry_keywords");
      }
      if (this.filtered_sector && this.filtered_sector.length) {
        key += String(this.filtered_sector);
        this.search_options.keys.push("sector");
      }
      if (this.filtered_solutions && this.filtered_solutions.length) {
        key += String(this.filtered_solutions);
        this.search_options.keys.push("selected_service_keywords");
        this.search_options.keys.push("selected_product_keywords");
      }

      // ======= Testing Purpose =======
      // console.log(key);
      // console.log(this.search_options.keys)
      // ==================================
      // fuse.js initialization
      var fuse = new Fuse(target, this.search_options);
      // employers are unque
      // uniqueness check
      /*
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
      */
      return fuse.search(key);
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
    mm_employer_card,
    mm_filter,
    GoogleMap
  },
  methods: {
     doNewLikedCardAction(uid) {
      if (_.includes(this.liked_cards, uid))
        this.liked_cards = _.filter(this.liked_cards, card_uid => {
          return card_uid != uid;
        });
      else this.liked_cards.push(uid);
    },
    retrieveLikedCard(uid) {
      var self = this;
      const db = firebase.firestore();
      db.collection("teachers")
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
    getMuddersResult(uid) {
      var MUDDERSLINK =
        "http://35.197.64.87:5000/matchmaker/employerranking?classroom_id=";
      return axios.get(MUDDERSLINK + uid);
    },
    retrievedCardsWithMudderUIDS(user, uids) {
      var self = this,
        db = firebase.firestore();
      db.collection("employers")
        .get()
        .then(ss => {
          var filter_arr = [],
            all = [];
          ss.forEach(doc => {
            all.push(doc);
          });
          var temp;
          for (let i = 0; i < uids.length; i++) {
            temp = _.find(all, arr => {
              return arr.id == uids[i];
            });
            if (temp) filter_arr.push(temp);
          }
          self.retrievedTheWholeList(user, filter_arr);
        });
    },
    changeShow(name) {
      console.log("show changede");
      this.show = name;
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
    highlight_pin(employer, index) {
      if (this.active_card == index) this.active_card = -1;
      else this.active_card = index;
      if (employer.coordinate) this.mapcenter = employer.coordinate;
      else console.log("This employer does not have coordinate!");
    },
    getEmployers(employers) {
      if (!employers) {
        console.log("retrieve from db")
        return db.collection("employers").get();
      } else {
        console.log(employers);
        return new Promise(function(resolve, reject) {
          resolve(employers);
        });
      }
    },
    retrievedTheWholeList(user, employers) {
      var self = this;
      self.getEmployers(employers)
        .then(employer_querySnapshot => {
          employer_querySnapshot.forEach(doc => {
            var employer_data = (typeof doc.data == "function") ? doc.data() : doc;
            // console.log(employer_data)
            if (
              employer_data.selected_challenge_keywords &&
              employer_data.selected_challenge_keywords.length
            ) {
              employer_data["uid"] = doc.id;
              if (employer_data["coordinate"] && employer_data["coordinate"].lat)
                employer_data["poi"] =
                  String(employer_data["coordinate"]["lat"]) +
                  String(employer_data["coordinate"]["lng"]);
              self.industry.push(employer_data.selected_industry_keywords);
              self.solutions.push(employer_data.selected_service_keywords);
              self.solutions.push(employer_data.selected_product_keywords);
              self.location.push(employer_data.address.city);
              self.interests.push(employer_data.selected_challenge_keywords);
              self.interests.push(employer_data.selected_bottom_line_keywords);
              self.loaded_employers.push(employer_data);
            }
          });
          // console.log("hi");
          self.solutions = _.flattenDeep(self.solutions);
          var filters = [self.industry, self.location, self.solutions];
          self.industry = _.flattenDeep(self.industry);
          self.industry = _.uniq(self.industry).sort();
          self.industry = self.industry.filter(field => field);
          self.location = _.flattenDeep(self.location);
          self.location = _.uniq(self.location).sort();
          self.location = self.location.filter(field => field);
          self.solutions = _.flattenDeep(self.solutions);
          self.solutions = _.uniq(self.solutions).sort();
          self.solutions = self.solutions.filter(field => field);
          // console.log("here");
          var promises = [];
          for (
            let employer = 0;
            employer < self.loaded_employers.length;
            employer++
          ) {
            // console.log("waiting");

            // timeout to stop firebase from overloading with requests
            promises.push(
              new Promise(function(resolve, reject) {
                setTimeout(() => {
                  db.collection("Users")
                    .doc(self.loaded_employers[employer]["uid"])
                    .get()
                    .then(doc => {
                      console.log("got it");
                      var user_data = doc.data();
                      // console.log(user_data)
                      if (user_data) {
                        self.loaded_employers[employer]["first_name"] =
                          user_data.first_name;
                        self.loaded_employers[employer]["last_name"] =
                          user_data.last_name;
                      }
                      return resolve();
                    });
                }, 200);
              })
            );
          }
          Promise.all(promises).then(val => {
            db.collection("teachers")
              .doc(user.uid)
              .get()
              .then(doc => {
                //
                if (
                  doc.data() &&
                  doc.data()["match_making"] &&
                  doc.data()["match_making"]["liked_cards"]
                )
                  self.liked_cards = doc.data()["match_making"]["liked_cards"];
                else self.liked_cards = [];
                // moved here
                if (doc.data())
                  self.invited = doc.data().invited
                self.render = true;
                console.log("rendered");
              });
          });
        });
    },
  },
  mounted(){
    var self = this;
    this.$on("markerClicked", function(key, position) {
      self.mapcenter = position;
      self.scrollToThatCard(uid);
      setTimeout(() => {self.scrollToThatCard(uid);}, 500);
    });
  },
  created() {
    const db = firebase.firestore();
    var self = this;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        var uid = "ZGStpiVL7lVNZWNvOiLVWR4IHXO2" || user.uid; // since the test account is not working correctly we use a temp uid,
        // for production environment, just remove the uid to null or set uid = user.uid
        db.collection("teachers").doc(uid).get().then( doc => {
          if (doc.data()){
            uid = doc.data().classes[0].uid;
            try {
              self.getMuddersResult(uid).then(result => {
                var ret_arr = result.data.result || [];
                // if the status is not 200 then there's something wrong, since we got no result from the mudder,
                // we just go an fetch the whole list
                if (result.status != 200 || ret_arr.length == 0)
                  self.retrievedTheWholeList(user);
                // Eric's original code
                // if we do have the result from mudder, we do retrievedCardsWithMudderUIDS
                else {
                  self.retrievedCardsWithMudderUIDS(user, ret_arr); // this is just temporarily purpose
                }
              });
            }
            catch (err){
              db.collection("rankings").doc(uid).get().then(doc => {
                var ret_arr = [];
                if (doc.data() && doc.data().rankings){
                  ret_arr = doc.data().rankings;
                }
                if (ret_arr.length)
                  self.retrievedCardsWithMudderUIDS(user, ret_arr);
                else 
                  self.retrievedTheWholeList(user);
              })
            }
          }
        });
        
        self.retrieveLikedCard(user.uid);
      }
    });
  }
};
</script>


<style lang='scss'>
@import "@/assets/SASS/utils/_variables.scss";
$primary: $pink;
body {
  overflow: hidden;
}
@import "@/assets/SASS/pages/_matchmaking.scss";
</style>
