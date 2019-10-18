<template>
  <div>
    <div v-for="(item,index) in testNum" :key="index">
      <div class="titleClass">2019-10-14</div>
      <Row :gutter="16">
        <Col span="8" v-for="(item,index) in testNum" :key="index" style="margin-bottom: 10px">
          <div class="listClass">
            <img src="~/static/img/doc-file.png" alt="" class="imgClass pullLeft">
            <Poptip placement="bottom-end" class="moreClass">
              <span><Icon type="md-more" size="15"/></span>
              <div slot="content" class="listOprClass">
                <div class="listOprDiv">
                  <Icon type="ios-bookmark" size="15" color="#808695"/>
                  <a href="javascript:void(0)">{{$t('opr.collect')}}</a>
                </div>
                <div class="listOprDiv">
                  <Icon type="md-pricetag" size="15" color="#808695"/>
                  <a href="javascript:void(0)" @click="setDocName">{{$t('opr.resetName')}}</a>
                </div>
                <Divider class="dividerClass"/>
                <div class="listOprDiv">
                  <Icon type="ios-trash" size="15" color="#ed4014"/>
                  <a href="javascript:void(0)" class="redOprClass" @click="delDoc">{{$t('opr.delete')}}</a>
                </div>
              </div>
            </Poptip>
            <div class="listContent">
              <div class="listTitle">
                <label v-if="$utils.getLength(testTitle) > 20" :title="testTitle">{{testTitle.substring(0,15)+"......"}}</label>
                <label v-else>{{testTitle}}</label>
                <span v-if="collectStatus == true" style="position: relative;top:-2px;"><Icon type="ios-bookmark" size="15" color="#5cadff"/></span>
              </div>
              <div class="listDetail">
                <span>{{ $moment.unix(1571370164).fromNow() }}</span>
                <span>admin</span>
                <span>更新</span>
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
        collectStatus: false
      }
    },
    created() {

    },
    methods:{
      init(){

      },
      selTab(event,type){
        /*this.$router.push({
          path: event
        });*/

      },
      setDocName(){
        this.resetNameModel = true;
      },
      delDoc(){
        this.deleteModel = true;
      },
      changeModel(event){
        if (event == false){
          this.newDocName = "";
          this.errorTips = "";
          this.modal_loading = false;
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
        this.modal_loading = true;
      },
      cancel(){
        this.resetNameModel = false;
      },
      okDel(){
        this.del_modal_loading = true;
      },
      cancelDel(){
        this.deleteModel = false;
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

