const util = require('../../utils/util')
const db = require('../../utils/db')

Page({
  data: {
    openid: '',
    review: [],
  },

  onLoad: function(option) {
    this.setData({
      openid: option.openid,
    })
    this.getMyReview()
  },

  onPullDownRefresh() {
    this.getMyReview()
    wx.stopPullDownRefresh()
  },

  getMyReview() {
    let openid = this.data.openid
    db.getReviewfromopenid(openid).then(res => {
      this.setData({
        review: res.data
      })
    })
  },

  onTapReviewDetail(event) {
    util.onTapReviewDetail(event)
  },

  onTapMe() {
    wx.navigateBack({
      delta: 1
    })
  },
})