var app_id = 'wx52914ae0c2c2f84b';
var app_secret = 'cae97f96f89bb1f9fdadfe6d26a0d825';

// var host = 'http://192.168.0.153';
var host = 'https://www.xc69.net';
var program = '/tushu';
var hostName = host + program;

var uploadImg = 'https://www.xc69.net/upload/upload';
// var uploadRecord = 'http://192.168.0.195/upload/uploadWechatRecord2';

var payGetWeChatSign = hostName + '/pay/GetWeChatSign';

var userLogin = hostName + '/user/login';
var userThirdLogin = hostName + '/user/thirdLogin';
var userRegist = hostName + '/user/regist';
var userInfo = hostName + '/user/getinfo';
var userUpdate = hostName + '/user/update';
var userGetopenid = hostName + '/user/getopenid';

var certificationAdd = hostName + '/certification/add';

var verifySend = hostName + '/verify/send';

var bannerList = hostName + '/banner/getlist';

var releaseAdd = hostName + '/release/add';
var releaseList = hostName + '/release/getlistByReleaseStyle';
var releaseListAll = hostName + '/release/getlistByType';
var releaseMine = hostName + '/release/getlistByUserid';
var releaseMy = hostName + '/release/getlists';
var releaseInfo = hostName + '/release/getinfo';
var releasePay = hostName + '/release/pay';

var releasestyleList = hostName + '/ReleaseStyle/getlist';

var feedbackAdd = hostName + '/feedback/add';

var historyAdd = hostName + '/history/add';
var historyList = hostName + '/history/getlist';

var walletInfo = hostName + '/wallet/getinfo';

var rechargeList = hostName + '/recharge/getlistByUserid';

var withdrawalsList = hostName + '/withdrawals/getlistByUserid';
var withdrawalsAdd = hostName + '/withdrawals/add';

var paymentsList = hostName + '/payments/getlistByUserid';

var commentAdd = hostName + '/comment/add';
var commentList = hostName + '/comment/getlist';
var commentDelete = hostName + '/comment/delete';

var commentLikeAdd = hostName + '/commentLike/add';
var commentLikeDelete = hostName + '/commentLike/delete';

var commentReplyAdd = hostName + '/commentReply/add';

function httpPost(url, params, successRes, failRes) {
  console.log(params);
  wx.request({
    url: url,
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    success: function (response) {
      console.log(response);
      if (response.statusCode == 200) {
        if (response.data.status == 0) {
          successRes(response.data.results);
        } else {
          failRes(response.data.message);
        }
      } else if (response.statusCode == 404) {
        failRes('接口不存在');
      } else if (response.statusCode == 500) {
        failRes('参数错误');
      } else {
        failRes('网络错误');
      }
    },
    fail: function (error) {
      console.log(error);
      failRes('网络错误');
    }
  })
}

module.exports = {
  getRequestUrl: "http://localhost:59637",//获得接口地址
  app_id: app_id,
  app_secret: app_secret,
  httpPost: httpPost,
  bannerList: bannerList,
  type1List: releaseList,
  releaseInfo: releaseInfo,
  releasestyleList: releasestyleList,
  releaseListAll: releaseListAll,
  userLogin: userLogin,
  userRegist: userRegist,
  verifySend: verifySend,
  userInfo: userInfo,
  uploadImg: uploadImg,
  userUpdate: userUpdate,
  certificationAdd: certificationAdd,
  releaseMine: releaseMine,
  feedbackAdd: feedbackAdd,
  historyAdd: historyAdd,
  historyList: historyList,
  walletInfo: walletInfo,
  rechargeList: rechargeList,
  withdrawalsList: withdrawalsList,
  paymentsList: paymentsList,
  withdrawalsAdd: withdrawalsAdd,
  commentAdd: commentAdd,
  commentList: commentList,
  commentDelete: commentDelete,
  commentLikeAdd: commentLikeAdd,
  commentLikeDelete: commentLikeDelete,
  commentReplyAdd: commentReplyAdd,
  releaseMy: releaseMy,
  releaseAdd: releaseAdd,
  releasePay: releasePay,
  userThirdLogin: userThirdLogin,
  // uploadRecord: uploadRecord,
  payGetWeChatSign: payGetWeChatSign,
  userGetopenid: userGetopenid
}