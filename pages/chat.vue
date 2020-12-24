<template>
  <div>
    <v-card-text>
        <ul>
          <li v-for="message in messages" 
            :key="message.text">
            {{message.text}}
          </li>
        </ul>
      </v-card-text>
   </div>
</template>

 
<script>
import { mapState } from "vuex";

export default {
  middleware: ["chat"],
  head() {
    return {
      title: `Room ${this.user.room}`,
    };
  },
  computed: mapState(["user", "messages"]),
};
</script>
