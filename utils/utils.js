import Cookie from 'js-cookie'

const TOKEN_KEY = 'token'

export default {
  /**
   * 判断服务器端的cookie内容
   * 中间件无法获取到前端的cookie，所以才用header的方式
   * 如果是前端，直接通过js-cookie的方式
   */
  getcookiesInServer(req) {
    let service_cookie = {};
    req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {
      let parts = val.split('=');
      //console.log((parts[1] || '').trim());
      service_cookie[parts[0].trim()] = (parts[1] || '').trim();
    });
    return service_cookie;
  },
  //获取客户端cookie
  getcookiesInClient: function (key) {
    return Cookie.get(key) ? Cookie.get(key) : ''
  },
  setToken: function (token) {
    Cookie.set(TOKEN_KEY, token, {expires: 1 || 1})
  },
  getToken: function () {
    const token = Cookie.get(TOKEN_KEY)
    if (token) return token;
    else return false
  },
  removeToken: function () {
    Cookie.remove(TOKEN_KEY);
  },
  clearData: function(data, isSerialize) {
    if (data) {
      if (isSerialize) {
        var newData = {};
        for (var i = 0, length = data.length; i < length; i++) {
          if (trim(data[i].value) != '' && trim(data[i].value) != 'null') {
            newData[data[i].name] = $.trim(data[i].value);
          }
        }
        return newData;
      } else {
        for (var key in data) {
          if (data[key] === '' || data[key] == 'null' || data[key] == null) {
            delete data[key];
          }
        }
        ;
        return data;
      }
    }
  },
  removeAllHtml: function(html) {
    return html.replace(/<[^>]+>/g, '');
  },
  getLength: function(str) {
    //获得字符串实际长度，中文2，英文1
    //要获得长度的字符串
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
      charCode = str.charCodeAt(i);
      if (charCode >= 0 && charCode <= 128)
        realLength += 1;
      else
        realLength += 2;
    }
    return realLength;
  },
  trim: function(str)
  {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  }
}
