// pages/welcome/welcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: '让传播知识价值最大化\n让获取知识价值平民化'
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
    setTimeout(function () {
      wx.switchTab({
        url: '../index/index',
      });
      // if (wx.getStorageSync('userInfo') == '') {
      //   wx.redirectTo({
      //     url: '../login/login',
      //   });
      // } else {
      //   wx.switchTab({
      //     url: '../index/index',
      //   });
      // }
    }, 3000);
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