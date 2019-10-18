<template>
  <div>
    1234
  </div>
</template>

<script>
  export default {
    components: {

    },
    data () {
      return {

      }
    },
    created() {
      //this.hh();
    },
    methods: {

    }
  }
</script>

<style scoped>
.header-layout{
  height: 60px;
  line-height: 60px;
  width: 100%;
  background: #dddddd;
  position: fixed;
  z-index: 2;
}
.left-nav{
  float: left;
  width: 200px;
  height: 100%;
  background: #ffffff;
  position: fixed;
  top: 60px;
}
.right-nav{
  margin-left: 200px;
  text-align: left;
  border-left:1px solid #dddddd;
  background: #f8f8f9;
  padding:10px 10px;
  position: relative;
  top:60px;
  z-index: 1;
}
.clearfix{
  clear: both;
}
.header-layout-logo{
  width: 200px;
  height: 100%;
  text-align: center;
  background: #eeeeee;
  float: left;
}
.header-layout-menu{
  margin-left: 200px;
}
.hidden{
  display: none !important;
}
.show{
  display: block !important;
}
</style>
