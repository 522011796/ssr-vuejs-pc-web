<template>
  <!--<div style="text-align: center;margin-top:10%;">
    <Button @click="login()">login</Button>
  </div>-->

  <div>
    <div class="loginDiv">
      <span>{{$t('system.title')}}</span>
    </div>

    <div class="loginTitle">
      <span>{{$t('login.title')}}</span>
    </div>

    <div class="loginContent">
      <div class="loginOprDiv">
        <div class="loginFormText">
          <div>
            {{$t('login.username')}}
          </div>
          <div>
            <Input v-model="username" placeholder="" size="large" />
          </div>
        </div>
        <div class="loginFormText" style="margin-top:20px;">
          <div>
            {{$t('login.password')}}
          </div>
          <div>
            <Input v-model="password" type="password" password placeholder="" size="large" />
          </div>
        </div>

        <div class="findPassword">
          <span></span>
        </div>

        <div class="loginBtn">
          <Button type="info" long size="large" class="btnLoginClass" @click="login">{{$t('login.title')}}</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  export default {
    layout: 'fullscreen',
    data() {
      return {
        username:'',
        password:''
      }
    },
    created() {
      //Cookies.set('token', 'success');
      let locale = 'zh';
      this.$i18n.locale = locale;
      Cookies.set('user_lang', 'zh');
    },
    methods: {
      login(){
        if (this.username == "" || this.password == ""){
            this.$Message.error(this.$t("lang.inputRightTips"));
            return;
        }

        var params = {
          username: this.username,
          password: this.password
        };
        this.$api.postQs("/proxy/api/token", params ,res => {
          this.$Message.success(res.data.data.desc);
          Cookies.set('token', res.data.data.token);
          setTimeout("window.location = '/work/work-workDy';", 1000);
        },res=>{
          this.$Message.error(res.data.errmsg);
        },{"Content-Type":'application/x-www-form-urlencoded; charset=UTF-8'});
      }
    }
  }
</script>

<style scoped>
.loginDiv{
  font-family: serif;
  font-size: 18px;
  text-align: left;
  color: #41464b;
  -webkit-letter-spacing: 1px;
  -moz-letter-spacing: 1px;
  -ms-letter-spacing: 1px;
  letter-spacing: 1px;
  line-height: 30px;
  position: relative;
  padding:10px 20px;
}

.loginTitle{
  font-family: serif;
  font-size: 24px;
  text-align: center;
  color: #41464b;
  -webkit-letter-spacing: 2px;
  -moz-letter-spacing: 2px;
  -ms-letter-spacing: 2px;
  letter-spacing: 2px;
  margin: 0 auto 30px;
  line-height: 30px;
  width: 264px;
  position: relative;
  font-weight: 700;
}
.loginContent {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.loginOprDiv{
  width: 520px;
  height: auto;
  box-sizing: border-box;
  padding: 60px 90px;
  background-color: #fff;
  box-shadow: 0 2px 3px 0 rgba(213,213,213,0.7);
}
.loginFormText{
  color:#808695;
}
.loginBtn{
  margin-top: 20px;
}
.findPassword{
  height:35px;
  line-height: 35px;
}
.btnLoginClass{
  background: #17233d;
}
</style>
