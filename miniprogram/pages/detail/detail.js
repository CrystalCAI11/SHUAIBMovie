const db = require('../../utils/db')
const util = require('../../utils/util')

Page({
  data: {
    movie: {},
  },

  onLoad: function(option) {
    db.getSelectedMovie(option.movieid).then(result => {
      const movie = result.data[0]
      this.setData({
        movie: movie
      })
    })
  },

  onTapRead(event) {
    util.onTapRead(event)
  },

  onTapComment(event) {
    wx.showActionSheet({
      itemList: ['文字', '音频'],
      success: res => {
        let tapIndex = res.tapIndex;
        console.log(tapIndex)
        if (tapIndex == 0 || tapIndex == 1) {
          this.onTapSheet(event)
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  }, //点击添加影评按钮弹出actionsheet


  onTapSheet(event) {
    util.onTapSheet(event)
  } //点击actionsheet添加影评


})