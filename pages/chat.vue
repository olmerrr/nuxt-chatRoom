<template>
  <h2>Chat Page {{user.name}}</h2>
</template>

 
<script>
  import {mapState} from 'vuex';
  export default {
    computed: mapState(['user']),
  };
</script>