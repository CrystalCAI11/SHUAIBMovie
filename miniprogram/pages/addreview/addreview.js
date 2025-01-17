const db = require('../../utils/db')
const util = require('../../utils/util')

Page({
  data: {
    reviewtype:'',
    movie: {},
    reviewContent: '',
    userInfo: {},
    record: false, //默认松开按钮
  },

  onLoad: function(option) {
    console.log(option)
    this.setData({
      reviewtype: option.reviewtype,
    })
    db.getSelectedMovie(option.movieid).then(res => {
      this.setData({
        movie: res.data[0]
      })
    })
    this.getUserInfo()
  },

  getUserInfo() {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo: userInfo
      })
    })
  }, //获取当前用户信息

  onInput(event) {
    this.setData({
      reviewContent: event.detail.value.trim()
    })
  }, //文字评论输入框

  startRecord() { //开发工具里不会录成mp3音频，真机调试是好的
    const options = {
      duration: 60000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3',
      frameSize: 50
    }
    wx.getRecorderManager().start(options)
    wx.getRecorderManager().onStart((res) => {
      this.setData({
        record: true, //按下录音按钮
      })
    })
  }, //把临时录音文件存成mp3传参给预览页

  stopRecord() {
    let that = this //wx.showmodal回调里面this不生效
    wx.getRecorderManager().stop()
    wx.getRecorderManager().onStop((res) => {
      this.setData({
        record: false, //松开录音按钮
        reviewContent: res.tempFilePath
      })
      wx.showModal({
        title: '录音已完成',
        content: '点击确认进入预览页面可试听录音',
        success(res) {
          if (res.confirm) {
            that.onTapPreview()
          }
        }
      })
    })
  }, //结束录音后触发预览页跳转框

  onTapPreview() {
    wx.navigateTo({
      url: '../preview/preview?movie=' + JSON.stringify(this.data.movie) + '&userInfo=' + JSON.stringify(this.data.userInfo) + '&reviewContent=' + this.data.reviewContent,
    })
  }, //预览界面的数据全部由编辑页传参，不从云数据库取值
})