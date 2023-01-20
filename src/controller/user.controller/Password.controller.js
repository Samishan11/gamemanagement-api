const UserModel = require('../../model/user.model/user.model');
const { StatusCodes } = require("http-status-codes");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const { mail } = require("../../utils/mail");
const otpGenerator = require('otp-generator');
const bcrypt = require("bcryptjs");

// forgot password 
exports.Forgotpassword = async (req, res) => {
    const email = req.body.email;
    console.log(email)
    if (!email) {
        res.json("Invalid request")
    } else {
        const user = await UserModel.findOne({ email })
        console.log(user)
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).send("unauthorized user")
        } else {
            const passwordresetcheck = user.resetToken
            console.log(passwordresetcheck)
            // if (!passwordresetcheck) {
            //     return res.json("already send a token")
            // } else {
                const reset_token = otpGenerator.generate(15, { upperCase: false, specialChars: true });
                const { accessToken, refreshToken } = auth.GenerateJWT({ user });
                // bycrypt.hash(reset_token, 10, async (e, has_reset_token) => {
                const forgotpass = await UserModel.findOneAndUpdate({ email }, {
                    resetToken: reset_token
                })
                console.log(forgotpass)
                await forgotpass.save()
                mail().sendMail({
                    from: "joker.shan99@gmail.com",
                    to: user.email,
                    subject: "Reset password",
                    html: `<p style="text-align:center; font-size:16px;"> Your reset password request link: <a href="${`http://localhost:3000/reset-password/${reset_token}`}">Reset password link</a> </p>`
                })
                return res.status(StatusCodes.ACCEPTED).send("Your reset passowr link has been sent to your email.")
                // })
            }
        // }
    }
}

// reset password
exports.Resetpassowrd = async (req, res) => {
    const token = req.params.token;
    const newpassword = req.body.newpassword;
    const confirmpassword = req.body.confirmpassword;
    if (!newpassword && !confirmpassword) {
        res.send('invalid reqest')
    } else {
        const reset_token = await UserModel.findOne({ resetToken: token })
        if (!reset_token) {
            res.send('invalid reqest')
        } else {
            const user = await UserModel.findOne({ _id: reset_token._id })
            if (!user) {
                res.send('user not found')
            } else {
                if (newpassword !== confirmpassword) {
                    res.send("password not match")
                } else {
                    bcrypt.hash(newpassword, 10, async (e, hasPassword) => {
                        await UserModel.findOneAndUpdate({ _id: user._id }, {
                            password: hasPassword
                        })
                    })
                    user.resetToken = "";
                    user.save()
                    res.send('Password has been reseted sucessfully')
                }
            }
        }
    }
}

// verify email send
exports.Verifyemailsend = async (req, res) => {
    const email = req.body.email;
    if (!email) {
        res.json("Invalid request")
    } else {
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).send("unauthorized user")
        } else {
            const checkVerified = user.isVerifed
            if (checkVerified !== false) {
                return res.json("User Verified")
            } else {
                const create_link = otpGenerator.generate(15, { upperCase: false, specialChars: true });
                const { accessToken, refreshToken } = auth.GenerateJWT({ user });
                // bycrypt.hash(reset_token, 10, async (e, has_reset_token) => {
                const _verify = await UserModel.findOneAndUpdate({ email }, {
                    verifyLink: create_link
                });
                mail().sendMail({
                    from: "joker.shan99@gmail.com",
                    to: user.email,
                    subject: "Verify your email",
                    html: `<p style="text-align:center; font-size:16px;"> Please verify your account: <a href="${`http://localhost:3000/verify-email/${create_link}`}">Verify your account</a> </p>`
                })
                return res.status(StatusCodes.ACCEPTED).send("Your verify link has been sent to your email.")
                // })
            }
        }
    }
}

// vefiry email
exports.verifyemail = async (req, res) => {
    const token = req.params.token;
    if (!token) {
        res.send('invalid reqest')
    } else {
        const _user = await UserModel.findOne({ verifyLink: token })
        if (!_user) {
            res.send('invalid reqest')
        } else {
            const user = await UserModel.findOne({ _id: _user._id })
            if (!user) {
                res.send('user not found')
            } else {
                await UserModel.findOneAndUpdate({ _id: user._id }, {
                    isVerifed: true
                })
                user.verifyLink = "";
                user.save()
                res.send('Email verified sucessfully');
            }
        }
    }
}