// CookieToken.js

const accesstoken=require("./jwt_token")
const cookieToken = (user, res) => {
  const token = accesstoken(user.userId);
  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
    httpOnly: true,
  };
  res.status(200).cookie('token', token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports=cookieToken;