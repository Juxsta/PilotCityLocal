<template >
  <div>
    <router-view/>
  </div>
</template>

<script>
import firebase from "@/firebase/init";
export default {
  name: "matchmaking",
  created() {
    if (!this.$store.state.test) {
      firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          console.log(this.$route.name);
          this.$router.push({
            name: "Index",
            params: { to_path: this.$route.path }
          });
          $("#login-modal").modal("show");
          console.log("hi");
        } else {
          firebase
            .firestore()
            .collection("Users")
            .doc(user.uid)
            .get()
            .then(doc => {
              var user_data = doc.data();
              if (user_data.isEmployer) {
                firebase
                  .firestore()
                  .collection("employers")
                  .doc(user.uid)
                  .get()
                  .then(doc => {
                    var employer_data = doc.data();
                    if (
                      employer_data &&
                      employer_data.selected_challenge_keywords &&
                      employer_data.selected_challenge_keywords.length
                    )
                      this.$router.push({ name: "mm_employer" });
                    else this.$router.push({ name: "ClassPicker" });
                  });
              } else if (user_data.isTeacher) {
                firebase
                  .firestore()
                  .collection("teachers")
                  .doc(user.uid)
                  .get()
                  .then(doc => {
                    var teacher_data = doc.data();
                    if (
                      teacher_data &&
                      teacher_data.selected_skills_keywords &&
                      teacher_data.selected_skills_keywords.length
                    )
                      this.$router.push({ name: "mm_teacher" });
                    else this.$router.push({ name: "ClassPicker" });
                  });
              }
            });
        }
      });
    }
  }
};
</script>
