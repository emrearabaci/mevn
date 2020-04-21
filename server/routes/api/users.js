const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../../config/keys').secret;

const User = require('../../model/User');

/**
 * @route POST api/users/register
 * @desc register
 * @access public
 */
router.post('/register', (req, res) => {
    let {
        name,
        username,
        email,
        password,
        confirmPassword
    } = req.body;

    if (password !== confirmPassword) {
        return res.status(200).json({
            success: false,
            message: 'Şifreler eşleşmedi'
        })
    }

    User.findOne({username: username})
        .then(user => {
            if (user) {
                return res.status(200).json({
                    success: false,
                    message: 'Kullanıcı adı müsait değil'
                })
            }
        });

    User.findOne({email: email})
        .then(user => {
            if (user) {
                return res.status(200).json({
                    success: false,
                    message: 'email müsait değil'
                })
            }
        });

    let newUser = new User({
        name,
        username,
        email,
        password
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
                .then(user => {
                    return res.status(200).json({
                        success: true,
                        message: 'Kayıt başarılı'
                    })
                })
        })
    })
});


/**
 * @route POST api/users/login
 * @desc login
 * @access public
 */
router.post('/login', (req, res) => {
    User.findOne({username: req.body.username})
        .then(user => {
            if (!user) {
                return res.status(200).json({
                    success: false,
                    message: 'kullanıcı bulunamadı'
                })
            }
            bcrypt.compare(req.body.password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            _id: user._id,
                            username: user.username,
                            name: user.name,
                            email: user.email
                        }
                        jwt.sign(payload, key, {
                            expiresIn: 604800
                        }, (err, token) => {
                            res.status(200).json({
                                success: true,
                                token: `Bearer ${token}`,
                                user: user,
                                message: 'Giriş yapıldı'
                            })
                        })
                    } else {
                        return res.status(200).json({
                            success: false,
                            message: 'şifre hatalı'
                        })
                    }
                })
        })
});


/**
 * @route GET api/users/profile
 * @desc login
 * @access Private
 */
router.get('/profile', passport.authenticate('jwt',
    {session: false}), (req, res) => {
    return res.json({
        user: req.user
    })
});

module.exports = router;