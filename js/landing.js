    // Set the configuration for your app
  // TODO: Replace with your project's config object
  // Initialize Firebase
  var config = {
	apiKey: "AIzaSyBKKxWc5PQI7TX3z32sIFpZJwQ_62DV0ls",
	authDomain: "test-database-5c3f8.firebaseapp.com",
	databaseURL: "https://test-database-5c3f8.firebaseio.com",
	projectId: "test-database-5c3f8",
	storageBucket: "test-database-5c3f8.appspot.com",
	messagingSenderId: "206893838009"
  };
  firebase.initializeApp(config);
  // Get a reference to the database service
  var database = firebase.database();

  function writeUserData(userId, name, email, imageUrl) {
	firebase.database().ref('users/' + userId).set({
	  username: name,
	  email: email,
	  profile_picture : imageUrl
	});
  }

  console.log("a")
  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    }
  })
username = "no";