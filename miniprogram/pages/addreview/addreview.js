const db = require('../../utils/db')
const util = require('../../utils/util')

Page({
  data: {
    movie: {},
    reviewContent: '',
    userInfo: {},
  },

  onLoad: function(option) {
    db.getSelectedMovie(option.movieid).then(result => {
      const movie = result.data[0]
      this.setData({
        movie: movie
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
  },

  onInput(event) {
    this.setData({
      reviewContent: event.detail.value.trim()
    })
  },

  onTapPreview() {
    wx.navigateTo({
      url: '../preview/preview?movie=' + JSON.stringify(this.data.movie) + '&userInfo=' + JSON.stringify(this.data.userInfo) + '&reviewContent=' + this.data.reviewContent,
    })
  }, //预览界面的数据全部由编辑页传参，不从云数据库取值

  startRecord() {
    wx.getRecorderManager().start()
  },

  stopRecord() {
    let that = this//wx.showmodal里面不能用this
    wx.getRecorderManager().stop()
    wx.getRecorderManager().onStop((res) => {
      this.setData({
        reviewContent: res.tempFilePath
      })
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
  },
})