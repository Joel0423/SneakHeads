const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const generateToken = require('../utils/generateTokens');

module.exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, gender, dateOfBirth, address } = req.body;

        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).send('User already exists');
        }

        let salt = await bcrypt.genSalt();
        let hashPassword = await bcrypt.hash(password, salt);

        user = await userModel.create({ firstName: firstName, lastName: lastName, email: email, password: hashPassword, gender: gender, dateOfBirth: dateOfBirth, address: address });

        let token = generateToken({ email });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // expires in 30 days 
        });

        res.status(201).send({token: token});
    } catch (error) {
        res.status(500).send(error.message);
    }

};
module.exports.loginUser = async (req, res) => { 
    try{
        const { loginEmail: email, loginPassword: password } = req.body;

        let user = await userModel.findOne({ email: email });

        if(!user){
            res.status(404).send("User not found");
        }
        else {
            let passwordResult = await bcrypt.compare(password, user.password);
            if(passwordResult){
                let token = generateToken({ email });

                res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 30 * 24 * 60 * 60 * 1000, // expires in 30 days
                });

                res.status(201).send({token: token});
            }
            else{
                res.status(401).send("Invalid credentials");
            }
        }
    }
    catch(error){
        res.status(500).send(error.message);
    }
};
module.exports.logoutUser = (req, res) => { 
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
    })

    res.status(201).send("User logged out successfully");
};
module.exports.profileUser = (req, res) => { 
    res.status(200).send({user: req.user});
};