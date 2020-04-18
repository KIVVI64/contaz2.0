<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>User Name</v-list-item-title>
            <v-list-item-subtitle>email@address.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list flat>
        <v-list-item-group v-model="item" color="primary">
          <v-list-item v-for="item in items" :to="item.url" :key="item.title">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>CONTAZ</v-toolbar-title>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawer: false,
    item: 1,
    items: [
      {
        title: "My Account",
        icon: "mdi-account-circle-outline",
        url: "/account"
      },
      { title: "Search", icon: "mdi-magnify", url: "/search" },
      {
        title: "Notifications",
        icon: "mdi-bell-outline",
        url: "/notifications"
      },
      { title: "Login / Register", icon: "mdi-account", url: "/sign-in" }
    ]
  })
};
</script>
