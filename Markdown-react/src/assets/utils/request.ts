import QS from "qs"; //引入qs模块，为post型数据提供序列化（非常重要）
import axios from "axios";

// # 设置请求超时
axios.defaults.timeout = 30000; //设置超时时间为30s```

// # 设置post请求方式请求头
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

// 添加请求拦截器
axios.interceptors.request.use(
  function (config: any) {
    // 在发送请求之前做些什么

    let sid = sessionStorage.getItem("__SID");
    let locale = sessionStorage.getItem('optLang');

    if (sid) {
      config.headers["__SID"] = sid;
    }
    config.headers["locale"] = locale ? locale.replace('-', '_') : "zh_TW";
    // Toast.loading("loading", 0);
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response: any) {

    // 对响应数据做点什么
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      if (response.status === 404) {
        // alert("can't find this api")
        // Toast.fail("请求重定向", 2);
      }
      return Promise.reject(response);
    }
    // return response;
  },
  function (error: any) {
    console.log("error.respomse", error.response)
    if (error.response.data) {
      switch (error.response.data) {
        //请求返回的错误妈需要与后台开发人员协商好，以便更快的定位错误。

        // case 403: //token过期
        //   Toast({
        //     message: "登录已过期，请重新登录",
        //     duration: 1000,
        //     forbidClick: true,
        //   });
        //   localStorage.removeItem("token");
        //   store.commit("loginSuccess", null);
        //   setTimeout(() => {
        //     router.replace({
        //       path: "/login",
        //       query: {
        //         redirect: router.currentRoute.fullPath,
        //       },
        //     });
        //   }, 1000);
        //   break;

        default:
        // 其它错误，直接抛出错误提示
        // event.emit('globalMsgAlert',{open:true,message:'请求错误'})
        //   Toast(error.response.message, 2);
      }
      return Promise.reject(error.response);
    }
    // 对响应错误做点什么
    // return Promise.reject(error);
  }
);

function get(url: any, params: any) {
  return new Promise((resolve: any, reject: any) => {
    axios
      .get(url, {
        params
      })
      .then((res: any) => {
        resolve(res.data);
      })
      .catch((err: any) => {
        console.log(err)
        var data = { code: "-2", message: "请求错误", data: "err.readyState" };
        resolve(data);
      });
  });
}

function deletetd(url: any, params: any) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, {
        params: params,
      })
      .then((res: any) => {
        resolve(res.data);
      })
      .catch((err: any) => {
        var data = { code: "-2", message: "请求错误", data: "err.readyState" };
        resolve(data);
      });
  });
}

function post(url: any, params: any = {}, contentType?: any) {
  return new Promise((resolve: any, reject: any) => {
    let sendParams = QS.stringify(params);
    if (contentType === 'application/json;charset=UTF-8') {
      sendParams = params;
    }
    axios
      .post(url, sendParams, { headers: { 'Content-Type': contentType ? contentType : "application/x-www-form-urlencoded;charset=UTF-8" } })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        var data = { code: "-2", message: "请求错误", data: "err.readyState" };
        resolve(data);
      });
  });
}

function request(url: any, options: any = {}) {
  let { method, single=false } = options || {};

  let params: {[k:string]:any} = options?.data || {};
  if (!single) params = Object.assign(params, { pageSize: localStorage.pageSize || 10 });
  options.data = params

  if (method) {
    switch (method.toUpperCase()) {
      case "POST": return post(url, options.data, options?.contentType);
      case "GET": return get(url, options.data);
      case "DELETE": return deletetd(url, options.data)
      default: return axios(url, options);
    }
  } else {
    get(url, options.data);
  }
}

export default request;
