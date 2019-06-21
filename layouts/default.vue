<template>
  <div>
    <div class="header-layout">
      <div class="header-layout-logo">
        logo
      </div>
      <div class="header-layout-menu">
        <Menu ref="top_menu" mode="horizontal" :active-name="activeMenu" @on-select="selMainMenu">
          <MenuItem name="menu1" :to="{path: '/menu1/menu1-1',name:'menu1-menu1-1'}">
            <Icon type="ios-paper" />
            内容管理1
          </MenuItem>
          <MenuItem name="menu2" :to="{path: '/menu2/menu2-1',name:'menu2-menu2-1'}">
            <Icon type="ios-paper" />
            内容管理2
          </MenuItem>
        </Menu>
      </div>
    </div>

    <div v-if="loadingShow">
      <div class="left-nav" :style="styleMenuObjectLeft">
        <Menu :class="activeMenu == 'menu1' ? 'show' : 'hidden'" :active-name="activeSilder" mode="vertical" width="auto" @on-select="selSliderMenu">
          <MenuItem name="menu1-menu1-1" :to="{path: '/menu1/menu1-1',name:'menu1-menu1-1'}">
            <div style="text-align: center">
              <Icon type="ios-paper" size="15"/>
              menu1-1
            </div>
          </MenuItem>
          <MenuItem name="menu1-menu1-2" :to="{path: '/menu1/menu1-1',name:'menu1-menu1-2'}">
            <div style="text-align: center">
              <Icon type="ios-paper" size="15"/>
              menu1-2
            </div>
          </MenuItem>
        </Menu>

        <Menu :class="activeMenu == 'menu2' ? 'show' : 'hidden'" :active-name="activeSilder" mode="vertical" width="auto">
          <MenuItem name="menu2-menu2-1" :to="{path: '/menu1/menu1-1',name:'menu2-menu2-1'}">
            <div style="text-align: center">
              <Icon type="ios-paper" size="15"/>
              menu2-1
            </div>
          </MenuItem>
          <MenuItem name="menu2-menu2-2" :to="{path: '/menu1/menu1-1',name:'menu2-menu2-2'}">
            <div style="text-align: center">
              <Icon type="ios-paper" size="15"/>
              menu2-2
            </div>
          </MenuItem>
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
        loadingShow: false,
        activeSilder: 'menu1-menu1-1',
        activeMenu: 'menu1',
        styleMenuObjectLeft: {
          height: '',
          'overflow-y': 'auto',
        },
        styleMenuObjectRight: {
          minHeight: '',
          height: '',
          position: 'relative'
        }
      }
    },
    created(){
      this.hh();
    },
    methods: {
      hh(){
        if (process.browser) {
          this.styleMenuObjectLeft.height = window.innerHeight - 60 + 'px';
          this.styleMenuObjectRight.minHeight = window.innerHeight - 60 + 'px';
          this.$nextTick(function () {
            this.loadingShow = true;
          });
        }
      },
      setActive(){//设置菜单的选中状态，路由变化和直接通过浏览器输入对应地址，也可以设置相应的选中状态
        this.activeSilder = this.$route.name;
        this.activeMenu = this.$route.name.split("-")[0];

        this.$nextTick(()=>{//必须使用该方法才能动态改变menu组件的选中
          //this.$refs.side_menu.updateOpened();
          //this.$refs.side_menu.updateActiveName();
          this.$refs.top_menu.updateOpened();
          this.$refs.top_menu.updateActiveName();
        });
      },
      selMainMenu(event){
        this.activeMenu = event;
      },
      selSliderMenu(event){
        this.activeSilder = event;
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
