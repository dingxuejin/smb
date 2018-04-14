// pages/login2/login2.js
const app = getApp();

var link = require('../../utils/httpPath.js');
var utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: ''
  },
  inputListener: function (e) {
    switch (e.currentTarget.id) {
      case 'phone':
        this.setData({
          phone: e.detail.value
        });
        break;
      case 'password':
        this.setData({
          password: e.detail.value
        });
        break;
    }
  },
  doLogin: function () {
    if (!this.data.phone) {
      utils.showToast('请输入手机号', 'cancel');
      return;
    }
    if (!this.data.password) {
      utils.showToast('请输入密码', 'cancel');
      return;
    }
    wx.showLoading({
      title: '登陆中..',
    })
    var params = {
      phone: this.data.phone,
      password: this.data.password
    };
    link.httpPost(link.userLogin, params, function (response) {
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
    });
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