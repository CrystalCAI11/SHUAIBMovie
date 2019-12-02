const util = require('./util')
const db = wx.cloud.database({
  env: 'crystal-xofk5'
})

module.exports = {
  getMovie(n) {
    return db.collection('movie').aggregate().sample({
      size: n
    }).end()
  }, //随机从云数据库取n个电影放在首页和列表

  getSelectedMovie(movieid) {
    return db.collection('movie').where({
      _id: movieid
    }).get()
  }, //通过电影id从云数据库获取选中的电影

  addReview(data) {
    return util.isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: 'addReview',
          data,
        })
      }).catch(() => {
        wx.showToast({
          icon: 'none',
          title: '请先登录'
        })
      })
  }, //把影评存入云数据库

  getSelectedReview(movieid) {
    return db.collection('review').where({
      movieid: movieid,
    }).get()
  }, //通过电影id从云数据库取影评

  getReviewfromid(reviewid) {
    return db.collection('review').where({
      _id: reviewid
    }).get()
  }, //通过reviewid从云数据库取影评

  getReviewfromopenid(openid) {
    return db.collection('review').where({
      user: openid
    }).get()
  }, //通过openid从云数据库取影评

  addLike(data) {
    return wx.cloud.callFunction({
      name: 'addLike',
      data,
    })
  }, //把收藏的影评存入like库

  getLike(openid) {
    return db.collection('like').where({
      openid: openid
    }).get()
  }, //和登陆用户匹配userid(头像url)从like库取数据

  checkLike(openid, reviewid) {
    return db.collection('like').where({
      openid: openid,
      reviewid: reviewid,
    }).count() //check同一个openid是否收藏过同一个影评
  },

  getMyReview(openid, movieid) {
    return db.collection('review').where({
      user: openid,
      movieid: movieid,
    }).get()
  },//详情页面用于判断是否评价过该影片

}