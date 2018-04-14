// pages/addMoneyList/inAndOffMoneyList.js
var app = getApp()
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    paymentsList: [],

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
  doGetPaymentsList: function (e) {
    var that=this;
    wx.request({
      url: util.hostName + "User/getLiushui",
      data: {
        openid: wx.getStorageSync('openid'),
     
      },
      //若成功，保存返回的token到本地缓存
      success: function (res) {
          if(res.data==1){
            wx.showToast({
              title: '暂无记录',
              icon: 'success',
              duration: 2000
            })
          }else{
            that.setData({
              paymentsList: res.data
            })
          }
        console.info(res.data);
        
        // that.queryUserInfo(res.data)

      }
    })
  },
  onShow: function () {
    this.doGetPaymentsList()
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