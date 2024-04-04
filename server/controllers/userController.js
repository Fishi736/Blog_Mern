const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')
const { v4: uuid } = require('uuid')



const HttpError = require('../models/errorModel')
const User = require('../models/userModel')



//POST : api/users/register
//UNPROTECTED
const registerUser = async (req, res, next) => {


    try {
        const { name, email, password, password2 } = req.body;
        if (!name || !email || !password) {
            return next(new HttpError('Fill in all fields.', 422))
        }

        const newEmail = email.toLowerCase()

        const emailExists = await User.findOne({ email: newEmail })
        if (emailExists) {
            return next(new HttpError('Email already exists.', 422))
        }

        if ((password.trim()).length < 6) {
            return next(new HttpError("Password should be atleast 6 characters.", 422))

        }

        if (password != password2) {
            return next(new HttpError("Password doesn't matches.", 422))

        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ name, email: newEmail, password: hashedPassword })
        res.status(201).json(`${newUser.email} registered successfully`)
    } catch (error) {
        return next(new HttpError(error, 422))
    }

}




//POST : api/users/login
//UNPROTECTED
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new HttpError('Fill in all the fields.', 422))
        }

        const newEmail = email.toLowerCase()
        const user = await User.findOne({ email: newEmail })
        if (!user) {
            return next(new HttpError('Invalid Credentials.', 422))
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return newxt(new HttpError('Email & Passowrd does not match'))
        }

        const { _id: id, name } = user;
        const token = jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(200).json({ token, id, name })


    } catch (error) {
        return next(new HttpError('Login Failed,Please check your credentials.', 422))

    }

}





//POST : api/users/:id
//PROTECTED
const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password');
        if (!user) {
            return next(new HttpError('User Not Found'))
        }
        res.status(200).json(user)
    } catch (error) {
        return next(new HttpError(error))

    }
}






//POST : api/users/change-avatar
//PROTECTED
const changeUserAvatar = async (req, res, next) => {
    try {

        if (!req.files.avatar) {
            return next(new HttpError('Please upload an image'), 422)
        }

        const user = await User.findById(req.user.id)

        const { avatar } = req.files;
        if (avatar.size < 500000) {
            return next(new HttpError("Image is less than 500kb"))
        }

        if (user.avatar) {
            fs.unlink(path.join(__dirname, '..', 'uploads', user.avatar), (err) => {
                if (err) {
                    return next(new HttpError(err))
                }
            })
        }

        let fileName = avatar.name;
        let splittedFilename = fileName.split('.')
        let newFilename = splittedFilename[0] + uuid() + '.' + splittedFilename[splittedFilename.length - 1]
        avatar.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
            if (err) {
                return next(new HttpError(err), 422)
            }

            const updatedAvatar = await User.findByIdAndUpdate(req.user.id, { avatar: newFilename }, { new: true })
            if (!updatedAvatar) {
                return next(new HttpError("Avatar couldm't be changed.", 422))
            }
            res.status(200).json(updatedAvatar)
        })



    } catch (error) {
        return next(new HttpError(error))
    }

}




//POST : api/users/details
//PROTECTED
const editUserDetails = async (req, res, next) => {
    try {
        const { name, email, about, mobile, country, interest } = req.body;
        if ((!name)) {
            return next(new HttpError('Fill In All Fields'))
        }
        //get user from database
        const user = await User.findById(req.user.id);
        if (!user) {
            return next(new HttpError("User not found.", 403))
        }
        const newInfo = await User.findByIdAndUpdate(req.user.id, { name, about, country, interest, mobile }, { new: true })
        res.status(200).json(newInfo)



    } catch (error) {
        return next(new HttpError(error))

    }
}







module.exports = {
    registerUser, loginUser, getUser, changeUserAvatar, editUserDetails
}