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
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        console.log(this.$route.name)
        this.$router.push({ name: "Index", params: {to_path: this.$route.path} });
        $("#login-modal").modal("show");
        console.log("hi");
      }
    });
  }
};
</script>
