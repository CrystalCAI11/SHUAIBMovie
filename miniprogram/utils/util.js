module.exports = {
  getUserInfo() {
    return new Promise((resolve, reject) => {
      this.isAuthenticated().then(() => {
        wx.getUserInfo({
          success(res) {
            resolve(res.userInfo)
          }
        })
      }).catch(() => {
        reject()
      })
    })
  }, //获取用户基本信息

  isAuthenticated() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo'] === true) {
            resolve()
          } else {
            reject()
          }
        }
      })
    })
  }, //判断用户是否授权

  onTapDetail(event) {
    wx.navigateTo({
      url: '../detail/detail?movieid=' + event.currentTarget.id,
    })
  }, //点击跳转至电影详情页

  onTapSheet(event) {
    wx.navigateTo({
      url: '../addreview/addreview?movieid=' + event.currentTarget.id,
    })
  }, //点击actionsheet跳转至影评编辑页

  onTapRead(event) {
    wx.navigateTo({
      url: '../reviewlist/reviewlist?movieid=' + event.currentTarget.id,
    })
  }, //点击查看影评按钮进入影评列表

  onTapReviewDetail(event) {
    wx.navigateTo({
      url: '../reviewdetail/reviewdetail?reviewid=' + event.currentTarget.id
    })
  }, //点击进入影评详情页
}