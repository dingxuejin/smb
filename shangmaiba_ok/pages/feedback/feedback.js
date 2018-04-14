// pages/feedback/feedback.js
var app = getApp();
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedback: ''
  },
  inputChange: function (e) {
    this.setData({
      feedback: e.detail.value
    });
  },
  commit: function () {
    if (!this.data.feedback) {
      util.showToast('请输入反馈内容', 'cancel');
      return;
    }
    wx.showLoading({
      title: '提交中..',
    })
    var that=this;
    wx.request({
      url: util.hostName + "User/feedBack",
      data: {

        openid: wx.getStorageSync('openid'),
        content: that.data.feedback,
      },
      success: function (res) {
        wx.hideLoading();
        util.showToast('发送成功');
        

      }
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