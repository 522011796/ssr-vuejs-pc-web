/*import * as axios from 'axios'

let options = {}
// The server-side needs a full url to works
if (process.server) {
  options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
}

export default axios.create(options)*/


/**自定义**/
import qs from 'qs';
import Cookie from 'js-cookie'
import axios from 'axios';
// 配置API接口地址
const root = '/';
const TOKEN_KEY = 'token'

// 返回在vue模板中的调用接口
export default  {
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure,header) {
    return apiAxios('POST', url, params, success, failure,header)
  },
  postQs: function (url, params,success, failure, header) {
    return apiAxios('POST', url, qs.stringify(params), success, failure, header)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  }
}

function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

function apiAxios (method, url ,params, success, failure, header) {
  /*if (params) {
    params = filterNull(params);
  }*/
  if(url.indexOf("?") > -1){
    url = url +"&timestamp="+ new Date().getTime();
  }else{
    url = url +"?timestamp="+ new Date().getTime();
  }
  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root,
    headers : header,
    withCredentials: false
  })
    .then(function (res) {
      if (res.data.code == 200) {
        if (success) {
          success(res)
        }
      }else if(res.data.code == 401){
        //window.location = "/#/login";
        Cookie.remove(TOKEN_KEY);
        this.$router.push("/login");
      }else if(res.data.code == 403){
        //window.location = "/#/login";
        Cookie.remove(TOKEN_KEY);
        this.$router.push("/login");
      }else {
        if (failure) {
          failure(res)
        } else {
          //window.alert('error: ' + JSON.stringify(res.data))
        }
      }
    }).catch(function (err) {
    let res = err.response
    if (err) {
      //window.alert('api error, HTTP CODE: ' + res.status)
    }
  })
}
