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

        <v-btn depressed color="primary" @click.prevent="socialEdit">
          Edit
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import firebase from "firebase";
import db from "@/plugins/firebaseInit";
export default {
  name: "EditSocial",
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
      db.collection("accounts")
        .doc(to.params.account_uid)
        .get()
        .then(doc => {
          next(vm => {
            vm.socialRef = doc.data().socialRef;
            vm.nick = doc.data().nick;
            vm.user_uid = user.uid;
            db.collection("socials")
              .doc(doc.data().socialRef)
              .get()
              .then(doc => {
                vm.url = doc.data().url;
                vm.logo = doc.data().logo;
              });
          });
        });
    }
  },
  methods: {
    socialEdit() {
      db.collection("accounts")
        .doc(this.$route.params.account_uid)
        .set({
          nick: this.nick,
          socialRef: this.socialRef,
          userRef: this.user_uid
        })
        .then(() => this.$router.push("/account"))
        // eslint-disable-next-line no-undef
        .catch(err => console.log(err.message));
    }
  }
};
</script>

<style scoped>
p {
  overflow-wrap: break-word !important;
}
</style>
