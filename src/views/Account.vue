<template>
  <div>
    <v-card class="d-flex justify-center align-center" flat>
      <v-card class="pa-2" flat>
        <v-avatar size="128" color="primary" style="border-radius: 50%">
          <img v-if="prof" :src="prof" :alt="name.slice(0, 2).toUpperCase()" />
          <span v-else class="white--text avatar-text">
            {{ name.slice(0, 2).toUpperCase() + "." }}
          </span>
        </v-avatar>
      </v-card>
      <v-card class="pa-2" flat>
        <h1 class="font-weight-light">{{ name }}</h1>
        <h4 class="overline">{{ email }}</h4>
        <!--<div>Additional info, a bunch ofd info, even more info!</div>-->
      </v-card>
    </v-card>

    <v-list subheader>
      <v-subheader>MY SOCIALS</v-subheader>

      <v-list-item v-for="account in mySocials" :key="account.uid">
        <v-list-item-avatar tile>
          <v-img
            :src="searchInObject(allSocials, account.socialRef).logo"
            :alt="searchInObject(allSocials, account.socialRef).name"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="account.nick"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <router-link
            :to="{ name: 'EditSocial', params: { account_uid: account.uid } }"
          >
            <v-icon>mdi-pencil-outline</v-icon>
          </router-link>
        </v-list-item-icon>
      </v-list-item>
      <p v-if="!mySocials[0]" class="text-center">
        Add your first social below
      </p>
    </v-list>

    <v-divider></v-divider>

    <v-list subheader>
      <v-subheader>ADD MORE</v-subheader>

      <v-list-item v-for="social in allSocials" :key="social.uid">
        <v-list-item-avatar tile>
          <v-img :src="social.logo" :alt="social.name"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="social.name"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <router-link
            :to="{ name: 'AddSocial', params: { social_uid: social.uid } }"
          >
            <v-icon>mdi-plus</v-icon>
          </router-link>
        </v-list-item-icon>
      </v-list-item>
      <v-progress-linear
        v-if="!allSocials[0]"
        indeterminate
        color="primary"
      ></v-progress-linear>
    </v-list>
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
      prof: null,
      mySocials: [],
      allSocials: []
    };
  },
  created() {
    let user = firebase.auth().currentUser;
    if (user) {
      this.email = user.email;
      this.uid = user.uid;
    }
    // List all social
    db.collection("socials")
      .get()
      .then(doc => {
        doc.forEach(element => {
          const data = {
            uid: element.id,
            name: element.data().name,
            logo: element.data().logo,
            url: element.data().url
          };
          this.allSocials.push(data);
        });
      });
    // List user social
    db.collection("accounts")
      .where("userRef", "==", user.uid)
      .get()
      .then(doc => {
        doc.forEach(element => {
          const data = {
            uid: element.id,
            nick: element.data().nick,
            socialRef: element.data().socialRef
          };
          this.mySocials.push(data);
        });
      });
  },
  methods: {
    searchInObject(objects, toSearch) {
      for (var i = 0; i < objects.length; i++) {
        for (let key in objects[i]) {
          if (objects[i][key].indexOf(toSearch) !== -1) {
            return objects[i];
          }
        }
      }
    }
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

<style scoped>
.avatar-text {
  font-size: 110px;
  font-weight: 900;
  font-style: italic;
}
h1 {
  line-height: 1;
}
h4 {
  font-size: 1rem !important;
}
.v-avatar {
  border: none;
}
</style>
