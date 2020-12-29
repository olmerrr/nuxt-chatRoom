<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8>
      <v-card min-width="360">
        <v-snackbar v-model="snackbar" :timeout="6000" top>
          {{ message }}
          <v-btn color="pink" flat @click="snackbar = false">Закрыть</v-btn>
        </v-snackbar>
        <v-card-title><h2>Nuxt chatRoom</h2></v-card-title>
        <v-card-text v-on:keyup.enter="submit">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="16"
              :rules="nameRules"
              label="Your Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="room"
              :rules="roomRules"
              label="Chat Room"
              required
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="submit"
            >
              Enter
            </v-btn>
            <v-btn color="warning" class="mr-4" @click="reset">
              Reset Form
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  layout: "empty",
  head: {
    title: "Welcome to chatRoom",
  },
  data: () => ({
    snackbar: false,
    message: "",
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 16) || "Name must be less than 16 characters",
    ],
    room: "",
    roomRules: [(v) => !!v || "Room is required"],
  }),
  mounted() {
    const { message } = this.$route.query;
    if (message === 'noUserd') {
      this.message = "Input Date";
    } else if (message === "leftChat") {
      this.message = "You left chatRoom";
    }
    this.snackbar = !!this.message;
  },
  sockets: {
    connect: function () {
      console.log("socket connected");
    },
  },
  methods: {
    enter() {
      console.log("enter");
    },
    ...mapMutations(["setUser"]),
    submit() {
      this.$refs.form.validate();
      const user = {
        name: this.name,
        room: this.room,
      };

      this.$socket.emit("userJoined", user, (data) => {
        if (typeof data === "string") {
          console.error(data);
        } else {
          user.id = data.userId;
          this.setUser(user);
          this.$router.push("/chat");
        }
      });
    },
    reset() {
      this.$refs.form.reset();
    },
  },
  components: {},
};
</script>

<style>
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
</style>