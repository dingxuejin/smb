//app.js
var util = require('./utils/util.js');
App({
  onLaunch: function () {
    var token = wx.getStorageSync('token');
    if (token == null || token == "") {
      //token为空执行登录
      this.login();

    } else {
      //token不为空获取user信息
      // this.queryUserInfo(token);
      console.info(token);
      // console.info(this.globalData.userInfo)
      // console.info(wx.getStorageSync('token'));
    }
  },
  ///////////


  ////////////////
  login: function () {
    var that = this;
    //获取授权码
    wx.login({
      success: function (e) {
        console.info(e.code)
        //获取用户信息
        wx.getUserInfo({
          success: function (res) {

            console.info(res.userInfo);
            //调用后端登录接口
            wx.request({
              url: util.hostName + "User/loginAction",
              data: {
                code: e.code,
                nickname: res.userInfo.nickName,
                head_img: res.userInfo.avatarUrl
              },
              //若成功，保存返回的token到本地缓存
              success: function (res) {

                console.info(res.data);
                wx.setStorageSync('token', res.data);
                // that.queryUserInfo(res.data)

              }
            })

          },
          fail: function () {
            // that.globalData.isLogin = false;
            wx.request({
              url: util.hostName + "User/loginAction",
              data: {
                code: e.code,

              },
              //若成功，保存返回的token到本地缓存
              success: function (res) {


                wx.setStorageSync('token', res.data);
                //  that.queryUserInfo(res.data)
                console.info(res.data);
              }
            })
          }
        })
      }

    })


  },

  /////////////
  //   globalData: {
  //     userInfo: null
  //   }
})