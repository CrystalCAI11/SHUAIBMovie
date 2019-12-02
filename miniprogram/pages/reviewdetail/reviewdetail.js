const db = require('../../utils/db')
const util = require('../../utils/util')

Page({
  data: {
    openid: '',
    review: {},
  },

  onLoad: function(option) {
    db.getReviewfromid(option.reviewid).then(res => {
      const review = res.data[0]
      this.setData({
        review: review
      })
    })
    this.getOpenid()
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

  onTapComment(event) {
    wx.showActionSheet({
      itemList: ['文字', '音频'],
      success: res => {
        let tapIndex = res.tapIndex;
        console.log(tapIndex)
        if (tapIndex == 0) {
          this.onTapWrite(event)
        }
        if (tapIndex == 1) {
          this.onTapRecord(event)
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  }, //点击添加影评按钮弹出actionsheet

  onTapWrite(event) {
    wx.navigateTo({
      url: '../addreview/addreview?movieid=' + event.currentTarget.id + '&reviewtype=2'
    })
  },//选择文字影评，把影评类型参数设为2

  onTapRecord(event) {
    wx.navigateTo({
      url: '../addreview/addreview?movieid=' + event.currentTarget.id + '&reviewtype=1',
    })
  },//选择录音影评，把影评类型参数设为1

  onTapLike(event) {
    let openid = this.data.openid
    let reviewid = this.data.review._id
    db.checkLike(openid, reviewid).then(res => {
      if (res.total == 0) {
        db.addLike({ //把评论上传到like库
          reviewid: this.data.review._id,
          reviewtype: this.data.review.reviewtype,
          username: this.data.review.username,
          avatar: this.data.review.avatar,
          content: this.data.review.content,
          movieimage: this.data.movie.image,
          moviename: this.data.movie.name,
          openid: this.data.openid,
        }).then(res => {
          wx.navigateBack({
            delta: 100
          })
          wx.showToast({
            title: '收藏成功'
          })
        })
      } else {
        wx.showToast({
          title: '您已收藏过该影评',
        })
      }
    })
  },

  play() {
    const record = wx.createInnerAudioContext()
    record.src = this.data.review.content
    record.play()
  }, //播放录音
})