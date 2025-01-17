const util = require('../../utils/util')
const db = require('../../utils/db')

Page({
  data: {
    openid: '',
    like: [],
  },

  onLoad(option) {
    this.setData({
      openid: option.openid
    })
    this.getLike(this.data.openid)
  },

  onPullDownRefresh() {
    this.getLike(this.data.openid)
    wx.stopPullDownRefresh()
  },

  getLike(openid) {
    db.getLike(openid).then(res => {
      this.setData({
        like: res.data
      })
    })
  },

  onTapReviewDetail(event) {
    util.onTapReviewDetail(event)
  },

  onTapMyreview() {
    wx.navigateTo({
      url: '../myreview/myreview?openid=' + this.data.openid,
    })
  },
})