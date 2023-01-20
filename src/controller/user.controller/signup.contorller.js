const bcrypt = require("bcryptjs");
const userModel = require('../../model/user.model/user.model');
const { StatusCodes } = require("http-status-codes");

const Register = async (req, res) => {
    let { username, phone, email, password, checkpassword } = req.body;
    userModel.findOne({ email: email }).then((data) => {
        if (data === null) {
            if (password === checkpassword){
                   bcrypt.hash(password , 10 , (e, has_password)=>{
                    new userModel({
                        username,
                        phone,
                        email,
                        password: has_password,
                        createdOn: new Date().toDateString()
                    }).save().then(() => {
                        return res.status(StatusCodes.CREATED).send('User created succesfully !!');
                    }).catch((err) => {
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('500 SERVER ERROR!!');
                    })
                   })
                }else{
                    return res.status(StatusCodes.BAD_REQUEST).send({
                        message: 'Password Not Match !!'
                    });
                }
            } else {
                return res.status(StatusCodes.NOT_ACCEPTABLE).send({
                    message:'User already exists !!'
                });
            }
        }).catch((err) => {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err)
        })
}
module.exports = Register;
