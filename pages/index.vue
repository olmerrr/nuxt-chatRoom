<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6></v-flex>
      <v-btn @click="sendMessage">
        New Message
      </v-btn>
  </v-layout>
</template>

<script>
export default {
  sockets: {
        connect: function () {
            console.log('socket connected')
        },
    },
  methods: {
    sendMessage() {
        this.$socket.emit('createMessage', {
          text: 'FROM-CLIENT'
        })
    },
  },
  components: {}
};
</script>
