<template>
  <div>
    <div>
      <span class="tabClass" :class="selStatus == 'work-work-workDy' ? 'active' : ''" @click="selTab($event,'work-work-workDy','/work/work-workDy')">{{$t('childMenu.workDy')}}</span>
      <span class="tabClass" :class="selStatus == 'work-work-workLately' ? 'active' : ''" @click="selTab($event,'work-work-workLately','/work/work-workLately')">{{$t('childMenu.lately')}}</span>
      <span class="tabClass" :class="selStatus == 'work-work-workCreate' ? 'active' : ''" @click="selTab($event,'work-work-workCreate','/work/work-workCreate')">{{$t('childMenu.myCreate')}}</span>
      <span class="tabClass" :class="selStatus == 'work-work-workShared' ? 'active' : ''" @click="selTab($event,'work-work-workShared','/work/work-workShared')">{{$t('childMenu.shareMy')}}</span>
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
        selStatus: 'work-work-workDy'
      }
    },
    created() {
      this.init();
    },
    methods:{
      init(){
        this.selStatus = this.$route.name;
      },
      selTab(event,type,url){
        if (type == "work-work-workShared"){
          this.$Message.info('还没做呢！');
          return;
        }

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

