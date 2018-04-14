// pages/fabu/fabu.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money_now:0,
    v_price:0,
    a_price:0,
    t_price:0,
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
      url: util.hostName + "User/getUserInfo",
      data: {

        token: wx.getStorageSync('token')
      },
      success: function (res) {
        wx.setStorageSync('openid', res.data.openid);
        that.setData({
          money_now: res.data.money,
        })
         console.log(that.data.money_now);
      }
    })
    wx.request({
      url: util.hostName + "User/getAllSet",
      // data: {

      //   token: wx.getStorageSync('token')
      // },
      success: function (res) {
        // wx.setStorageSync('openid', res.data.openid);
        that.setData({
          v_price: res.data.v_price,
          a_price: res.data.a_price,
          t_price: res.data.t_price,
        })
        console.log(that.data.v_price);
        console.log(that.data.a_price);
        console.log(that.data.t_price);
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  goTo1: function (e) {
      //////////
    var money_now1 = parseInt(this.data.money_now);
    var v_price1 = parseInt(this.data.v_price);
        wx.showModal({
          title: '提示',
          content: '发布视频价格为：'+this.data.v_price+'元，确实需要发布吗？',
          confirmText: "去发布",
          cancelText: "再想想",
          success: function (res) {
            console.log(res);
            if (res.confirm) {
                  if (money_now1 <= v_price1){
                          ///////////
                                wx.showModal({
                                  title: '提示',
                                  content: '您的余额不足，请先充值！',
                                  confirmText: "去充值",
                                  cancelText: "再缓缓",
                                  success: function (res) {
                                    console.log(res);
                                    if (res.confirm) {
                                      wx.navigateTo({
                                        url: '../packet/packet'///参数OPenid vprice1
                                      })
                                    } else {
                                      console.log('用户点击辅助操作')
                                    }
                                  }
                                });
                          //////////////
                  }else{
                    wx.navigateTo({
                      url: '../addv/addv?openid=' + wx.getStorageSync('openid') + '&v_price=' + v_price1///参数OPenid vprice1
                    })
                  }
            } else {
              
            }
          }
        });
      /////////
    
  },
  ////////////////////
  //////////////
  goTo2: function (e) {
    //////////
    var money_now1 = parseInt(this.data.money_now);
    var a_price1 = parseInt(this.data.a_price);
    wx.showModal({
      title: '提示',
      content: '发布音频价格为：' + this.data.a_price + '元，确实需要发布吗？',
      confirmText: "去发布",
      cancelText: "再想想",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          if (money_now1 < a_price1) {
            ///////////
            wx.showModal({
              title: '提示',
              content: '您的余额不足，请先充值！',
              confirmText: "去充值",
              cancelText: "再缓缓",
              success: function (res) {
                console.log(res);
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../packet/packet'///参数OPenid vprice1
                  })
                } else {
                  console.log('用户点击辅助操作')
                }
              }
            });
            //////////////
          } else {
            wx.navigateTo({
              url: '../adda/adda?openid=' + wx.getStorageSync('openid') + '&a_price=' + a_price1///参数OPenid vprice1
            })
          }
        } else {

        }
      }
    });
    /////////
},
  //////////////
  goTo3: function (e) {
    //////////
    var money_now1 = parseInt(this.data.money_now);
    var t_price1 = parseInt(this.data.t_price);
    wx.showModal({
      title: '提示',
      content: '发布文字价格为：' + this.data.t_price + '元，确实需要发布吗？',
      confirmText: "去发布",
      cancelText: "再想想",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          if (money_now1 < t_price1) {
            ///////////
            wx.showModal({
              title: '提示',
              content: '您的余额不足，请先充值！',
              confirmText: "去充值",
              cancelText: "再缓缓",
              success: function (res) {
                console.log(res);
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../packet/packet'///参数OPenid vprice1
                  })
                } else {
                  console.log('用户点击辅助操作')
                }
              }
            });
            //////////////
          } else {
            wx.navigateTo({
              url: '../addt/addt?openid=' + wx.getStorageSync('openid') + '&t_price=' + t_price1///参数OPenid vprice1
            })
          }
        } else {

        }
      }
    });
    /////////

  },
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