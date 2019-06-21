<template>
  <div>
    <div>
      menu1-1:{{ $moment("20111031", "YYYYMMDD").fromNow() }}
    </div>
    <div>
      <Button @click="changeLocale($event,'en')"><i class="fa fa-home"></i>英文</Button>
      <Button @click="changeLocale($event,'zh')"><i class="fa fa-home"></i>中文</Button>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  data () {
    return {

    }
  },
  created() {
    this.init();
  },
  methods:{
    init(){
      var _self = this;
      var params = {
        keyword:'',
        page:1,
        pageSize:10
      };
      this.$api.get('/proxy/backend/get-blog-list',this.$utils.clearData(params),res => {
        console.log(res);
      });
    },
    changeLocale(obj, lang) {
      let locale = lang ? lang : Cookies.get('user_lang');
      this.$i18n.locale = locale;
      Cookies.set('user_lang', locale);
    }
  }
}
</script>

<style scoped>

</style>

