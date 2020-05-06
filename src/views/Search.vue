<template>
  <div class="search">
    <v-row class="text-center">
      <v-col cols="12">
        <v-form @submit.prevent="submitSearch">
          <v-text-field
            solo
            rounted
            v-model="search"
            label="Search"
            type="search"
            append-icon="mdi-magnify"
            @click:append="submitSearch"
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>
    <v-list two-line subheader>
      <v-subheader inset>Users</v-subheader>

      <v-list-item v-for="item in usersList" :key="item.socialRef">
        <v-list-item-avatar color="primary">
          <img
            v-if="item.prof"
            :src="item.prof"
            :alt="item.name.slice(0, 2).toUpperCase()"
          />
          <span v-else class="grey--text text--lighten-4 avatar-text">
            {{ item.name.slice(0, 2).toUpperCase() + "." }}
          </span>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
          <v-list-item-subtitle v-text="item.nick"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-heart-outline</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
// import firebase from "firebase";
import db from "@/plugins/firebaseInit";
export default {
  name: "Search",
  data() {
    return {
      search: null,
      usersList: []
    };
  },
  methods: {
    submitSearch() {
      this.usersList = [];
      db.collection("accounts")
        .where("nick", "==", this.search)
        .get()
        .then(doc => {
          doc.forEach(element => {
            db.collection("users")
              .doc(element.data().userRef)
              .get()
              .then(user => {
                const data = {
                  uid: element.id,
                  nick: element.data().nick,
                  socialRef: element.data().socialRef,
                  userRef: element.data().userRef,
                  name: user.data().name,
                  prof: user.data().prof
                };
                this.usersList.push(data);
              });
          });
        });
    }
  }
};
</script>

<style scoped>
.avatar-text {
  font-size: 40px;
  font-weight: 900;
  font-style: italic;
}
</style>
