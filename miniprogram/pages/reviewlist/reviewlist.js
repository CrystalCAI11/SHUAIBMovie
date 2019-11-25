const db = require('../../utils/db')
const util = require('../../utils/util')

Page({
  data: {
    movie: {},
    review: [],
  },

  onLoad: function(option) {
    db.getSelectedMovie(option.movieid).then(res => {
      const movie = res.data[0]
      this.setData({
        movie: movie
      })
    }).then(() => {
      this.getReview(this.data.movie._id)
    }) //先set好电影数据再用电影id取影评
  },

  getReview(movieid) {
    db.getSelectedReview(movieid).then(res => {
      console.log(res.data)
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