const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  return event.userInfo; //取用户的openid用来识别收藏的影评
}