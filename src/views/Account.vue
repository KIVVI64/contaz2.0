<template>
  <div class="about">
    <h1>This is an account page</h1>
    <p>UID: {{ uid }}</p>
    <p>Name: {{ name }}</p>
    <p>Email: {{ email }}</p>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/plugins/firebaseInit";
export default {
  name: "About",
  data() {
    return {
      uid: null,
      name: "Name...",
      email: "Email...",
      prof: null
    };
  },
  beforeRouteEnter(to, from, next) {
    let user = firebase.auth().currentUser;
    console.log("User:" + user.uid);
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then(doc => {
          next(vm => {
            vm.email = user.email;
            vm.uid = user.uid;
            vm.name = doc.data().name;
          });
        });
    }
  }
};
</script>
