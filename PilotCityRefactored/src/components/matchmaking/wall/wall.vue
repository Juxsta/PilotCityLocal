<template>

</template>

<script>
import firebase from "@/firebase/init";
export default {
  data: {
    employers: [],
    teachers: [],
  },
  created() {
      var self = this
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const db = firebase.firestore();
        db.collection("employers")
          .get()
          .then(employer_query => {
            employer_query.forEach(doc => {
              var employer_data = doc.data();
              db.collection("Users")
                .doc(doc.id)
                .get()
                .then(name_doc => {
                  var name = name_doc.data();
                  employer_data["first_name"] = name.first_name;
                  employer_data["last_name"] = name.last_name;
                  self.employers.push(doc.data());
                  db.collection("teachers").get().then(teacher_query => {
                      teacher_query.forEach(doc => {
                          var teacher_data = doc.data()
                          db.collection("Users").doc(doc.id).get().then(name_doc => {
                              var name = name_doc.data()
                              teacher_data["first_name"] = name.first_name
                              teacher_data["last_name"] = name.last_name
                              self.teachers.push()
                          })
                      })
                  })
                });
            });
            var promises = [];
          });
      }
    });
  }
};
</script>
