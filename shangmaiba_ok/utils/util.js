const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


//扩展Date的format方法
Date.prototype.format = function (format) {
  var date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
};

function dateToString(l, s) {
  var date = new Date(l).format(s);
  // alert(date);
  return date;
}

function showToast(msg, type) {
  if (type == 'success' || type == undefined) {
    wx.showToast({
      title: msg,
      image: '../../image/ic_success.png'
    });
  } else {
    wx.showToast({
      title: msg,
      image: '../../image/ic_cancel.png'
    });
  }
}

function getShi(seconds) {
  var min = Math.floor(seconds / 60),
    second = seconds % 60,
    hour, newMin, time;

  if (min > 60) {
    hour = Math.floor(min / 60);
    newMin = min % 60;
  }

  if (second < 10) { second = '0' + second; }
  if (min < 10) { min = '0' + min; }

  return time = hour ? (hour + ':' + newMin + ':' + second) : (min + ':' + second);
}

function RndNum(n) {
  var rnd = "";
  for (var i = 0; i < n; i++){
    rnd += Math.floor(Math.random() * 10);
  }
  rnd='smb'+rnd;
  return rnd;
}

module.exports = {
  formatTime: formatTime,
  getShi: getShi,
  RndNum: RndNum,
  getRequestUrl: "http://localhost:59637",//获得接口地址
  dateToString: dateToString,
  showToast: showToast,
  hostName: "http://localhost/shangmaiba/smb_api/index.php/home/",
  picsrc: "http://localhost/shangmaiba/smb_api/Public/",
}