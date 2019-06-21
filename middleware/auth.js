import utils from "../utils/utils";
export default function ({ isHMR, app, store, route, params, error, redirect,req }) {
  if (isHMR) return
  let isClient = process.client;
  let isServer = process.server;
  let redirectURL = '/login';
  var token, path;
  const LOGIN_PAGE_NAME = 'login';
  //在服务端
  if (isServer) {
    let cookies = utils.getcookiesInServer(req)
    path = req.originalUrl;
    token = cookies.token ? cookies.token : ''
  }

  //在客户端判读是否需要登陆
  if (isClient) {
    token = utils.getcookiesInClient('token')
    path = route.path;
  }

  //需要进行权限判断的页面开头
  if (!token && route.name !== 'login') {
    // 未登录且要跳转的页面不是登录页
    redirect('/login')
  } else if (!token && route.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    redirect(path.name)
  } else if (token && route.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    redirect('/menu1/menu1-1');
  }else if (token && route.name === 'menu1-menu1-1') {
    // 已登录且要跳转的页面是根路径
    redirect('/menu1/menu1-1');
  }else if (token && route.name === null) {
    // 已登录且要跳转的页面是根路径
    redirect('/menu1/menu1-1');
  } else {
    redirect(path.name)
  }
}
