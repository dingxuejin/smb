// pages/identify/identify.js
var link = require('../../utils/httpPath.js');
var utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAll: ['未完善', '已完善'],
    isAll1Index: 0,
    isAll2Index: 0,
    identifyList: ['未认证', '已认证'],
    isIdentify: 0
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
    var userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo: userInfo
    });
    console.log(this.data.userInfo);

    if (userInfo.realName) {
      this.setData({
        isIdentify: 1,
        isAll1Index: 1,
        isAll2Index: 1
      });
    }
  },

  goTo: function (e) {
    var url = '';
    switch (e.currentTarget.id) {
      case 'identity':
        url = '../identity/identity';
        break;
      case 'idCardPicture':
        url = '../idCardPicture/idCardPicture';
        break;
    }
    if (this.data.isIdentify == 1) {
      return;
    }
    wx.navigateTo({
      url: url,
    })
  },

  //上传审核
  doCommit: function () {
    wx.showLoading({
      title: '提交中..',
      mask: true
    })
    var params = {
      userid: wx.getStorageSync('userid'),
      realName: wx.getStorageSync('identity').realname,
      idcardNum: wx.getStorageSync('identity').idcardnum,
      frontIDUrl: wx.getStorageSync('idCardImg').frontImg,
      negativeIDUrl: wx.getStorageSync('idCardImg').nagetiveImg,
      photoUrl: wx.getStorageSync('idCardImg').handImg
    }
    link.httpPost(link.certificationAdd, params, function (response) {
      wx.hideLoading();
      utils.showToast('申请成功');
      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      }, 2000);
    }, function (msg) {
      wx.hideLoading();
      utils.showToast(msg, 'cancel');
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var identity = wx.getStorageSync('identity');
    var idCardImg = wx.getStorageSync('idCardImg');
    if (identity) {
      if (identity.realname &&
        identity.idcardnum) {
        this.setData({
          isAll1Index: 1
        });
      }
    }
    if (idCardImg) {
      if (idCardImg.frontImg &&
        idCardImg.nagetiveImg &&
        idCardImg.handImg) {
        this.setData({
          isAll2Index: 1
        });
      }
    }
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