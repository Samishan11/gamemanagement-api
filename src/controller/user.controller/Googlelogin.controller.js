const user = require('../../model/user.model/user.model');
const { StatusCodes } = require("http-status-codes");
const auth = require("../../middleware/auth")
const jwt = require("jsonwebtoken")
// google sign in
const GoogleLogin = async (req, res) => {
    const email = req.body.email;
    const checkuser = await user.findOne({ email: email }).exec();
    const data = await user.findOne({ email: email }).exec();
    // console.log(email, checkuser);
    if (checkuser == null) {
        const data = new user({
            username: req.body.email.split("@")[0],
            email: req.body.email,
            googleId: req.body.googleId,
            isVerifed: true
        });
        data.save(function (err) {
            if (err) {
                res.json({ message: err.message });
            } else {
                const { accessToken, refreshToken } = auth.GenerateJWT({ data });
                const token = jwt.sign({ _id: data._id, username: data.username, email: data.email, isAdmin: data.isAdmin, isVerifed: data.isVerifed }, process.env.ACCESS_TOKEN_KEY)
                return res.status(200).send({
                    message: 'Login succesfully.',
                    token: token,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    isAdmin: data.isAdmin,
                    isVerified: data.isVerified
                })
            }
        });
    } else {
        const { accessToken, refreshToken } = auth.GenerateJWT({ data });
        const token = jwt.sign({ _id: checkuser._id, username: checkuser.username, email: checkuser.email, isAdmin: checkuser.isAdmin, isVerifed: checkuser.isVerifed }, process.env.ACCESS_TOKEN_KEY)
        return res.status(200).send({
            message: 'Login succesfully.',
            token: token,
            accessToken: accessToken,
            refreshToken: refreshToken,
            isAdmin: data.isAdmin,
            isVerified: data.isVerified
        })
    }
};

module.exports = GoogleLogin;