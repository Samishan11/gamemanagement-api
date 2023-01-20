const jwt = require('jsonwebtoken');

const userModel = require("../model/user.model/user.model")
const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY
const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY

const VerifyJWT = async (req, res, next) => {
  if (req.header('authorization') === undefined || req.header('authorization').length <= 9) {
    return res.status(401).send({
      message: "Token is empty !!"
    });
  }
  var accessToken = req.header('authorization')

  accessToken = accessToken.substr(7, accessToken.length);

  try {
    const _res = jwt?.verify(accessToken, ACCESS_TOKEN_KEY)
    userModel.findOne({ _id: _res?.data?._id }).then(function (result) {
      req.userInfo = result;
      next();
    })
  } catch (error) {
    return res.status(500).send({message:error.message})
  }
}

const GenerateJWT = (data) => {
  const accessToken = jwt.sign(data, ACCESS_TOKEN_KEY, {
    expiresIn: "24h"
  })
  const refreshToken = jwt.sign(data, REFRESH_TOKEN_KEY)

  return {
    accessToken: accessToken,
    refreshToken: refreshToken
  }
}


const regenerateAccessToken = (req, res, next) => {
  var refreshToken = req.header("authorization")
  refreshToken = refreshToken.substr(14, refreshToken.length);

  try {
    const response = jwt.verify(refreshToken, REFRESH_TOKEN_KEY);

    req.body.uid = response.id

    next()
  } catch (error) {
    console.log(error)
    res.status(401).send({
      message: "Refresh token cannot verified."
    })
  }
}

module.exports = { VerifyJWT, GenerateJWT, regenerateAccessToken }