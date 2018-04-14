// pages/identity/identity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    outHide: true,
    outTitle: '',
    outDefault: '',
    realname: wx.getStorageSync('identity').realname,
    idcardnum: wx.getStorageSync('identity').idcardnum
  },
  realnameChange: function () {
    this.setData({
      outHide: false,
      outTitle: '真实姓名',
      outDefault: this.data.realname
    });
  },
  idCardNumChange: function () {
    this.setData({
      outHide: false,
      outTitle: '身份证号',
      outDefault: this.data.idcardnum
    });
  },
  inputListener: function (e) {
    this.setData({
      outDefault: e.detail.value
    });
  },
  outConfirm: function () {
    switch (this.data.outTitle) {
      case '真实姓名':
        this.setData({
          realname: this.data.outDefault
        });
        break;
      case '身份证号':
        this.setData({
          idcardnum: this.data.outDefault
        });
        break;
    }
    this.setData({
      outHide: true
    });
    console.log(this.data);
  },
  outCancel: function () {
    this.setData({
      outHide: true
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
    this.setData({
      realname: wx.getStorageSync('identity').realname,
      idcardnum: wx.getStorageSync('identity').idcardnum
    });
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
    var identity = {
      realname: this.data.realname,
      idcardnum: this.data.idcardnum
    };
    wx.setStorageSync('identity', identity);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var identity = {
      realname: this.data.realname,
      idcardnum: this.data.idcardnum
    };
    wx.setStorageSync('identity', identity);
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