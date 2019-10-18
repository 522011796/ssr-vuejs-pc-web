<template>
  <div>
    <div>
      <nuxt-link to="/docManage/school-deploy-doc">
        <Button size="small" type="info">{{$t('docManage.tabDeploy')}}</Button>
      </nuxt-link>

      <nuxt-link to="/docManage/school-deploy-doc-2">
        <Button size="small" type="default">{{$t('docManage.tabDeploy')}}</Button>
      </nuxt-link>
    </div>

    <div class="mainDiv">
      <nuxt-child></nuxt-child>
      <!--<div class="titleClass">
        测试标题
      </div>
      <div class="contentClass">
        <p>123</p>
      </div>-->
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
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
  .mainDiv{
    background: #ffffff;
    padding:10px 15px;
    margin-top: 10px;
  }
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

