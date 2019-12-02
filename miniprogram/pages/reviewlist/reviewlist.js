const db = require('../../utils/db')
const util = require('../../utils/util')

Page({
  data: {
    review: [],
  },

  onLoad: function(option) {
    this.getReview(option.movieid)
  },

  onPullDownRefresh() {
    this.onLoad
    wx.stopPullDownRefresh()
  },

  getReview(movieid) {
    db.getSelectedReview(movieid).then(res => {
      if (res.data) {
        this.setData({
          review: res.data
        })
      }
    })
  },

  onTapHome() {
    wx.navigateBack({
      delta: 100
    })
  },

  onTapReviewDetail(event) {
    util.onTapReviewDetail(event)
  },
})