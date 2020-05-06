import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase";
import Home from "../views/Home.vue";
import SignIn from "../views/SignIn.vue";
import Search from "../views/Search.vue";
import Account from "../views/Account.vue";
import SocialAdd from "../views/SocialAdd.vue";
import SocialEdit from "../views/SocialEdit.vue";
import ViewNotFound from "../views/ViewNotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Contaz - Home"
    }
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn,
    meta: {
      title: "Contaz - SignIn"
    }
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    meta: {
      requiresAuth: true,
      title: "Contaz - Search"
    }
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
    meta: {
      requiresAuth: true,
      title: "Contaz - Account"
    }
  },
  {
    path: "/add/:social_uid",
    name: "AddSocial",
    component: SocialAdd,
    meta: {
      requiresAuth: true,
      title: "Contaz - Add Social"
    }
  },
  {
    path: "/edit/:account_uid",
    name: "EditSocial",
    component: SocialEdit,
    meta: {
      requiresAuth: true,
      title: "Contaz - Edit Social"
    }
  },
  {
    path: "*",
    name: "ViewNotFound",
    component: ViewNotFound,
    meta: {
      requiresAuth: true,
      title: "Contaz - 404"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// Nav Guards
router.beforeEach((to, from, next) => {
  // Set page title
  document.title = to.meta.title || "Contaz";
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NOT logged in
    if (!firebase.auth().currentUser) {
      // Go to login page
      next({
        path: "/sign-in",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    next();
  }
});

export default router;
