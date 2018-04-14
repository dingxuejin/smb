// pages/histroy/histroy.js
var link = require('../../utils/httpPath.js');
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyList: [],
    pageSize: 8,
    pageNum: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pageHeight: wx.getSystemInfoSync().windowHeight + 'px'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.doGetHistory(this);
  },
  doGetHistory: function (e) {
    wx.showLoading({
      title: '加载中..',
    })
    var that = this;
    var params = {
      pageSize: this.data.pageSize,
      pageNum: this.data.pageNum,
      userid: wx.getStorageSync('userid')
    };
    link.httpPost(link.historyList, params, function (response) {
      wx.hideLoading();
      // e.setData({
      //   historyList: response.list
      // });

      if (that.data.pageNum == 1) {
        e.setData({
          historyList: response.list
        });
      } else {
        var list = e.data.historyList;
        for (var i in response.list) {
          list.push(response.list[i]);
        }
        e.setData({
          historyList: list
        });
      }
    }, function (msg) {
      wx.hideLoading();
      util.showToast(msg, 'cancel');
    });
  },
  goTo: function (e) {
    if (e.currentTarget.dataset.id.type == 1) {
      wx.navigateTo({
        url: '../videoInfo/videoInfo?id=' + e.currentTarget.dataset.id.releaseid,
      });
    } else {
      wx.navigateTo({
        url: '../audioInfo/audioInfo?id=' + e.currentTarget.dataset.id.releaseid,
      });
    }
  },

  changePage: function () {
    var pageNum = this.data.pageNum;
    console.log(pageNum);
    this.setData({
      pageNum: pageNum + 1
    });
    this.doGetHistory(this);
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