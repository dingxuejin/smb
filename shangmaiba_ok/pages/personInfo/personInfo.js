// pages/personal/personal.js
var link = require('../../utils/httpPath.js');
var utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nicknameOutHide: true,
    sexList: ['女', '男'],
    nickname: ''
  },
  sexChange: function (e) {
    var userInfo = this.data.userInfo;
    userInfo.sex = e.detail.value;
    this.setData({
      userInfo: userInfo
    });
  },
  bindDateChange: function (e) {
    var userInfo = this.data.userInfo;
    userInfo.birthday = e.detail.value;
    this.setData({
      userInfo: userInfo
    });
  },
  bindRegionChange: function (e) {
    var userInfo = this.data.userInfo;
    userInfo.city = e.detail.value;
    this.setData({
      userInfo: userInfo
    });
  },
  nicknameChang: function () {
    this.setData({
      nicknameOutHide: !this.data.nicknameOutHide
    });
  },
  nicknameOutCancel: function () {
    this.setData({
      nicknameOutHide: !this.data.nicknameOutHide
    });
  },
  nicknameOutConfirm: function (e) {
    var userInfo = this.data.userInfo;
    userInfo.nickName = this.data.nickname;
    this.setData({
      userInfo: userInfo,
      nicknameOutHide: !this.data.nicknameOutHide
    });
  },
  inputListener: function (e) {
    this.setData({
      nickname: e.detail.value
    });
  },
  headChange: function () {
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
              var userInfo = that.data.userInfo;
              userInfo.imgUrl = response.path;
              that.setData({
                userInfo: userInfo
              });
            }
          },
        });
      }
    });
  },

  //修改用户信息
  doUserUpdate: function () {
    var that = this;
    console.log(that.data.userInfo.birthday);
    wx.showLoading({
      title: '提交中..',
      mask: true
    });
    var city = '';
    for (var i in that.data.userInfo.city) {
      city += that.data.userInfo.city[i] + '，';
    }
    city = city.substring(0, city.length - 1);
    var params = {
      id: that.data.userInfo.id,
      imgUrl: that.data.userInfo.imgUrl,
      nickName: that.data.userInfo.nickName,
      sex: that.data.userInfo.sex,
      city: city,
      birthday: new Date(that.data.userInfo.birthday).getTime(),
    };
    link.httpPost(link.userUpdate, params, function (response) {
      wx.hideLoading();
      utils.showToast('修改成功');
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.doGetUserInfo(this);
  },

  //获取用户信息
  doGetUserInfo: function (e) {
    var params = {
      id: wx.getStorageSync('userid')
    };
    link.httpPost(link.userInfo, params, function (response) {
      wx.setStorageSync('userid', response.id);
      wx.setStorageSync('userInfo', response);
      response.birthday = utils.dateToString(response.birthday, 'yyyy-MM-dd');
      response.city = response.city.split('，');
      e.setData({
        userInfo: response
      });
      console.log(e.data.userInfo);
    }, function (msg) {
      utils.showToast(msg, 'cancel');
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