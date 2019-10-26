<template>
  <div>
    <div v-for="(item,index) in contentList" :key="index">
      <div class="titleClass">{{item.time}}</div>
      <Row :gutter="16">
        <Col span="8" v-for="(item,index) in item.data" :key="index" style="margin-bottom: 10px">
          <div class="listClass" @click.prevent.self="openDetail(item)">
            <img src="~/static/img/doc-file.png" alt="" class="imgClass pullLeft">
            <Poptip placement="bottom-end" class="moreClass">
              <span><Icon type="md-more" size="15" @click.self=""/></span>
              <div slot="content" class="listOprClass">
                <!--<div class="listOprDiv">
                  <Icon type="ios-bookmark" size="15" color="#808695"/>
                  <a href="javascript:void(0)">{{$t('opr.collect')}}</a>
                </div>-->
                <div class="listOprDiv">
                  <Icon type="md-create" size="15" color="#808695"/>
                  <a href="javascript:void(0)" @click="editDoc(item)">{{$t('opr.edit')}}</a>
                </div>
                <div class="listOprDiv">
                  <Icon type="md-pricetag" size="15" color="#808695"/>
                  <a href="javascript:void(0)" @click="setDocName(item)">{{$t('opr.resetName')}}</a>
                </div>
                <Divider class="dividerClass"/>
                <div class="listOprDiv">
                  <Icon type="ios-trash" size="15" color="#ed4014"/>
                  <a href="javascript:void(0)" class="redOprClass" @click="delDoc(item)">{{$t('opr.delete')}}</a>
                </div>
              </div>
            </Poptip>
            <div class="listContent">
              <div class="listTitle">
                <label v-if="$utils.getLength(item.title) > 20" :title="testTitle">{{item.title.substring(0,15)+"......"}}</label>
                <label v-else>{{item.title}}</label>
                <span v-if="collectStatus == true" style="position: relative;top:-2px;"><Icon type="ios-bookmark" size="15" color="#5cadff"/></span>
              </div>
              <div class="listDetail">
                <span>{{ $moment.unix(item.updateTimeInt).fromNow() }}</span>
                <span>{{$t('common.me')}}</span>
                <span>{{$t('common.create')}}</span>
              </div>
            </div>
            <div class="clearfix"></div>
          </div>
        </Col>
      </Row>
    </div>

    <!--重命名-->
    <Modal
      v-model="resetNameModel"
      :title="$t('common.resetNameModelTitle')"
      @on-visible-change = "changeModel"
      >
      <div class="modelInput">
        <Input v-model="newDocName" :placeholder="$t('common.resetNameModelInput')" size="large"/>
        <span class="errorTips">{{errorTips}}</span>
      </div>

      <div slot="footer">
        <Button type="default" size="default" @click="cancel">{{ $t('common.cancel') }}</Button>
        <Button type="info" size="default" :loading="modal_loading" @click="ok">{{ $t('common.ok') }}</Button>
      </div>
    </Modal>

    <!--删除-->
    <Modal
      v-model="deleteModel"
      :title="$t('common.deleteModelTitle')"
      @on-visible-change = "changeDelModel"
    >
      <div class="modelInput">
        <span>{{ $t('common.deleteModelContent') }}</span>
      </div>

      <div slot="footer">
        <Button type="default" size="default" @click="cancelDel">{{ $t('common.cancel') }}</Button>
        <Button type="info" size="default" :loading="del_modal_loading" @click="okDel">{{ $t('common.ok') }}</Button>
      </div>
    </Modal>

    <!--文档详细-->
    <Modal
      width="90"
      v-model="docDetailModal"
      :footer-hide="true"
      :styles="{top: '20px',position: 'relative'}"
      :title="contentTitle"
    >
      <div class="contentHtmlClass" v-html="$md.render(contentHtml)"></div>
    </Modal>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  export default {
    data () {
      return {
        testNum: 4,
        testTitle:'无标题12348901234无1345',
        resetNameModel: false,
        deleteModel: false,
        modal_loading: false,
        del_modal_loading: false,
        newDocName: '',
        errorTips: '',
        collectStatus: false,
        contentList:'',
        docDetailModal: false,
        contentHtml:'',
        contentTitle:'',
        docId:'',
      }
    },
    created() {
      this.init();
    },
    methods:{
      init(){
        var params = {
          pageType: 'create'
        };
        this.$api.get("/proxy/api/doc", params ,res => {
          //this.$Message.success(res.data.data.desc);
          console.log(res.data.data);
          this.contentList = res.data.data;
        },res=>{
          this.$Message.error(res.data.errmsg);
        });
      },
      selTab(event,type){
        /*this.$router.push({
          path: event
        });*/

      },
      setDocName(item){
        this.resetNameModel = true;
        this.docId = item.id;
      },
      delDoc(item){
        this.deleteModel = true;
        this.docId = item.id;
      },
      changeModel(event){
        if (event == false){
          this.newDocName = "";
          this.errorTips = "";
          this.modal_loading = false;
          this.docId = '';
        }
      },
      changeDelModel(event){
        if (event == false){
          this.del_modal_loading = false;
        }
      },
      ok(){
        this.errorTips = "";
        if (this.newDocName == ""){
          this.errorTips = this.$t("lang.inputRightTips");
          return;
        }
        this.modal_loading = true;var params = {
          pageType:'resetName',
          docId: this.docId,
          docTitle: this.newDocName
        };
        this.$api.postQs("/proxy/api/doc", params ,res => {
          this.$Message.success(res.data.errmsg);
          this.modal_loading = false;
          this.resetNameModel = false;
          this.init();
        },res=>{
          this.modal_loading = false;
          this.$Message.error(res.data.errmsg);
        });
      },
      cancel(){
        this.resetNameModel = false;
      },
      okDel(){
        this.del_modal_loading = true;var params = {
          pageType:'delete',
          docId: this.docId
        };
        this.$api.postQs("/proxy/api/doc", params ,res => {
          this.$Message.success(res.data.errmsg);
          this.del_modal_loading = false;
          this.deleteModel = false;
          this.init();
        },res=>{
          this.del_modal_loading = false;
          this.$Message.error(res.data.errmsg);
        });
      },
      cancelDel(){
        this.deleteModel = false;
        this.docId = "";
      },
      openDetail(item){
        //this.contentHtml = md.render(item.content);
        this.contentHtml = item.content;
        this.contentTitle = item.title;
        this.docDetailModal = true;
        //关联为最近查看
        var params = {
          pageType:'lately',
          docId: item.id
        };
        this.$api.postQs("/proxy/api/doc", params ,res => {
          //this.$Message.success(res.data.data.desc);
          console.log(res);
        },res=>{
          this.$Message.error(res.data.errmsg);
        });
      },
      editDoc(item){
        var params = {
          pageType:'detail',
          docId: item.id
        };
        this.$api.get("/proxy/api/doc", params ,res => {
          //this.$Message.success(res.data.data.desc);
          this.$store.commit("SET_DOC_DETAIL",res.data.data[0]);
        },res=>{
          this.$Message.error(res.data.errmsg);
        });
        this.$store.commit("SET_SHOW",true);
      }
    },
    watch: {
      '$store.state.showAddDoc': function () {
        if(this.$store.state.showAddDoc == false){
          this.init();
        }
      }
    }
  }
