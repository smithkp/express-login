const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');





function init(passport, getUserByEmail) {
    //makes sure that username / password are correct
    const userAuth = async(email,password,done) => {
        const user = getUserByEmail(email);

        //if email is not found, return with message
        if(user == null){
            return done(null, false, {message: 'Email address not found'});
        }

        try {
            //if password is correct, return user. else incorrect, return message.
            if (await bcrypt.compare(password, user.password)){
                return done(null,user)
            } else {
                return done(null, false, {message: 'incorrect password'})
            }
        }catch (e) {
            return done(e);
        }
    };

    passport.use(new localStrategy({usernameField: 'email'}, userAuth))

    //Sets id value as cookie to store user across session/ Decides what to store
    passport.serializeUser((user,done) =>{

    })

    //retrieves cookie
    passport.deserializeUser((id,done) =>{

    })
}

module.exports = init;
