<template>
  <div>
    <div>
      <!--<nuxt-link to="/schoolDoc/school-deploy-doc">
        <Button size="small" type="info">{{$t('docManage.tabDeploy')}}</Button>
      </nuxt-link>

      <nuxt-link to="/schoolDoc/school-deploy-doc-2">
        <Button size="small" type="default">{{$t('docManage.tabDeploy')}}</Button>
      </nuxt-link>-->

      <!--<Button size="small" v-if="selStatus == 1" type="info" v-on:click="selDocType">{{$t('docManage.tabDeploy')}}</Button>
      <Button size="small" v-if="selStatus == 2" type="default" v-on:click="selDocType">{{$t('docManage.tabDeploy')}}</Button>-->

      <Dropdown trigger="click" @on-click="selDocType">
        <Button type="primary">
          {{$t('docManage.tabDeploy')}}
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="/schoolDoc/school-deploy-doc">{{$t('docManage.tabDeploy')}}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>

    <div class="mainDiv">
      <nuxt-child></nuxt-child>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      selStatus: false
    }
  },
  created() {

  },
  methods:{
    init(){

    },
    selDocType(event){
      this.$router.push({
        path: event
      });
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

