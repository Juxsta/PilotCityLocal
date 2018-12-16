<template>
  <div class="container-fluid mt-5 mx-auto Raleway main_div justify-content-center">
    <div class="row justify-content-left mr-5 pb-4">
      <div class="col-md-4 col-sm-12">
        <form>
          <div>
            <label for="lunch" class="labels">Birthdate</label>
            <br>
            <input
              type="date"
              name="birthday"
              placeholder="MM/DD/YYY"
              class="badge-pill pc-button"
              v-model="student_data.birthdate"
            >
          </div>
        </form>
      </div>
      <div class="col-md-6 col-sm-12">
        <form>
          <div class="badge_wider">
            <label for="address" class="labels">Home Address</label>
            <br>
            <input
              type="text"
              name="address"
              placeholder="123 Main Rd"
              class="badge-pill pc-button badge_wider"
              v-model="student_data.address"
            >
          </div>
        </form>
      </div>
    </div>
    <div class="row justify-content-left mr-5 pb-4">
      <div class="col-md-4 col-sm-12">
        <form>
          <div>
            <label for="ethnicity" class="labels">Ethnicity</label>
            <br>
            <input
              type="text"
              name="Ethnicity"
              placeholder="American"
              class="badge-pill pc-button"
              v-model="student_data.ethnicity"
            >
          </div>
        </form>
      </div>
      <div class="col-md-4 col-sm-12">
        <form>
          <div class="group labels">
            <label for="language" class="labels">Family Language</label>
            <br>
            <input
              type="text"
              placeholder="Spanish"
              class="badge-pill pc-button"
              v-model="student_data.family_language"
            >
          </div>
        </form>
      </div>
      <div class="col-md-4 col-sm-12">
        <form>
          <div class="group labels">
            <label for="gender" class="labels">Supergender</label>
            <br>
            <input
              type="text"
              placeholder="Transgender Female"
              class="badge-pill pc-button"
              v-model="student_data.supergender"
            >
          </div>
        </form>
      </div>
    </div>
    <div class="row justify-content-left mr-5 pb-4">
      <div class="col-md-4 col-sm-12">
        <form>
          <div class="group labels">
            <label for="lunch" class="labels">Free or Reduced Lunch?</label>
            <b-form-group id="exampleInputGroup3" label-for="exampleInput3">
              <b-form-select
                id="exampleInput3"
                :options="lunch"
                class="badge-pill pc-button"
                v-model="student_data.lunch_status"
              ></b-form-select>
            </b-form-group>
          </div>
        </form>
      </div>
    </div>
    <next_button route :conditions="conditions" :collection="collection"/>
  </div>
</template>



<script>
import { Prompter } from "@/main";
import button from "@/components/profile_builder/wizard/components/button.vue";
import firebase from "@/firebase/init";
import { TheMask } from "vue-the-mask";

export default {
  name: "w_student_demographic",
  data() {
    return {
      student_data: {
        birthdate: null,
        address: null,
        ethnicity: null,
        family_language: [],
        supergender: null,
        lunch_status: null
      },
      collection: ["students"],
      lunch: [{text:"Yes/No", value:null}, "yes", "no"]
    };
  },
  components: {
    next_button: button,
    TheMask
  },
  computed: {
    conditions() {
      return [this.student_data];
    }
  },
  created() {
    var self = this;
    //create an array reference to user and teacher data
    let data = [self.student_data, self.user_data];
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const db = firebase.firestore();
        for (let i = 0; i < self.collection.length; i++) {
          db.collection(self.collection[i])
            .doc(user.uid)
            .get()
            .then(doc => {
              let obj = doc.data();
              for (let field in data[i]) {
                if (obj.hasOwnProperty(field)) {
                  data[i][field] = obj[field];
                }
              }
            });
        }
      }
    });
  }
};
</script>



<style scoped>
.main_div {
  width: 80%;
  padding-top: 30px;
}
.story-title {
  text-align: left;
  font-family: "Raleway";
  font-style: Italic;
  font-weight: 700;
  font-size: 20px;
  color: #6eba7f;
  margin-bottom: 50px;
  margin-top: 70px;
}

.pc-button {
  font-family: "Raleway";
  font-weight: 300;
  font-style: Italic;
  background-color: #c5c5c5;
  color: white;
  border-radius: 50px;
  font-size: 20px;
  height: 50px;
  width: 250px;
  text-align: center;
  padding-left: 30px;
  padding-right: 30px;
  margin-left: 5px;
  margin-right: 5px;
  border-color: transparent;
}
.pc-button::placeholder {
  color: white;
  font-weight: 500i;
  font-size: 20px;
  text-align: center;
}
.teacher-story {
  color: green;
  font-size: 20px;
}
.text {
  color: #6eba7f;
}
.labels {
  color: #6eba7f !important;
  font-size: 20px;
}
.badge_wider {
  width: 610px;
}
@media only screen and (max-width: 700px){
#the_best_next_button {
    position: absolute;
  bottom: 35px;
  right: 15px;
  height: 45px;
  width: 165px;
  font-size: 2.5vh;
  
}
}
</style>
