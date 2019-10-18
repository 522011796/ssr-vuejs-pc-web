<template>
  <div>
    <div>
      <span class="tabClass" :class="selStatus == 1 ? 'active' : ''" @click="selTab($event,1,'/work/work-workDy')">{{$t('childMenu.workDy')}}</span>
      <span class="tabClass" :class="selStatus == 2 ? 'active' : ''" @click="selTab($event,2)">{{$t('childMenu.lately')}}</span>
      <span class="tabClass" :class="selStatus == 3 ? 'active' : ''" @click="selTab($event,3)">{{$t('childMenu.myCreate')}}</span>
      <span class="tabClass" :class="selStatus == 4 ? 'active' : ''" @click="selTab($event,4)">{{$t('childMenu.shareMy')}}</span>
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
        selStatus: 1
      }
    },
    created() {

    },
    methods:{
      init(){

      },
      selTab(event,type,url){
        this.selStatus = type;
        this.$router.push(
          {
            path: url
          }
        );
      }
    }
  }
</script>

<style scoped>
  .mainDiv{
    padding:10px 15px;
    margin-top: 10px;
  }
  .tabClass{
    color: #515a6e;
    font-size: 15px;
    font-weight: bold;
    padding:5px 10px;
    cursor: default;
  }
  .tabClass.active{
    color:#2d8cf0;
  }
</style>

