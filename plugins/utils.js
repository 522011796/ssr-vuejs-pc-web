import Vue from 'vue'
import utils from '../utils/utils'

export default ({ app, store, req }) => {
  Vue.prototype.$utils = utils;
}
