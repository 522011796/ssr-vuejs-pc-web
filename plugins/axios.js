import Vue from 'vue'
import axios from '../utils/axios'

export default ({ app, store, req }) => {
  //时间格式化插件
  Vue.prototype.$api = axios;
}
