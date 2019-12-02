const db = require('../../utils/db')
const util = require('../../utils/util')

Page({
  data: {
    openid: '',
    movie: {},
    review: {},
    myreviewid: '', //用于判断自己是否评价过该影片
  },

  onLoad: function(option) {
    db.getSelectedMovie(option.movieid).then(res => {
      this.setData({
        movie: res.data[0]
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
        this.getMyReview()
      }
    })
  },

  onTapRead(event) {
    util.onTapRead(event)
  },

  getMyReview() {
    let openid = this.data.openid
    let movieid = this.data.movie._id
    db.getMyReview(openid, movieid).then(res => {
      if (res.data[0]) {
        this.setData({
          review: res.data[0],
          myreviewid: res.data[0]._id,
        })
      }
    })
  },

  onTapReviewDetail(event) {
    util.onTapReviewDetail(event)
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
})