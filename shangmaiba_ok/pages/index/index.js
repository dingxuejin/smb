//index.js
//获取应用实例

var app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    list: [],
    pic:[],
    page: 1,
    pageSize: 4,
    picsrc: util.picsrc,
    allnum: '',
    hidden: false,
    showModal: false,
    inputShowed: false,
    inputVal: "",
 

    /////
 
   
    // imgUrl: glo.globalData.imgUrl,
    ///////////

  },
  ////////////////////////////////////


  ////////////////////////////////////
  ////////////////
 


  

  
  


  onPullDownRefresh: function () {
    this.data.hidden = false,
      this.data.list = [],//初始化列表数据集
      this.data.page = 1,//初始化当前页为1
      this.getRoomList();

  },
 


  //////////////////////////////////////////////

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */


  // refresh: function () {
  //   this.setData({
  //     hidden: false,
  //   })
  //     this.data.list = [],//初始化列表数据集
  //     this.data.page = 1,//初始化当前页为1


  //     this.getRoomList();

  // },
  /**
    * 页面上拉触底事件的处理函数
    */
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
      this.getRoomList();

    }
  },

  onLoad: function () {
    var that = this;
    wx.request({
      url: util.hostName + "User/getPic",
  
      success: function (res) {
        
         
        that.setData({
          pic: that.data.pic.concat(res.data.data),
         

        })

      }

    })


    
  },
  onShow: function () {
    this.data.page = 1;//初始化当前页为1
    this.data.list = [];//初始化列表数据集
    this.getRoomList();
 

  },
  onReady: function () {

  },
  /*Roomid为字符串 用来判断工作种类*/
  getRoomList: function () {

    var that = this;
    wx.request({
      url: util.hostName + "User/getVideoList",
      method: 'post',
      traditional: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        page: that.data.page,
        pageSize: that.data.pageSize,

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

 
  //////////////////////////////////////////////



  /**
     * 对话框确认按钮点击事件
     */


  /**
     * 弹出框蒙层截断touchmove事件
     */

  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '上麦吧',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  ///////////////////////


})
