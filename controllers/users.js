const JWT = require('jsonwebtoken');
const User = require('../models/user');
const {JWT_SECRET} = require('../configuration');

signToken = user => {
    return JWT.sign({
        iss: 'faceAuth',
        sub: user.id,
        iat: new Date().getTime(), // current time
        exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day
    }, JWT_SECRET);
}

module.exports = {
    signUp: async(req, res, next) => {
        const {email, password} = req.value.body;

        // check if is there a user with the same email
        const foundUser = await User.findOne({email});
        if (foundUser){
            return res.status(403).json({error: 'Email is already in use' });
        }

        // create a new user
        const newUser = new User({email, password});
        await newUser.save();
        
        // Generate the token
        const token = signToken(newUser);

        // respond with token
        res.status(200).json({token});
    },
    
    signIn: async(req, res, next) => {
        console.log('in');
    },

    secret: async(req, res, next) => {
        console.log('I managed to get here');
    }

}