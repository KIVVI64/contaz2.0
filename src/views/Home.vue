<template>
  <v-row class="text-center">
    <v-col cols="12">
      <v-img
        :src="require('@/assets/logo.png')"
        class="my-3"
        contain
        height="200"
      />
    </v-col>

    <v-col class="mb-4">
      <h1 class="display-2 font-weight-bold mb-3">
        Welcome to CONTAZ
      </h1>

      <p class="subheading font-weight-regular">
        Connect your social media
      </p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Home"
};
</script>
