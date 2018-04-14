// pages/myRelease/myRelease.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    type1List: [],
    isPassList: ['待审核', '已通过', '未通过']
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

  goTo: function (e) {
    var url = '';
    switch (e.currentTarget.id) {
      case 'release':
      wx.switchTab({
        url : '../fabu/fabu',
      
      })
        
        break;
      case 'myAudio':
        url = '../myAudio/myAudio';
        break;
      case 'myVideo':
        url = '../myVideo/myVideo';
        break;
    }
    wx.navigateTo({
      url: url,
    })
  },

  //获取我的发布列表

  

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