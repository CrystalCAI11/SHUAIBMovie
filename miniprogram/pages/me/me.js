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

  getLike(openid) {
    db.getLike(openid).then(result => {
      this.setData({
        like: result.data
      })
    })
  },

  onTapReviewDetail(event) {
    util.onTapReviewDetail(event)
  },
})