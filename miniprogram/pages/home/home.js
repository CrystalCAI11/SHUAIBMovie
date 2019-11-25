const db = require('../../utils/db')
const util = require('../../utils/util')

Page({

  data: {
    userInfo: null,
    movie: {},
    review: {},
  },

  onShow() {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
    }).catch(err => {
      console.log('用户未授权');
    })
  },

  onLoad() {
    this.getOpenid()
    this.getHomeMovie()
  },

  onPullDownRefresh() {
    this.setData({
      review: {} //清空影评缓存
    })
    this.onLoad()
    wx.stopPullDownRefresh()
  },

  getHomeMovie() {
    db.getMovie(1).then(res => {
      this.setData({
        movie: res.list[0],
      })
      let movieid = this.data.movie._id
      this.getReview(movieid)
    })
  },

  getReview(movieid) {
    db.getSelectedReview(movieid).then(res => {
      if (res.data.length > 0) {
        const review = res.data[0]
        this.setData({
          review: review
        })
      } else {
        console.log('暂时还没有用户评论过该影片')
        this.setData({
          review: 1
        })
      }
    })
  },

  getOpenid() {
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        this.setData({
          openid: res.result.openId
        })
      }
    })
  },

  onTapHot() {
    wx.navigateTo({
      url: '../hot/hot'
    })
  },

  onTapMe() {
    wx.navigateTo({
      url: '../me/me?openid=' + this.data.openid,
    })
  },

  onTapDetail(event) {
    util.onTapDetail(event)
  },


  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo
    })
  },

  onTapReviewDetail(event) {
    util.onTapReviewDetail(event)
  },
})