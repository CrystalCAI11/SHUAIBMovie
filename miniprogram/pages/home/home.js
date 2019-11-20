const db = require('../../utils/db')
const util = require('../../utils/util')

Page({

  data: {
    userInfo: null,
    movie: {},
    review: [],
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
    this.getHomeMovie()
    this.getOpenid()
  },

  onPullDownRefresh() {
    this.onLoad()
    wx.stopPullDownRefresh()
  },

  getHomeMovie() {
    wx.showLoading({
      title: '加载中...',
    })

    db.getMovie(1).then(result => {
      wx.hideLoading()
      const data = result.list
      this.getReview(data[0]._id)
      this.setData({
        movie: data[0],
      })
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
    })
  },

  getReview(movieid) {
    db.getSelectedReview(movieid).then(result => {
      const data = result.data[0]
      if (data) {
        this.setData({
          review: data
        })
      }
    }).catch(err => {
      console.error(err)
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