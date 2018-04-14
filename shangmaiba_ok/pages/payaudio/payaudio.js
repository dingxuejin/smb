// pages/audio/audio.js
var app = getApp()
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    pic: [],
    page: 1,
    pageSize: 8,
    picsrc: util.picsrc,
    allnum: '',
    hidden: false,
    showModal: false,
    inputShowed: false,
    inputVal: "",
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
    this.data.page = 1;//初始化当前页为1
    this.data.list = [];//初始化列表数据集
    this.getAudioList();
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

  },

  getAudioList: function () {

    var that = this;
    wx.request({
      url: util.hostName + "User/getPayAudioList",
      method: 'post',
      traditional: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        page: that.data.page,
        pageSize: that.data.pageSize,
        openid: wx.getStorageSync('openid'),
      },
      success: function (res) {
        res.data.data.forEach((item, index) => {
          res.data.data[index].shichang = util.getShi(item.shichang);
        })

        that.setData({
          list: that.data.list.concat(res.data.data),
          page: that.data.page + 1,
          allnum: res.data.count,
          hidden: true,
        })
      }
    })
  },
  ////////////////
  onPullDownRefresh: function () {
    this.data.hidden = false,
      this.data.list = [],//初始化列表数据集
      this.data.page = 1,//初始化当前页为1
      this.getAudioList();

  },
  onReachBottom: function () {
    var allpage = this.data.allnum / this.data.pageSize;
    allpage = Math.ceil(allpage);
    console.info(allpage);
    console.info(this.data.page);
    if (this.data.page > allpage) {
      wx.showToast({
        title: '没有更多数据',
      })

    } else {
      this.setData({
        hidden: false,
      })
      this.data.hidden = false;
      this.getAudioList();

    }
  },
})


