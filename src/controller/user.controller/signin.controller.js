const userModel = require('../../model/user.model/user.model');
const { StatusCodes } = require("http-status-codes");
const auth = require("../../middleware/auth")
const jwt = require("jsonwebtoken")
var adminAttemptCount = 0, blockEmail;

const LOGIN = async (req, res) => {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
        return res.status(StatusCodes.UNAUTHORIZED).send("Client side validation issues. Please carefully send the right format of email and password !!")
    }

    if (adminAttemptCount > 4 && blockEmail === email) {
        return res.status(StatusCodes.FORBIDDEN).send({
            message: 'You exceed the 5 login attempt. Please try again after 5 min !!',
        });
    }

    try {
        const data = await userModel.findOne({ email: email })

        if (data !== undefined) {
            const isMatched = await data?.matchPassword(password);

            if (!isMatched) {
                return res.status(StatusCodes.UNAUTHORIZED).send({
                    success: false,
                    message: "Email or Password didn't matched"
                })
            }

            const { accessToken, refreshToken } = auth.GenerateJWT({data});
            const token = jwt.sign({ _id: data._id, username: data.username, email: data.email, isAdmin: data.isAdmin, verified: data.verified },  process.env.ACCESS_TOKEN_KEY)
            return res.status(200).send({
                message: 'Login succesfully.',
                token: token,
                accessToken: accessToken,
                refreshToken: refreshToken,
                isAdmin: data.isAdmin,
                isVerified: data.isVerifed
            })
        } else {
            adminAttemptCount++;
            if (adminAttemptCount === 5) {
                blockEmail = email;
                setTimeout(() => {
                    adminAttemptCount = 0;
                    blockEmail = null;
                    console.log(`${email} you can login. => ${adminAttemptCount}`);
                }, 300000);
            }
            return res.status(StatusCodes.UNAUTHORIZED).send('Wrong email or password !!');
        }
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: err.message
        })
    }
}

module.exports = LOGIN;