const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID
  await db.collection('review').add({
    data: {
      user, //openid
      username: event.username,
      movieid: event.movieid,
      movieimage: event.movieimage,
      moviename: event.moviename,
      avatar: event.avatar,
      content: event.content,
      reviewtype: event.reviewtype
    },
  })
  return {}
}