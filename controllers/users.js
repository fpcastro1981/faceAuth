const User = require('../models/user');

module.exports = {
    signUp: async(req, res, next) => {
        console.log('up');

        const {email, password} = req.value.body;

        // check if is there a user with the same email
        const foundUser = await User.findOne({email});
        if (foundUser){
            return res.status(403).json({error: 'Email is already in use' });
        }

        // create a new user
        const newUser = new User({email, password});
        await newUser.save();

        // respond with token
        res.json({ user: 'created'});
    },
    
    signIn: async(req, res, next) => {
        console.log('in');
    },

    secret: async(req, res, next) => {
        console.log('secret');
    }

}