<template>
  <div>
    <div class="titleClass">
      测试标题
    </div>
    <div class="contentClass">
      <p>123</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  created() {

  },
  methods:{
    init(){

    }
  }
}
</script>

<style scoped>
  .titleClass{
    text-align: center;
    font-weight: bold;
    font-size: 15px;
    padding:5px 0px;
    border-bottom: 1px dashed #dddddd;
  }
  .contentClass{
    padding:10px 0px;
  }
</style>

