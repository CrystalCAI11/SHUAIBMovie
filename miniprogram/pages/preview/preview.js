const db = require('../../utils/db')
const util = require('../../utils/util')


Page({
  data: {
    movie: {},
    reviewContent: '',
    userInfo: {},
    reviewtype: '',
  },

  onLoad: function(option) {
    let movie = JSON.parse(option.movie)
    let userInfo = JSON.parse(option.userInfo)
    let reviewContent = option.reviewContent
    this.setData({
      movie: movie,
      userInfo: userInfo,
      reviewContent: reviewContent,
    })
    let str = this.data.reviewContent
    let reviewtype = this.data.reviewtype
    if (str.search("http://tmp/") != -1) {
      this.setData({
        reviewtype: "1", //录音类型的reviewcontent
      })

    }
  },

  play: function() {
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.data.reviewContent
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
  },

  onTapReturn() {
    wx.navigateBack({})
  },

  onTapSubmit(event) {
    let content = this.data.reviewContent
    if (!content) return
    wx.showLoading({
      title: '提交中...'
    })
    db.addReview({ //把评论上传到云数据库
      username: this.data.userInfo.nickName,
      avatar: this.data.userInfo.avatarUrl,
      content,
      movieid: this.data.movie._id
    }).then(result => {
      wx.hideLoading()
      const data = result.result
      if (data) {
        wx.showToast({
          title: '提交成功'
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 2
          })
        }, 1500)
      }
    }).catch(err => {
      console.error(err)
      wx.showToast({
        icon: 'none',
        title: '提交失败'
      })
    })
  },
})