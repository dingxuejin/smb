// pages/personal/personal.js
// var app = getApp();
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  goTo: function (e) {
    var url = '';
    switch (e.currentTarget.id) {
      case 'personInfo':
      var that=this;
        wx.openSetting({
          success: (res) => {
            
             res.authSetting = {
                "scope.userInfo": true
                
              }
             if(res.authSetting["scope.userInfo"]){

               wx.getUserInfo({
                 success: function (res) {

                   console.info(res.userInfo);
                   
                   wx.request({
                     url: util.hostName + "User/userInfoUp",
                     data: {
                       openid: wx.getStorageSync('openid'),
                       nickname: res.userInfo.nickName,
                       head_img: res.userInfo.avatarUrl
                     },
                     //若成功，保存返回的token到本地缓存
                     success: function (res) {

                       console.info(res.data);
                       that.setData({
                         userInfo:res.data
                       })
                       // that.queryUserInfo(res.data)

                     }
                   })

                 },
               
               })
             }
          }
        })
        break;
      case 'identify':
        url = '../identify/identify';
        wx.navigateTo({
          url: url,
        });
        break;
      case 'packet':
        url = '../packet/packet';
        wx.navigateTo({
          url: url,
        });
        break;
      case 'myRelease':
        url = '../myRelease/myRelease';
        wx.navigateTo({
          url: url,
        });
        break;
      case 'histroy':
        url = '../mypay/mypay';
        wx.navigateTo({
          url: url,
        });
        break;
      case 'feedback':
        url = '../feedback/feedback';
        wx.navigateTo({
          url: url,
        });
        break;
    
      
    }
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

  //获取用户信息

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var token = wx.getStorageSync('token');
   
    this.queryUserInfo(token);
  },
  queryUserInfo: function (token) {

    var that = this
    if (token != "" && token != null) {
      wx.request({
        url: util.hostName + "User/getUserInfo",
        data: { token: token },
        //method:'POST',
        //header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          wx.setStorageSync('openid',res.data.openid);
          that.setData({
            userInfo: res.data
          })
          console.info(res);
          wx.setStorageSync('user', res.data);
          

        }
      })
    }
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