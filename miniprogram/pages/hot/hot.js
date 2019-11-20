const db = require('../../utils/db')
const util = require('../../utils/util')

Page({

  data: {
    movie: [],
    selectedMovie: {},
  },

  onLoad() {
    this.getHotMovie()
  },

  onPullDownRefresh() {
    this.onLoad()
    wx.stopPullDownRefresh()
  },
  
  getHotMovie() {
    db.getMovie(5).then(result => {
      wx.hideLoading()
      const data = result.list
      if (data.length) {
        this.setData({
          movie: data
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
    })
  },

  onTapDetail(event) {
    util.onTapDetail(event)
  },
  
})