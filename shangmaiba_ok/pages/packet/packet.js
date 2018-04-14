// pages/packet/packet.js
// var app = getApp()
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: 0,
    getInMoney: 0,
    showModalStatus: false,
    showModalStatus2: false,
    applyMoney: 0,
    applyMoney2: 0,
    applyAccount: '',
    userinfo:[],
  },
  powerDrawer: function (e) {
    console.log('powerDrawer');
    if (e.currentTarget.id == 'commit') {
      if (!parseFloat(this.data.applyMoney)) {
        util.showToast('提现金额不正确');
        return;
      }
      if (this.data.applyMoney>this.data.userinfo["money"]) {
        util.showToast('金额不能大于余额'); 
        return;
      }
      if (this.data.applyMoney <= 0) {
        util.showToast('提现金额应大于零');
        return;
      }
      if (!this.data.applyAccount) {
        util.showToast('请输入提现微信号');
        return;
      }
      this.doWithdrawalsAdd(this);
    }
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
 

  powerDrawer2: function (e) {
    console.log('powerDrawer2');
    if (e.currentTarget.id == 'commit2') {
      if (!parseFloat(this.data.applyMoney2)) {
        util.showToast('金额不正确', 'cancel');
        return;
      }
      if (this.data.applyMoney2 <= 0) {
        util.showToast('金额应大于零', 'cancel');
        return;
      }
      /**
       * 支付
       */
      this.doAddCarsh();
    }
    var currentStatu = e.currentTarget.dataset.statu;
    this.util2(currentStatu)
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
    this.doGetWalletInfo();
  },
  doWithdrawalsAdd: function (e) {
  
    wx.request({
      url: util.hostName + "User/tiAdd",
      data: {
        openid: wx.getStorageSync('openid'),
        money: this.data.applyMoney,
        wechat: this.data.applyAccount

      },
      //若成功，保存返回的token到本地缓存
      success: function (res) {
        wx.showModal({
          title: '提示',
          showCancel:false,
          content: '提现成功等待审核',
          success: function (res) {
            
            if (res.confirm) {
              wx.switchTab({
                url: '../personal/personal'
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })

        // that.queryUserInfo(res.data)

      }
    })
    // wx.showLoading({
    //   title: '提交中..',
    // })
    // var params = {
    //   userid: wx.getStorageSync('userid'),
    //   money: this.data.applyMoney,
    //   wechat: this.data.applyAccount
    // };
    // link.httpPost(link.withdrawalsAdd, params, function (response) {
    //   wx.hideLoading();
    //   utils.showToast('申请成功');
    //   e.doGetWalletInfo(e);
    // }, function (msg) {
    //   wx.hideLoading();
    //   utils.showToast(msg, 'cancel');
    // });
  },
  doGetWalletInfo: function (e) {
    // var aaa = wx.getStorageSync('user');
    // this.setData({
    //   userinfo: aaa
    // })
    var that = this;
    wx.request({
      url: util.hostName + "User/getUserInfo",
      data: {

        token: wx.getStorageSync('token')
      },
      success: function (res) {
        wx.setStorageSync('openid', res.data.openid);
        that.setData({
          userinfo: res.data,
        })
        
      }
    })
  },
  goTo: function (e) {
    var url = '';
    switch (e.currentTarget.id) {
      case 'addMoneyList':
        url = '../addMoneyList/addMoneyList';
        break;
      case 'getMoneyList':
        url = '../getMoneyList/getMoneyList';
        break;
      case 'inAndOffMoneyList':
        url = '../inAndOffMoneyList/inAndOffMoneyList';
        break;
    }
    wx.navigateTo({
      url: url,
    })
  },
  inputChange: function (e) {
    if (e.currentTarget.id == 'applyMoney') {
      this.setData({
        applyMoney: e.detail.value
      });
    } else {
      this.setData({
        applyAccount: e.detail.value
      });
    }
  },
  inputChange2: function (e) {
    this.setData({
      applyMoney2: e.detail.value
    });
  },
//////////////////////微信支付
  doAddCarsh: function () {
    //////////
    var that=this;
    wx.request({
      url: util.hostName + "User/pay",
      data: {

        openid: wx.getStorageSync('openid'),
        body: '上麦吧充值',
        order_sn: util.RndNum(5),
        total_fee: that.data.applyMoney2,


      },

      success: function (res) {


        wx.requestPayment({
          'timeStamp': res.data.data.timeStamp,
          'nonceStr': res.data.data.nonceStr,
          'package': res.data.data.package,
          'signType': res.data.data.signType,
          'paySign': res.data.data.paySign,
          'success': function (res) {
            wx.request({
              url: util.hostName + "User/payOk1",
              data: {
                // content_id: that.data.id,
                openid: wx.getStorageSync('openid'),
                // tj_openid: that.data.payinfo.tj_openid,
                p_price: that.data.applyMoney2,
                total_fee: that.data.applyMoney2,
                // s_price: that.data.body.s_price,
                // userid: that.data.body.userid,


              },

              success: function (res) {
                wx.showModal({
                  confirmColor: "#5FA9E6",
                  title: '提示',
                  showCancel: false,
                  content: '充值成功',
                  success: function (res) {
                    wx.switchTab({
                      url: '../personal/personal'
                    })
                  }
                })

              },
            })

          },
          'fail': function (res) {
            wx.showModal({
              confirmColor: "#5FA9E6",
              title: '失败提示',
              showCancel: false,
              content: '微信支付失败，请重新再试',
              success: function (res) {

              }
            })
          }
        })
      },
    })
           ///////////

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

  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200, //动画时长 
      timingFunction: "linear", //线性 
      delay: 0 //0则不延迟 
    });
    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation;

    // 第3步：执行第一组动画 
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData: animation
      })

      //关闭 
      if (currentStatu == "close") {
        this.setData({
          showModalStatus: false
        });
      }
    }.bind(this), 200)

    // 显示 
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  },
  util2: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200, //动画时长 
      timingFunction: "linear", //线性 
      delay: 0 //0则不延迟 
    });
    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation;

    // 第3步：执行第一组动画 
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData2: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData2: animation
      })

      //关闭 
      if (currentStatu == "close") {
        this.setData({
          showModalStatus2: false
        });
      }
    }.bind(this), 200)

    // 显示 
    if (currentStatu == "open") {
      this.setData({
        showModalStatus2: true
      });
    }
  },
})