// pages/login/login.js
var link = require('../../utils/httpPath.js');
var utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  goToLogin: function () {
    wx.navigateTo({
      url: '../login2/login2',
    });
  },
  goToRegister: function () {
    wx.navigateTo({
      url: '../register/register',
    });
  },
  goToThirdLogin: function () {
    var that = this;
    wx.showLoading({
      title: '请稍等..',
    })
    wx.getUserInfo({
      success: res => {
        console.log(res.userInfo);
        if (res.userInfo.gender == 1) {
          res.userInfo.gender = 0
        } else {
          res.userInfo.gender = 1
        }
        // app.globalData.userInfo = res.userInfo
        // this.setData({
        //   userInfo: res.userInfo,
        //   hasUserInfo: true
        // })
        wx.login({
          success: function (loginCode) {
            console.log(loginCode);

            var appid = link.app_id; //填写微信小程序appid  
            var secret = link.app_secret; //填写微信小程序secret  


            link.httpPost(link.userGetopenid, { code: loginCode.code }, function (response) {
              console.log(response.openid) //获取openid  
              that.doThirdLogin(that, res.userInfo, response.openid);
            }, function (msg) {
              wx.hideLoading();
            });

            //调用request请求api转换登录凭证  
            // wx.request({
            //   url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + link.app_id + '&secret=' + link.app_secret + '&grant_type=authorization_code&js_code=' + loginCode.code,
            //   header: {
            //     'content-type': 'application/json'
            //   },
            //   success: function (response) {
            //     console.log(response.data.openid) //获取openid  

            //     that.doThirdLogin(that, res.userInfo, response.data.openid);
            //   }
            // })
          },
          fail: function () {
            wx.hideLoading();
            utils.showToast('登录失败', 'cancel');
          }
        })
      },
      fail: function () {
        wx.hideLoading();
        utils.showToast('登录失败', 'cancel');
      }
    })
  },

  doThirdLogin: function (e, userInfo, openid) {
    var params = {
      nickName: userInfo.nickName,
      imgUrl: userInfo.avatarUrl,
      sex: userInfo.gender,
      uid: openid
    };
    link.httpPost(link.userThirdLogin, params, function (response) {
      console.log(response);

      wx.hideLoading();
      wx.setStorageSync('userid', response.id);
      wx.setStorageSync('userInfo', response);
      utils.showToast('登陆成功');
      setTimeout(function () {
        wx.switchTab({
          url: '../index/index',
        });
      }, 2000);
    }, function (msg) {
      wx.hideLoading();
      utils.showToast(msg, 'cancel');
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})