<template>
  <v-card-text>
    <h2>Chat Page {{user.name}}</h2>
    <p>Your Room is: {{user.room}}</p>
  </v-card-text>
</template>

 
<script>
  import {mapState} from 'vuex';

  export default {
    middleware: ["chat"],
    head() {
      return {
        title: `Room ${this.user.room}`
      };
    },
    computed: mapState(['user']),
  };
</script>