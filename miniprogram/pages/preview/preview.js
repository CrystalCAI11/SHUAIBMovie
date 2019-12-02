const db = require('../../utils/db')
const util = require('../../utils/util')


Page({
  data: {
    movie: {},
    reviewContent: '',
    userInfo: {},
    reviewtype: '',
    play: false,
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
    console.log(str)
    if (str.search(".mp3") != -1) {
      this.setData({
        reviewtype: "1", //录音类型的reviewcontent
      })
    } else {
      this.setData({
        reviewtype: "2", //文字类型的reviewcontent
      })
    }
  },

  play() {
    const record = wx.createInnerAudioContext()
    record.src = this.data.reviewContent
    record.play()
    record.onPlay((res) => {
      this.setData({
        play: true, //开始播放
        reviewContent: res.tempFilePath,
      })
    })
    record.onEnded((res) => {
      this.setData({
        play: false, //播放结束
      })
    })
  }, //点击播放录音预览

  onTapReturn() {
    wx.navigateBack({})
  },

  onTapSubmit(event) {
    wx.showLoading({
      title: '提交中...'
    })
    db.addReview({ //把评论上传到云数据库
      username: this.data.userInfo.nickName,
      avatar: this.data.userInfo.avatarUrl,
      content: this.data.reviewContent,
      movieid: this.data.movie._id,
      movieimage: this.data.movie.image,
      moviename: this.data.movie.name,
      reviewtype: this.data.reviewtype
    }).then(res => {
      wx.hideLoading()
      const data = res.result
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
      wx.showToast({
        icon: 'none',
        title: '提交失败'
      })
    })
  },
})