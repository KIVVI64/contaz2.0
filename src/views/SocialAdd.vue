<template>
  <v-row class="text-center">
    <v-col cols="12">
      <v-img :src="logo" class="my-3" contain height="100" />
      <p>
        {{ url }}<b>{{ nick }}</b>
      </p>
    </v-col>
    <v-col cols="12">
      <v-form @submit.prevent="login">
        <v-text-field v-model="nick" label="Nick" type="text"></v-text-field>

        <v-btn depressed color="primary" @click.prevent="socialAdd">Add</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import firebase from "firebase";
import db from "@/plugins/firebaseInit";
export default {
  name: "AddSocial",
  data() {
    return {
      url: null,
      logo: "",
      user_uid: null,
      nick: null,
      err: null
    };
  },
  beforeRouteEnter(to, from, next) {
    let user = firebase.auth().currentUser;
    if (user) {
      db.collection("socials")
        .doc(to.params.social_uid)
        .get()
        .then(doc => {
          next(vm => {
            vm.url = doc.data().url;
            vm.logo = doc.data().logo;
            vm.user_uid = user.uid;
          });
        });
    }
  },
  methods: {
    socialAdd() {
      db.collection("accounts")
        .doc()
        .set({
          nick: this.nick,
          socialRef: this.$route.params.social_uid,
          userRef: this.user_uid
        })
        .then(() => this.$router.push("/account"))
        .catch(err => console.log(err.message));
    }
  }
};
</script>

<style scoped>
p {
  overflow-wrap: break-word;
}
</style>
