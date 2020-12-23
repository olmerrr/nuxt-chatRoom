<template>
  <h2>Chat Page {{user.name}}</h2>
</template>

 
<script>
  import {mapState} from 'vuex';

  export default {
    middleware: ["chat"],
    computed: mapState(['user']),
  };
</script>