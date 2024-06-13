const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "fsdproject"

router.post("/createuser",
    [
        body('email').isEmail(),
        body('name').isLength({ min: 5 }),
        body('password', "min lenth of password is 5 ").isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password,salt)
        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            }).
                then(createdDocument => res.json({
                    //...createdDocument._doc,
                    success: true,
                }))
        } catch (err) {
            console.error(err);
            res.json({ success: false, error: err.message });
        }
    }
);


router.post("/loginuser",
    [
        body('email','Enter valid email').isEmail(),
        body('password', "min lenth of password is 5").exists()
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const {email, password} = req.body;
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({errors: "Email not found" })
            }


            const pwdCompare = await bcrypt.compare(password,userData.password);
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Password incorrect"})
            }

            const data = {
                user: {
                    id:userData.id,
                }
            }

            const authToken = jwt.sign(data, jwtSecret)

            return res.json({ success: true ,authToken:authToken})
        } catch (err) {
            res.send({
                error: err.message,
                success: false,
                message: "error in accomplishment of connection"
            })
        }


    }
);

module.exports = router;
