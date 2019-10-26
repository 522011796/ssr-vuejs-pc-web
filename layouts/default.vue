<template>
  <div>
    <div class="header-layout">
      <div class="header-layout-logo">
        {{$t('system.title')}}
      </div>
      <div class="header-layout-menu">
        <span>
          <Poptip placement="bottom-end" class="moreClass">
            <span><Avatar icon="ios-person" /></span>
            <div slot="content" class="listOprClass">
              <div class="listOprDiv">
                <span>{{username}}</span>
              </div>
              <Divider class="dividerClass"/>
              <div class="listOprDiv">
                <a href="javascript:void(0)" @click="createDoc">{{$t('system.newCreate')}}</a>
              </div>
              <div class="listOprDiv">
                <a href="javascript:void(0)">{{$t('system.upload')}}</a>
              </div>
              <Divider class="dividerClass"/>
              <div class="listOprDiv">
                <a href="javascript:void(0)" class="redOprClass" @click="logout">{{$t('opr.logout')}}</a>
              </div>
            </div>
          </Poptip>
        </span>
      </div>
    </div>

    <div v-if="loadingShow">
      <div class="left-nav" :style="styleMenuObjectLeft">
        <Menu ref="side_menu" :active-name="activeSilder" mode="vertical" width="auto" @on-select="selSliderMenu">
          <div>
            <MenuItem name="work" :to="{path: '/work/work-workDy',name:'work-work-workDy'}">
              <div class="menyChildClass">
                <Icon type="ios-cube" size="15"/>
                {{$t('childMenu.work')}}
              </div>
            </MenuItem>
            <!--<MenuItem name="face" :to="{path: '/face',name:'face'}">
              <div class="menyChildClass">
                <Icon type="ios-desktop" size="15"/>
                {{$t('childMenu.face')}}
              </div>
            </MenuItem>-->
            <!--<MenuItem name="collect" :to="{path: '/collect',name:'collect'}">
              <div class="menyChildClass">
                <Icon type="ios-bookmark" size="15"/>
                {{$t('childMenu.collect')}}
              </div>
            </MenuItem>-->
            <MenuItem name="manage" :to="{path: '/manage',name:'manage'}">
              <div class="menyChildClass">
                <Icon type="ios-cog" size="15"/>
                {{$t('childMenu.manage')}}
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

    <Drawer :closable="true" :mask="true" :mask-closable="false" @on-visible-change="closeDrawer" v-model="docStatus" width="90">
      <div slot="header" class="drawerTitle">
        <span>{{$t('system.setDoc')}}</span>
        <Button type="success" size="small" style="margin-left: 20px" @click="releaseBtn">{{$t('common.release')}}</Button>
        <span class="redOprClass font12">{{releaseErrTips}}</span>
      </div>
      <div v-if="!$isServer">
        <span>{{$t('common.docTitle')}}</span>
        <span>
          <Input v-model="docTitle" :placeholder="$t('common.docInputTitle')" :maxLength="30" style="width: 400px;background: #ffffff" />
        </span>
      </div>
      <div id="editor" v-if="!$isServer" style="margin-top: 20px">
        <mavon-editor :toolbars="markdownOption" style="height: 100%" v-model="editorContent"/>
      </div>
    </Drawer>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'

  export default {
    components: {
    },
    data() {
      return {
        username: '',
        docStatus: false,
        loadingShow: false,
        activeSilder: 'work-work-workDy',
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
        editorContent: '',
        docTitle: '',
        releaseErrTips: '',
        docId: '',
        markdownOption: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: false, // 上角标
          subscript: false, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: false, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: false, // 上一步
          redo: false, // 下一步
          trash: true, // 清空
          save: false, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: false, // 预览
        }
      }
    },
    created(){
      if (process.browser) {
        //某些情况下，可能需要
        /*let activeSilder = localStorage.getItem("activeSilder") ? localStorage.getItem("activeSilder") : 'menu1-menu1-1';
        this.activeSilder = activeSilder;
        let activeMenu = localStorage.getItem("activeMenu") ? localStorage.getItem("activeMenu") : 'menu1';
        this.activeMenu = activeMenu;*/
        let username = JSON.parse(Cookies.get("token"));
        this.username = username.username;
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
        if(this.$route.name.indexOf("work-work-") != -1){
          this.activeSilder = "work";
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
      closeDrawer(event){
        if (event == true){
          this.docTitle = "";
          this.editorContent = "";
          this.releaseErrTips = "";
        }else{
          this.$store.commit("SET_SHOW",false);
          this.docId = "";
        }
      },
      createDoc(event){
        var _self = this;
        this.docStatus = true;
      },
      releaseBtn(){
        this.releaseErrTips = "";
        if (this.docTitle.match(/^[ ]*$/) || this.editorContent.match(/^[ ]*$/)){
          this.releaseErrTips = this.$t("lang.inputRightReleaseTips");
          return;
        }

        var params = {
          content: this.editorContent,
          title: this.docTitle
        };

        if (this.docId != ""){
          params['pageType'] = "edit";
          params['docId'] = this.docId;
        }

        this.$api.postQs("/proxy/api/doc", params ,res => {
          this.$Message.success(res.data.errmsg);
          this.docStatus = false;
          this.$store.commit("SET_SHOW",false);
        },res=>{
          this.$Message.error(res.data.errmsg);
        },{"Content-Type":'application/x-www-form-urlencoded; charset=UTF-8'});
      },
      logout(){
        this.$api.get("/proxy/api/logout", {} ,res => {
          Cookies.remove('token');
          window.location = '/login'
        },res=>{
          console.log(res);
        });
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
      },
      '$store.state.showAddDoc': function () {
        this.docStatus = this.$store.state.showAddDoc;
      },
      '$store.state.showDocDetail': function () {
        this.docTitle = this.$store.state.showDocDetail.title;
        this.editorContent = this.$store.state.showDocDetail.content;
        this.docId = this.$store.state.showDocDetail.id;
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
  box-shadow: 0 2px 3px 0 rgba(100,100,100,0.06);
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
  border-left:1px solid #eeeeee;
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
  font-family: serif;
  width: 200px;
  height: 100%;
  text-align: center;
  background: #ffffff;
  float: left;
  font-size: 15px;
  font-weight: bold;
}
.header-layout-menu{
  margin-left: 200px;
  text-align: right;
  padding:0px 20px 0px 0px;
  position: relative;
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
.menyChildClass{
  text-align: left;
  padding-left:35px;
}
.ivu-menu-vertical.ivu-menu-light:after {
  content: '';
  display: block;
  width: 1px;
  height: 100%;
  background: none;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):after {
  content: '';
  display: block;
  width: 2px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  background: none;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  color: #2d8cf0;
  background: #f8f8f9;
  z-index: 2;
}
.moreClass{
  height:20px;
  line-height: 20px;
}
.listOprDiv{
  color: #808695;
  padding:5px 0px;
}
.listOprDiv a{
  color: #808695;
  display: inline-block;
  width: 100%;
}
.dividerClass{
  margin: 5px 0px;
}
.redOprClass{
  color:#ed4014 !important;
}
.listOprClass{
  text-align: left;
}
.drawerTitle{
  font-size: 15px;
  font-weight: bold;
}
.font12{
  font-size: 12px;
}
.hidden{
  display: none !important;
}
.show{
  display: block !important;
}
</style>
