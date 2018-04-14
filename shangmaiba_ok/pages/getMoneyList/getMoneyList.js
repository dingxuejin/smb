// pages/addMoneyList/getMoneyList.js
var util = require('../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    withdrawalsList: [],
    colorList: ['#c4c4c4', '#00cc00', '#dd5656'],
    typeList: ['待审核', '提现成功', '提现失败'],
    pageSize: 8,
    pageNum: 1
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
    var that = this;
    wx.request({
      url: util.hostName + "User/getTi",
      data: {
        openid: wx.getStorageSync('openid'),

      },
      //若成功，保存返回的token到本地缓存
      success: function (res) {
        if (res.data == 1) {
          wx.showToast({
            title: '暂无记录',
            icon: 'success',
            duration: 2000
          })
        } else {
          that.setData({
            withdrawalsList: res.data
          })
        }
        console.info(res.data);

        // that.queryUserInfo(res.data)

      }
    })
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