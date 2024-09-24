const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
module.exports.protect = async(req, res, next) => {

    const { token } = req.body;
    // console.log(token);
    if(token !== '') {
        try {
            // gives the email
            const data = jwt.verify(token, process.env.JWT_SECRET);
            // get the user details and remove password field
            req.user = await userModel.findOne({ email: data.email }).select("-password");

            next();
        } catch (error) {
            res.status(401).send(error.message);
        }
    }
    else{
        res.status(401).send("Not authorized, you don't have permission to access")
    }
}