<template>
  <div>
    <Button @click="login()">login</Button>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  export default {
    layout: 'fullscreen',
    data() {
      return {

      }
    },
    created() {
      //Cookies.set('token', 'success');
    },
    methods: {
      login(){
        setTimeout("window.location = '/menu1/menu1-1';", 1000);
      }
    }
  }
</script>

<style scoped>

</style>
