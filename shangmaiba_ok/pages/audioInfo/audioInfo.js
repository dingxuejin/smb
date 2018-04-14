// pages/videoInfo/videoInfo.js

var link = require('../../utils/httpPath.js');
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    buytext: '',
    picsrc: util.picsrc,
    recommendid: 0,
    tj_openid: "9999",
    id: 0,
    body: [],
    isplay:1,
    commentList: [],
    content: '',
    contentTitle: '添加评论',
    isLikeList: ['../../image/ic_like.png', '../../image/ic_liked.png'],
    isReply: false,
    commentIndex: 0,
    page: 1,
    pageSize: 4,
    money_now: 0,
  },

  getAudio: function (e) {

    var that = this;
    wx.request({
      url: util.hostName + "User/getAudio",
      data: {
        id: that.data.id

      },
      success: function (res) {

        wx.setNavigationBarTitle({
          title: res.data.title
        })
        res.data.shichang = util.getShi(res.data.shichang);




        that.setData({
          // body: that.data.list.concat(res.data.data),
          body: res.data,
          // hidden: true,
        })
        console.info(that.data.body);
      }
    })
  },
  ///////////
  getuser: function () {

    var that = this;
    wx.request({
      url: util.hostName + "User/getUserInfo",
      data: {

        token: wx.getStorageSync('token')
      },
      success: function (res) {
        wx.setStorageSync('openid', res.data.openid)
        that.setData({
          money_now: res.data.money,
        })

      }
    })
  },
  /////////
  ///////////
  getOrder: function () {

    var that = this;
    wx.request({
      url: util.hostName + "User/getOrder",
      data: {
        content_id: that.data.id,
        token: wx.getStorageSync('token')
      },
      success: function (res) {

        if (res.data == 0) {
          that.setData({
            isplay: 0,
            buytext: '已购买'
          })

        }
        if (res.data == 1) {
          that.setData({
            isplay: 1,
            buytext: '未购买'
          })
        }
      }
    })
  },
  /////////
  //播放监听
  bindplay: function () {
    var a = wx.getStorageSync("openid");
    var b = this.data.body.userid;
    console.log(a);
    console.log(b);
    if (a == b) {
      return false;
    }
    var that = this;
    var money_now1 = parseInt(that.data.money_now);
    var p_price1 = parseInt(that.data.body.p_price);
    if (this.data.isplay == 1) {
      console.log(1111111111);
      this.videoContext.pause();
      // this.audioCtx.pause();
      wx.showModal({
        title: '播放',
        content: '观看本视频需要支付' + this.data.body.p_price + '元，您需要继续播放吗？',
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            if (money_now1 >= p_price1) {
                      /////////////
              wx.request({
                url: util.hostName + "User/payOk11",
                data: {
                  content_id: that.data.id,
                  openid: wx.getStorageSync('openid'),
                  tj_openid: that.data.tj_openid,
                  p_price: that.data.body.p_price,
                  s_price: that.data.body.s_price,
                  userid: that.data.body.userid,


                },

                success: function (res) {
                  wx.showModal({
                    confirmColor: "#5FA9E6",
                    title: '提示',
                    showCancel: false,
                    content: '您已成功购买此资源',
                    success: function (res) {
                      that.setData({
                        isplay: 0,
                      })
                    }
                  })

                },
              })

                      ///////////
            }else{
              wx.showModal({
                title: '提示',
                content: '当前余额不足，是否用微信直接支付？',
                confirmText: "微信支付",
                cancelText: "再等等",
                success: function (res) {
                  console.log(res);
                  if (res.confirm) {
                    //////////
                    wx.request({
                      url: util.hostName + "User/pay",
                      data: {

                        openid: wx.getStorageSync('openid'),
                        body: that.data.body.title,
                        order_sn: util.RndNum(5),
                        total_fee: that.data.body.p_price,


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
                              url: util.hostName + "User/payOk",
                              data: {
                                content_id: that.data.id,
                                openid: wx.getStorageSync('openid'),
                                tj_openid: that.data.tj_openid,
                                p_price: that.data.body.p_price,
                                s_price: that.data.body.s_price,
                                userid: that.data.body.userid,


                              },

                              success: function (res) {
                                wx.showModal({
                                  confirmColor: "#5FA9E6",
                                  title: '提示',
                                  showCancel: false,
                                  content: '您已成功购买此资源',
                                  success: function (res) {
                                    that.setData({
                                      isplay: 0,
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
                  } else {
                    console.log('用户点击辅助操作')
                  }
                }
              });
            }
            
          } else {

          }
        },

      });
    }
  },

  //播放记录
  // doHistoryAdd: function (e) {
  //   var params = {
  //     userid: wx.getStorageSync('userid'),
  //     releaseid: this.data.id
  //   };
  //   link.httpPost(link.historyAdd, params, function (response) {
  //   }, function (msg) {
  //   })
  // },
  //付钱
  // doReleasePay: function (e) {
  //   var that = this;
  //   var params = {
  //     userid: wx.getStorageSync('userid'),
  //     id: this.data.id,
  //     recommendid: this.data.recommendid
  //   };
  //   link.httpPost(link.releasePay, params, function (response) {
  //     that.audioCtx.play();
  //     e.setData({
  //       isplay: true
  //     });
  //     that.doHistoryAdd(that);
  //   }, function (msg) {
  //     util.showToast(msg, 'cancel');
  //     wx.navigateBack({
  //       delta: 1
  //     })
  //   })
  // },

  //获取评论列表
  doCommentList: function (e) {
    wx.showLoading({
      title: '加载评论中..',
    })
    var that = this;
    wx.request({
      url: util.hostName + "User/getCommentList",
      data: {
        id: that.data.id,
        page: that.data.page,
        pageSize: that.data.pageSize,

      },
      success: function (res) {


        that.setData({
          // body: that.data.list.concat(res.data.data),
          commentList: res.data.data,
          page: that.data.page + 1,
          allnum: res.data.count,
          // hidden: true,
        })
        wx.hideLoading();

      }
    })
    // var params = {
    //   userid: wx.getStorageSync('userid'),
    //   releaseid: this.data.id,
    //   pageSize: this.data.pageSize,
    //   pageNum: this.data.pageNum
    // };
  },
  doCommentDelete: function (e) {
    var that = this;
    wx.showLoading({
      title: '提交中..',
    })
    var params = {
      userid: wx.getStorageSync('userid'),
      id: e.currentTarget.dataset.id
    };
    link.httpPost(link.commentDelete, params, function (response) {
      wx.hideLoading();
      util.showToast('删除成功');
      that.setData({
        pageNum: 1
      });
      that.doCommentList(that);
    }, function (msg) {
      wx.hideLoading();
      util.showToast(msg, 'cancel');
    })
  },
  //添加评论
  doCommentAdd: function (e) {
    if (this.data.content == "") {
      wx.showToast({
        title: '请输入内容！',
        icon: 'success',
        duration: 2000
      })
    }
    wx.showLoading({
      title: '提交中..',
    })
    var that = this;
    var token = wx.getStorageSync('token') || "";
    // var params = {

    //   releaseid: this.data.id,
    //   content: this.data.content
    // };
    wx.request({
      url: util.hostName + "User/CommentAdd",
      data: {
        token: token,
        id: that.data.id,
        content: that.data.content
      },
      //method:'POST',
      //header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {

        wx.showToast({
          title: "以成功提交",
          icon: "success",
          duration: 2000,
          success: function () {

            wx.hideLoading();
          }

        });
        that.setData({
          page: 1,
          commentList: [],
        })
        that.doCommentList();




      }
    })
    // link.httpPost(link.commentAdd, params, function (response) {
    //   wx.hideLoading();
    //   util.showToast('评论成功');
    //   e.setData({
    //     pageNum: 1
    //   });
    //   e.doCommentList(e);
    // }, function (msg) {
    //   wx.hideLoading();
    //   util.showToast(msg, 'cancel');
    // })
  },
  inputChange: function (e) {
    this.setData({
      content: e.detail.value
    });
  },
  powerDrawer: function (e) {
    if (e.currentTarget.dataset.type == 'reply') {
      this.setData({
        contentTitle: '回复' + e.currentTarget.dataset.username,
        isReply: true,
        content: '',
        commentid: e.currentTarget.dataset.id,
        repliedid: e.currentTarget.dataset.userid,
        commentIndex: e.currentTarget.dataset.index
      });
    }
    if (e.currentTarget.id == 'commentShow') {
      this.setData({
        contentTitle: '添加评论',
        isReply: false,
        content: ''
      });
    }
    if (e.currentTarget.id == 'commit') {
      if (this.data.isReply) {
        if (!this.data.content) {
          util.showToast('请输入回复内容');
          return;
        }
        this.doReply(this, this.data.commentid, this.data.repliedid);
      } else {
        if (!this.data.content) {
          util.showToast('请输入评论内容');
          return;
        }
        this.doCommentAdd(this);
      }
    }
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
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

  //点赞
  likeChange: function (e) {
    var that = this;
    var url = '';
    console.log(e.currentTarget.dataset);
    if (e.currentTarget.dataset.islike == 0) {
      url = link.commentLikeAdd;
    } else {
      url = link.commentLikeDelete;
    }
    var params = {
      likeid: wx.getStorageSync('userid'),
      commentid: e.currentTarget.dataset.id
    };
    link.httpPost(url, params, function (response) {
      wx.hideLoading();
      if (e.currentTarget.dataset.islike == 0) {
        util.showToast('点赞成功');
        var commentList = that.data.commentList;
        commentList[e.currentTarget.id].isLike = 1;
        commentList[e.currentTarget.id].likeNum++;
        that.setData({
          commentList: commentList
        });
      } else {
        util.showToast('取消点赞成功');
        var commentList = that.data.commentList;
        commentList[e.currentTarget.id].isLike = 0;
        commentList[e.currentTarget.id].likeNum--;
        that.setData({
          commentList: commentList
        });
      }
    }, function (msg) {
      wx.hideLoading();
      util.showToast(msg, 'cancel');
    })
  },

  //回复
  doReply: function (e, commentid, repliedid) {
    var that = this;
    wx.showLoading({
      title: '提交中..',
    })
    var params = {
      replyid: wx.getStorageSync('userid'),
      repliedid: repliedid,
      commentid: commentid,
      content: this.data.content
    };
    link.httpPost(link.commentReplyAdd, params, function (response) {
      wx.hideLoading();
      util.showToast('回复成功');
      var commentList = that.data.commentList;
      commentList[that.data.commentIndex].replyList.push(response);
      that.setData({
        commentList: commentList
      });
    }, function (msg) {
      wx.hideLoading();
      util.showToast(msg, 'cancel');
    })
  },

  changePage: function () {
    var allpage = this.data.allnum / this.data.pageSize;
    allpage = Math.ceil(allpage);
    console.info(allpage);
    console.info(this.data.page);
    if (this.data.page > allpage) {
      wx.showToast({
        title: '没有更多数据',
      })

    } else {
      // this.setData({
      //   hidden: false,
      // })
      // this.data.hidden = false;
      this.doCommentList();

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.videoContext = wx.createVideoContext('myVideo');
    // this.audioCtx = wx.createAudioContext('myAudio');
    this.setData({
      id: options.id,
      tj_openid: (options.tj_openid ? options.tj_openid : "9999"),
      recommendid: (options.recommendid ? options.recommendid : 0),
      pageHeight: (wx.getSystemInfoSync().windowHeight - 60) + 'px'
    });
    this.getAudio();
    //////////////////锁定关系表
    var that = this;
    if (this.data.tj_openid != "9999") {
      wx.request({
        url: util.hostName + "User/zhuanAdd",
        data: {
          token: wx.getStorageSync('token'),
          content_id: that.data.id,
          tj_openid: options.tj_openid,
        },
        //若成功，保存返回的token到本地缓存
        success: function (res) {

        }
      })

    }


    //////////////////
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.getAudio(this);
    this.doCommentList(this);
    this.getuser();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getOrder();
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
    console.log(123123);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var that = this;
    if (!wx.getStorageSync('openid')) {
      var token = wx.getStorageSync('token') || "";
      wx.request({
        url: util.hostName + "User/getUserInfo",
        data: {
          token: token,

        },
        //若成功，保存返回的token到本地缓存
        success: function (res) {
          wx.setStorageSync('openid', res.data.openid);
        }
      })
    }


    if (res.from == 'menu') {
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    return {
      title: that.data.body.name,
      path: '/pages/audioInfo/auudioInfo?id=' + that.data.id + '&tj_openid=' + wx.getStorageSync('openid'),
      success: function (res) {
        util.showToast('转发成功');

      },
      fail: function (res) {
        util.showToast('转发失败');
      }
    }
  }
})