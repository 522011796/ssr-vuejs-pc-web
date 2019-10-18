<template>
  <div>
    <div class="header-layout">
      <div class="header-layout-logo">
        {{$t('system.title')}}
      </div>
      <!--<div class="header-layout-menu">

      </div>-->
    </div>

    <div v-if="loadingShow">
      <div class="left-nav" :style="styleMenuObjectLeft">
        <Menu ref="side_menu" :active-name="activeSilder" mode="vertical" width="auto" @on-select="selSliderMenu">
          <div :class="activeMenu == 'schoolDoc' ? 'show' : 'hidden'">
            <MenuItem name="schoolDoc-school-deploy-doc" :to="{path: '/school-deploy-doc',name:'schoolDoc-school-deploy-doc'}">
              <div style="text-align: center">
                <Icon type="ios-school" size="15"/>
                {{$t('childMenu.work')}}
              </div>
            </MenuItem>
            <MenuItem name="schoolDoc-school-deploy-doc" :to="{path: '/school-deploy-doc',name:'schoolDoc-school-deploy-doc'}">
              <div style="text-align: center">
                <Icon type="ios-school" size="15"/>
                {{$t('childMenu.face')}}
              </div>
            </MenuItem>
            <MenuItem name="schoolDoc-school-deploy-doc" :to="{path: '/school-deploy-doc',name:'schoolDoc-school-deploy-doc'}">
              <div style="text-align: center">
                <Icon type="ios-school" size="15"/>
                {{$t('childMenu.collect')}}
              </div>
            </MenuItem>
            <MenuItem name="schoolDoc-school-deploy-doc" :to="{path: '/school-deploy-doc',name:'schoolDoc-school-deploy-doc'}">
              <div style="text-align: center">
                <Icon type="ios-school" size="15"/>
                {{$t('childMenu.manage')}}
              </div>
            </MenuItem>
          </div>

          <div :class="activeMenu == 'menu2' ? 'show' : 'hidden'">
            <MenuItem name="menu2-menu2-1" :to="{path: '/menu2/menu2-1',name:'menu2-menu2-1'}">
              <div style="text-align: center">
                <Icon type="ios-paper" size="15"/>
                menu2-1
              </div>
            </MenuItem>
            <MenuItem name="menu2-menu2-2" :to="{path: '/menu2/menu2-2',name:'menu2-menu2-2'}">
              <div style="text-align: center">
                <Icon type="ios-paper" size="15"/>
                menu2-2
              </div>
            </MenuItem>
          </div>
        </Menu>
      </div>

      <div class="right-nav" :style="styleMenuObjectRight">
        <nuxt />
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        username: 'admin',
        docStatus: false,
        loadingShow: false,
        activeSilder: 'docManage-school-doc',
        activeMenu: 'schoolDoc',
        styleMenuObjectLeft: {
          height: '',
          'overflow-y': 'auto',
        },
        styleMenuObjectRight: {
          minHeight: '',
          height: '',
          position: 'relative'
        },
        editorContent: ''
      }
    },
    created(){
      if (process.browser) {
        //某些情况下，可能需要
        /*let activeSilder = localStorage.getItem("activeSilder") ? localStorage.getItem("activeSilder") : 'menu1-menu1-1';
        this.activeSilder = activeSilder;
        let activeMenu = localStorage.getItem("activeMenu") ? localStorage.getItem("activeMenu") : 'menu1';
        this.activeMenu = activeMenu;*/
      }
      this.hh();
    },
    methods: {
      hh(){
        if (process.browser) {
          this.styleMenuObjectLeft.height = window.innerHeight - 60 + 'px';
          this.styleMenuObjectRight.minHeight = window.innerHeight - 60 + 'px';
          this.$nextTick(function () {
            //默认选中
            this.loadingShow = true;
          });
        }
      },
      setActive(){//设置菜单的选中状态，路由变化和直接通过浏览器输入对应地址，也可以设置相应的选中状态
        this.activeSilder = this.$route.name;
        if(this.$route.name == "schoolDoc-school-deploy-doc-2"){
          this.activeSilder = "schoolDoc-school-deploy-doc";
        }
        this.activeMenu = this.$route.name.split("-")[0];

        this.$nextTick(()=>{//必须使用该方法才能动态改变menu组件的选中
          //this.$refs.side_menu.updateOpened();
          //this.$refs.side_menu.updateActiveName();
          //this.$refs.top_menu.updateOpened();
          //this.$refs.top_menu.updateActiveName();
          //this.$refs.top_menu.updateOpenKeys();
        });
      },
      selMainMenu(event){
        this.activeMenu = event;
        localStorage.setItem('activeMenu',event);
        localStorage.removeItem("activeSilder");
      },
      selSliderMenu(event){
        this.activeSilder = event;
        localStorage.setItem('activeSilder',event);
        //console.log(event);
      },
      addDoc(event){
        console.log(event);
        var _self = this;
        if (event == 0){

        }else if(event == 1){
          _self.docStatus = true;
        }
      }
    },
    mounted() {
      // 注：window.onresize只能在项目内触发1次
      var _self = this;
      if (process.browser) {
        window.onresize = function () {
          _self.hh();
        }
      }
      this.setActive();
    },
    watch: {
      '$route': function (to, from) {//监听路由变化,为了浏览器点击后退和前进也能切换菜单选中
        this.setActive();
      }
    }
  }
</script>

<style scoped>
.header-layout{
  height: 60px;
  line-height: 60px;
  width: 100%;
  background: #ffffff;
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
  background: #ffffff;
  float: left;
}
.header-layout-menu{
  margin-left: 200px;
}
.header-layout-menu-list{
  width: 90%;
  float: left;
}
.header-layout-menu-user{
  margin-left: 90%;
  background: #ffffff;
}
.header-layout-menu-user:after {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  background: #dcdee2;
  position: absolute;
  bottom: 0;
  left: 0;
}
.demo-drawer-footer{
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
.hidden{
  display: none !important;
}
.show{
  display: block !important;
}
</style>
