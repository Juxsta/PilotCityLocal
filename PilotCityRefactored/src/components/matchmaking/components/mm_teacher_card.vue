<template>
  <div class="d-flex flex-row">
    <div class="m-auto p-auto ranking_number">{{number + page*10 + 1  }}</div>
    <div
      class="card container col-10 ml-0"
      :class="{'card__teacher--active':number==active_card}"
      @click="$emit('teacherCardClicked')"
    >
      <div class="one d-flex flex-row">
        <h2 class="card-title">{{classroom.coursename | capitalize}}</h2>

        <div class="mt-3">
          <button
            @click="update_invite(),upload()"
            @mouseenter="temp = text, text = invite?text:'Cancel'"
            @mouseleave="text=temp"
            :class="{'action-button':invite, 'action-button-pending':pending, }"
          >{{text}}</button>
        </div>
        <!-- stupid heart -->
        <span id="favorite_border">
          <i
            class="material-icons justify-content-center pt-2 px-3"
            @click="likeThisCard"
            :id="classroom.uid"
            :style="{ color : amIliked ? '#eca0be' : '#dedfe0'}"
          >favorite_border</i>
          <b-popover
            class="favorite_popover"
            :target="'#'+classroom.uid"
            placement="topleft"
            triggers="hover"
          >Favorite this class!</b-popover>
        </span>
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
              <span>{{grade + 'th'}}</span>
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

      <div class="three">
        <hr class="card-line">
        <div class="container">
          <span class="d-flex row">
            <h4
              placement="bottom"
              :class="tags[Math.floor(Math.random()*Math.floor(7))]"
              v-for="(skill,index) in teacher.selected_skills_keywords"
              :key="index"
            >{{skill | capitalize}}</h4>
            <!-- Javascript C++ iOS  Android -->
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/SASS/components/_mm_teacher_card.scss";
import firebase from "@/firebase/init";
export default {
  data() {
    return {
      hover: false,
      text: "Invite",
      temp: "",
      tags: [
        "tag__skills--red",
        "tag__skills--green",
        "tag__skills--orange",
        "tag__skills--yellow",
        "tag__skills--purple",
        "tag__skills--pink",
        "tag__skills--blue"
      ]
    };
  },

  props: {
    classroom: {
      required: true
    },
    teacher: {
      required: true
    },
    invited: {
      required: false,
      type: Array
    },
    number: {
      required: true,
      type: Number
    },
    active_card: {
      required: true
    },
    page: {
      required: true
    },
    likedlist: {
      required: true,
    }
  },
  computed: {
    invite() {
      this.text = "Invited";
      var in_invite = this.invited.indexOf(this.classroom.uid) == -1;
      if (in_invite) this.text = "Invite";
      return in_invite;
    },
    pending() {
      return !this.invite;
    },
    amIliked(){
      return _.includes(this.likedlist, this.classroom.uid);
    }
  },
  methods: {
    likeThisCard(){
        var db = firebase.firestore();
        var self = this;
        var user_id = firebase.auth().currentUser.uid;
        var liked_cards = [];
        db.collection("employers").doc(user_id).get().then( doc => {
          var data = doc.data();
          if (data &&  data["match_making"] &&  data["match_making"]["liked_cards"])
            liked_cards = data["match_making"]["liked_cards"] ;
          else 
          {
            liked_cards = [];
            data["match_making"] = {}
          }
          if (!_.includes(liked_cards, this.classroom.uid))
            liked_cards.push(this.classroom.uid);
          else
            liked_cards = _.filter( liked_cards, card => { return card != this.classroom.uid})
  
          data["match_making"]["liked_cards"] = liked_cards;
          self.$emit('newlikedCardAction', self.classroom.uid);
          db.collection("employers").doc(user_id).update(data).catch(err => {
            self.$emit('newlikedCardAction', self.classroom.uid);
            alert(err.message);
          })
        });
    },
    update_invite(event) {
      if (!this.invite) {
        this.invited.splice(this.invited.indexOf(this.classroom.uid), 1);
      } else {
        this.invited.push(this.classroom.uid);
      }
    },
    upload() {
      var self = this;
      var payload = { invited: this.invited };
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          const db = firebase.firestore();
          db.collection("employers")
            .doc(user.uid)
            .set(payload, { merge: true });
        }
      });
      return true;
    }
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

<style>
.favorite_popover{
  justify-content: left,

}
</style>
