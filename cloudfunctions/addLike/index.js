const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID
  await db.collection('like').add({
    data: {
      avatar: event.avatar,
      reviewid: event.reviewid,
      reviewtype: event.reviewtype,
      username: event.username,
      content: event.content,
      movieimage: event.movieimage,
      moviename: event.moviename,
      openid: event.openid,
    },
  })
  return {}
}