</script>

<style scoped>
  .mainDiv{
    padding:10px 15px;
    margin-top: 10px;
  }
  .imgClass{
    height: 45px;
    width: 45px;
  }
  .titleClass{
    color:#808695;
    font-weight: bold;
    padding:5px 0px;
  }
  .listClass{
    background: #ffffff;
    padding:10px 5px;
    border:1px solid #dddddd;
    border-radius: 5px;
    position: relative;
  }
  .listContent{
    margin-left: 50px;
  }
  .listTitle{
    color:#17233d;
    font-weight: 400;
    font-size: 13px;
  }
  .listDetail{
    font-size: 12px;
    color:#808695;
  }
  .moreClass{
    position: absolute;
    right: 10px;
    top: 5px;
  }
  .listOprClass{
    text-align: left;
    color: #808695;
  }
  .listOprClass a{
    color: #808695;
    display: inline-block;
    width: 1000%;
  }
  .listOprDiv{
    padding:5px 0px;
  }
  .dividerClass{
    margin: 5px 0px;
  }
  .redOprClass{
    color:#ed4014 !important;
  }
  .pullLeft{
    float: left;
  }
  .clearfix{
    clear: both;
  }
  .modelInput{
    padding:10px 25px;
  }
  .errorTips{
    color: #ed4014;
    font-size: 12px;
  }
</style>

