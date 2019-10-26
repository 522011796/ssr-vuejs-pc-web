<template>
  <div class="mainDiv">
    <div>
      <span class="titleClass">{{ $t('childMenu.collect') }}</span>
    </div>
    <div class="tableClass" :style="styleMain">
      <Table :columns="columns" :data="data">
        <template slot-scope="{ row }" slot="name">
          <span v-if="row.type == 1"><Icon type="ios-document-outline" size="20"/></span>
          <span v-if="row.type == 2"><Icon type="ios-folder-outline" size="20"/></span>
          <span>{{ row.name }}</span>
        </template>

        <template slot-scope="{ row }" slot="updateTime">
          <span>{{ $moment.unix(row.updateTime).fromNow() }}</span>
          <span>admin</span>
          <span>{{$t('common.update')}}</span>
        </template>

        <template slot-scope="{ row }" slot="action">
          <Poptip placement="bottom" transfer="true" class="moreClass">
            <span><Icon type="ios-cog" size="25"/></span>
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
        </template>
      </Table>
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
  export default {
    data () {
      return {
        resetNameModel: false,
        deleteModel: false,
        modal_loading: false,
        del_modal_loading: false,
        newDocName: '',
        errorTips: '',
        collectStatus: false,
        styleMain: {
          minHeight: '',
          position: 'relative'
        },
        columns: [
          {
            title: '文件名',
            slot: 'name'
          },
          {
            title: '创建者',
            key: 'creater'
          },
          {
            title: '更新时间',
            slot: 'updateTime'
          },
          {
            title: '操作',
            width: 100,
            slot: 'action'
          }
        ],
        data: [
          {
            name: 'John Brown',
            type: 1,
            creater: 18,
            updateTime: '1571370164'
          },
          {
            name: 'John Brown',
            type: 2,
            creater: 18,
            updateTime: '1571370164'
          }
        ]
      }
    },
    created() {
      this.init();
    },
    methods:{
      init(){
        if (process.browser) {
          this.styleMain.minHeight = window.innerHeight - 120 + 'px';
        }
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
    padding:0px 15px;
    margin-top: 5px;
  }
  .titleClass{
    font-weight: bold;
    font-size: 15px;
  }
  .tableClass{
    margin-top: 10px;
  }
  .contentClass{
    padding:10px 0px;
  }
  .errorTips{
    color: #ed4014;
    font-size: 12px;
  }
  .modelInput{
    padding:10px 25px;
  }
  .dividerClass{
    margin: 5px 0px;
  }
  .redOprClass{
    color:#ed4014 !important;
  }
</style>

