const db = require('../../utils/db')
const util = require('../../utils/util')

Page({
  data: {
    movie: {},
    review: [],
  },

  onLoad: function(option) {
    db.getSelectedMovie(option.movieid).then(result => {
      const movie = result.data[0]
      this.setData({
        movie: movie
      })
    }).then(() => {
      this.getReview(this.data.movie._id)
    })//先set好电影数据再用电影id取影评
  },

  getReview(movieid) {
    db.getSelectedReview(movieid).then(result => {
      const data = result.data
      let review = []
      if (data) {
        this.setData({
          review: data
        })
      }
    }).catch(err => {
      console.error(err)
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