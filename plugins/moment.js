import Vue from 'vue'
import moment from 'moment'
import Cookie from 'js-cookie'
import utils from '../utils/utils'

export default ({ app, store, req }) => {
  //时间格式化插件
  Vue.prototype.$moment = moment;
  const langSer = utils.getcookiesInServer(req).user_lang==='zh' ? 'zh_cn' : 'en';
  const langCli = Cookie('user_lang')==='zh' ? 'zh_cn' : 'en';
  moment.locale(langCli);
}
