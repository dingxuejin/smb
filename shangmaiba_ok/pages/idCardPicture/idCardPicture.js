// pages/idCardPicture/idCardPicture.js
var link = require('../../utils/httpPath.js');
var utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    frontImg: '../../image/bg_upload.png',
    nagetiveImg: '../../image/bg_upload.png',
    handImg: '../../image/bg_upload.png'
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
      frontImg: wx.getStorageSync('idCardImg').frontImg,
      nagetiveImg: wx.getStorageSync('idCardImg').nagetiveImg,
      handImg: wx.getStorageSync('idCardImg').handImg
    });
  },

  frontChange: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        wx.uploadFile({
          url: link.uploadImg,
          name: 'image',
          filePath: res.tempFilePaths[0],
          success: function (response) {
            if (response.statusCode == 200) {
              response = JSON.parse(response.data);
              that.setData({
                frontImg: response.path
              });
            }
          },
        });
      }
    });
  },
  nagetiveChange: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        wx.uploadFile({
          url: link.uploadImg,
          name: 'image',
          filePath: res.tempFilePaths[0],
          success: function (response) {
            if (response.statusCode == 200) {
              response = JSON.parse(response.data);
              that.setData({
                nagetiveImg: response.path
              });
            }
          },
        });
      }
    });
  },
  handChange: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        wx.uploadFile({
          url: link.uploadImg,
          name: 'image',
          filePath: res.tempFilePaths[0],
          success: function (response) {
            if (response.statusCode == 200) {
              response = JSON.parse(response.data);
              that.setData({
                handImg: response.path
              });
            }
          },
        });
      }
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
    var idCardImg = {};
    if (this.data.frontImg != '../../image/bg_upload.png') {
      idCardImg.frontImg = this.data.frontImg;
    }
    if (this.data.nagetiveImg != '../../image/bg_upload.png') {
      idCardImg.nagetiveImg = this.data.nagetiveImg;
    }
    if (this.data.handImg != '../../image/bg_upload.png') {
      idCardImg.handImg = this.data.handImg;
    }
    wx.setStorageSync('idCardImg', idCardImg);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var idCardImg = {
      frontImg: this.data.frontImg,
      nagetiveImg: this.data.nagetiveImg,
      handImg: this.data.handImg
    };
    wx.setStorageSync('idCardImg', idCardImg);
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