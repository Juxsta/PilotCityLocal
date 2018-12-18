<template>
  <div class="d-flex flex-row">
    <div class="m-auto p-auto ranking_number">{{number + page*10 + 1 }}</div>
    <div
      class="card container col-10 ml-0"
      :class="{'card__teacher--active':number==active_card}"
      @click="$emit('employerCardClicked')"
    >
      <div class="one d-flex flex-row">
        <h2 class="card-title">{{employer.company_name | capitalize}}</h2>

        <div class="mt-3 ml-auto">
          <button
            @click="update_invite(),upload()"
            :class="{'action-button':invite, 'action-button-pending':pending}"
          >{{text}}</button>
          <!-- place holder button -->
          <!--Place holder [x]  -->
        </div>
        <i
          class="material-icons justify-content-center pt-2 px-3"
          id="favorite_border"
          @click="likeThisCard"
          :style="{ color : amIliked ? '#eca0be' : '#dedfe0'}"
        >favorite_border</i>
      </div>

      <div class="two d-flex flex-row">
        <div class="four ml-5 mr-3 pb-3 justify-content-start">
          <h4 class="card-subtitle">Liason</h4>
          <h4 class="card-subtitle">Industry</h4>
          <h4 class="card-subtitle">Sector</h4>
          <h4 class="card-subtitle">Address</h4>
        </div>
        <div class="five">
          <h4 class="card-subtitle-text text">
            <span>{{employer.first_name | capitalize}}</span>
            <span>{{" "}}</span>
            <span>{{employer.last_name | capitalize}}</span>
          </h4>
          <div class="container p-0 d-flex flex-row">
            <h4
              class="card-subtitle-text text row"
              v-for="(industry,index) in employer.selected_industry_keywords"
              :key="index"
            >
              <span>{{industry}}</span>
              <span v-if="index != employer.selected_industry_keywords.length-1">{{", "}}</span>
            </h4>
          </div>
          <div>
            <h4 class="card-subtitle-text text">
              <span>{{employer.sector | capitalize}}</span>
            </h4>
          </div>

          <h4 class="card-subtitle-text text">
            <span v-for="(field,index) in Object.keys(employer.address)" :key="index">
              <span>{{employer.address[field] | capitalize}}</span>
              <span v-if="index != (Object.keys(employer.address).length-1)">{{", "}}</span>
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
              v-for="(solution,index) in solutions"
              :key="index"
            >{{solution | capitalize}}</h4>
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
      // invite: true,
      // pending: false,
      text: "Invite",
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
    employer: {
      required: true,
      type: Object
    },
    invited: {
      required: true,
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
      var in_invite = this.invited.indexOf(this.employer.uid) == -1;
      if (in_invite) this.text = "Invited";
      return in_invite;
    },
    pending() {
      return !this.invite;
    },
    solutions() {
      var arr = [];
      let employer = this.employer;
      arr.push(employer.selected_service_keywords);
      arr.push(employer.selected_product_keywords);
      arr = _.flattenDeep(arr);
      arr = _.uniq(arr);
      return arr;
    },
    amIliked(){
      return _.includes(this.likedlist, this.employer.uid);
    }
  },
  methods: {
        likeThisCard(){
        var db = firebase.firestore();
        var self = this;
        var user_id = firebase.auth().currentUser.uid;
        var liked_cards = [];
        db.collection("teachers").doc(user_id).get().then( doc => {
          var data = doc.data();
          if (data &&  data["match_making"] &&  data["match_making"]["liked_cards"])
            liked_cards = data["match_making"]["liked_cards"] ;
          else 
          {
            liked_cards = [];
            data["match_making"] = {}
          }
          if (!_.includes(liked_cards, self.employer.uid))
            liked_cards.push(self.employer.uid);
          else
            liked_cards = _.filter( liked_cards, card => { return card != self.employer.uid})
  
          data["match_making"]["liked_cards"] = liked_cards;
          db.collection("teachers").doc(user_id).update(data).then( ()=> {
            self.$emit('newlikedCardAction', self.employer.uid);
          });
        });
    },
    update_invite(event) {
      // this.invite = !this.invite;
      // this.pending = !this.pending;
      if (!this.invite) {
        this.text = "Invite";
        this.invited.splice(this.invited.indexOf(this.employer.uid), 1);
      } else {
        this.text = "Invited";
        this.invited.push(this.employer.uid);
      }
    },
    upload() {
      var self = this;
      var payload = { invited: this.invited };
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          const db = firebase.firestore();
          db.collection("teachers")
            .doc(user.uid)
            .set(payload, { merge: true });
        }
      });
      return true;
    },
    check_invited() {}
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
