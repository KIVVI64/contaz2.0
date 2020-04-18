<template>
  <span>
    <v-tabs v-model="tabs" centered>
      <v-tab>Register</v-tab>
      <v-tab>Login</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tabs">
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <form @submit.prevent="register">
              <v-text-field
                v-model="r_name"
                label="Name"
                type="text"
                name="name"
                outlined
                required
              ></v-text-field>
              <v-text-field
                v-model="r_email"
                label="E-mail"
                type="email"
                outlined
                required
              ></v-text-field>
              <v-text-field
                v-model="r_password"
                label="Password"
                type="password"
                outlined
                required
              ></v-text-field>

              <v-snackbar v-model="snackbar">
                {{ l_err }}
                <v-btn color="error" text @click="snackbar = false">
                  Close
                </v-btn>
              </v-snackbar>

              <v-btn
                block
                outlined
                large
                color="primary"
                dark
                @click.prevent="register"
                >Register</v-btn
              >
            </form>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <form @submit.prevent="login">
              <v-text-field
                v-model="l_email"
                label="E-mail"
                type="email"
                outlined
                required
              ></v-text-field>
              <v-text-field
                v-model="l_password"
                label="Password"
                type="password"
                outlined
                required
              ></v-text-field>

              <v-snackbar v-model="snackbar">
                {{ l_err }}
                <v-btn color="error" text @click="snackbar = false">
                  Close
                </v-btn>
              </v-snackbar>

              <v-btn
                block
                outlined
                large
                color="primary"
                dark
                @click.prevent="login"
                >Login</v-btn
              >
            </form>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </span>
</template>

<script>
import firebase from "firebase";
import db from "@/plugins/firebaseInit";
export default {
  name: "SignIn",
  data() {
    return {
      tabs: null,
      snackbar: false,
      l_email: null,
      l_password: null,
      l_err: null,
      r_name: null,
      r_email: null,
      r_password: null,
      r_err: null
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.l_email, this.l_password)
        .then(
          () => {
            console.log(`Logged in`);
            if (this.$route.query.redirect) {
              this.$router.push(this.$route.query.redirect);
            } else {
              this.$router.push("/account");
            }
          },
          err => {
            this.l_err = err.message;
            this.snackbar = true;
          }
        );
    },
    register() {
      if (this.r_name) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.r_email, this.r_password)
          .then(
            cred => {
              // console.log("register", cred.user.uid);
              return db
                .collection("users")
                .doc(cred.user.uid)
                .set({
                  name: this.r_name
                });
            },
            err => {
              this.l_err = err.message;
              this.snackbar = true;
            }
          )
          .then(() => {
            this.$router.push("/account");
          });
      } else {
        this.l_err = "Provide us with your name";
        this.snackbar = true;
      }
    }
  }
};
</script>
