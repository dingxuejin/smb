// pages/release/release.js
var link = require('../../utils/httpPath.js');
var utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRecord: false,
    dialogIsHidden: true,
    record: ['../../image/ic_record.png', '../../image/ic_stop.png'],
    recordType: 0,
    cover: '../../image/bg_upload.png',
    path: '',
    title: '',
    content: '',
    introduce: '',
    price: 0,
    rebatePrice: 0,
    times: 0,
    authorname: wx.getStorageSync('identity').realname,
    Type1Index: 0,
    Type1: ['音频', '视频'],
    Type2Index: 0,
    Type2: ['全部'],
    Type3Index: 0,
    Type3: ['音频', '文字'],
    videoShow: true,
    audioShow: false,
    audioTextShow: true,
    audioUploadShow: false,
    uploadortext: false,
    paperCheck: false
  },
  bindPicker1Change: function (e) {
    if (e.detail.value == 0) {
      this.setData({
        Type1Index: e.detail.value,
        videoShow: true,
        audioShow: false,
        uploadortext: false,
      })
      this.getReleaseType(this);
    } else {
      this.setData({
        Type1Index: e.detail.value,
        videoShow: false,
        audioShow: true,
        uploadortext: true,
        audioTextShow: true,
        audioUploadShow: false
      })
      this.getReleaseType(this);
    }
  },
  bindPicker2Change: function (e) {
    this.setData({
      Type2Index: e.detail.value
    })
  },
  bindPicker3Change: function (e) {
    if (e.detail.value == 0) {
      this.setData({
        Type3Index: e.detail.value,
        audioTextShow: true,
        audioUploadShow: false
      })
    } else {
      this.setData({
        Type3Index: e.detail.value,
        audioTextShow: false,
        audioUploadShow: true,
        audioShow: true,
      })
    }
  },

  //获取发布类型
  getReleaseType: function (e) {
    var params = {
      kinds: e.data.Type1Index
    };
    link.httpPost(link.releasestyleList, params, function (response) {
      var list = ['全部'];
      for (var i in response.list) {
        list.push(response.list[i].type);
      }
      e.setData({
        Type2: list
      });
    }, function (msg) {
      utils.showToast(msg, 'cancel');
    });
  },

  coverChange: function () {
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
                cover: response.path
              });
            }
          },
        });
      },
    })
  },

  urlChange: function (e) {
    var that = this;
    if (this.data.Type1Index == 0) {
      this.setData({
        dialogIsHidden: false
      });
    } else {
      wx.chooseVideo({
        success: function (res) {
          console.log(res);
          that.setData({
            times: parseInt(res.duration * 1000)
          });
          wx.showLoading({
            title: '上传中..',
          })
          wx.uploadFile({
            url: link.uploadImg,
            name: 'video',
            filePath: res.tempFilePath,
            success: function (response) {
              wx.hideLoading();
              utils.showToast('上传成功');
              console.log(response);
              if (response.statusCode == 200) {
                response = JSON.parse(response.data);
                that.setData({
                  path: response.path
                });
              }
            },
            fail: function () {
              wx.hideLoading();
            }
          });
        }
      })
    }
  },

  inputChange: function (e) {
    switch (e.currentTarget.id) {
      case 'title':
        this.setData({
          title: e.detail.value
        });
        break;
      case 'price':
        this.setData({
          price: e.detail.value
        });
        break;
      case 'rebatePrice':
        this.setData({
          rebatePrice: e.detail.value
        });
        break;
      case 'content':
        this.setData({
          content: e.detail.value
        });
        break;
      case 'introduce':
        this.setData({
          introduce: e.detail.value
        });
        break;
    }
  },

  paperChange: function (e) {
    if (e.detail.value.length > 0) {
      this.setData({
        paperCheck: true
      });
    } else {
      this.setData({
        paperCheck: false
      });
    }
  },

  doRelease: function () {
    console.log(this.data);
    if (this.data.Type1Index == 1) {
      if (this.data.cover == '../../image/bg_upload.png') {
        utils.showToast('请上传封面', 'cancel');
        return;
      }
      if (!this.data.title) {
        utils.showToast('请输入标题', 'cancel');
        return;
      }
      if (!this.data.price) {
        utils.showToast('请输入观看扣费', 'cancel');
        return;
      }
      if (!this.data.rebatePrice) {
        utils.showToast('请输入分享提成', 'cancel');
        return;
      }
      if (!this.data.content) {
        utils.showToast('请输入描述', 'cancel');
        return;
      }
      // if (!this.data.introduce) {
      //   utils.showToast('请输入简单介绍', 'cancel');
      //   return;
      // }
      if (!this.data.path) {
        utils.showToast('请上传视频', 'cancel');
        return;
      }
      var params = {
        userid: wx.getStorageSync('userid'),
        coverUrl: this.data.cover,
        name: this.data.title,
        price: this.data.price,
        content: this.data.path,
        introduce: this.data.content,
        type: this.data.Type1Index,
        releaseStyle: this.data.Type2Index,
        times: this.data.times,
        authorname: this.data.authorname,
        rebatePrice: this.data.rebatePrice
      };
      link.httpPost(link.releaseAdd, params, function (response) {
        utils.showToast('发布成功');
        wx.navigateBack({
          delta: 1
        })
      }, function (msg) {
        utils.showToast(msg, 'cancel');
      });
    } else {

    }
  },

  hideDialogBg: function () {
    this.setData({
      dialogIsHidden: true
    });
  },

  recordStart: function () {
    if (!this.data.isRecord) {
      this.setData({
        isRecord: true,
        recordType: 1
      });
      wx.startRecord({
        success: function (res) {
          utils.showToast('录制成功');
          var tempFilePath = res.tempFilePath;
          console.log(res);

          wx.showLoading({
            title: '上传中..',
          })
          wx.uploadFile({
            url: link.uploadRecord,
            name: 'audio',
            filePath: tempFilePath,
            success: function (response) {
              wx.hideLoading();
              utils.showToast('上传成功');
              console.log(response);
              if (response.statusCode == 200) {
                response = JSON.parse(response.data);

                // var params = {
                //   audioUrl: response.path
                // };
                // link.httpPost(link.uploadRecord, params, function (response) {

                // }, function (msg) {

                // });

              }
            },
            fail: function () {
              wx.hideLoading();
            }
          });
        },
        fail: function (res) {
          utils.showToast('录音失败');
          this.setData({
            isRecord: false,
            recordType: 0,
            dialogIsHidden: true
          });
        }
      })
    } else {
      wx.stopRecord();
      this.setData({
        isRecord: false,
        recordType: 0
      });
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userid: wx.getStorageSync('userid'),
      pageHeight: wx.getSystemInfoSync().windowHeight
    });
    console.log(wx.getSystemInfoSync().windowHeight);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.getReleaseType(this);
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