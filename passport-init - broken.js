var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Post = mongoose.model('Post');
//temporary data store
//var users = {};
module.exports = function(passport){

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(users, done) {
        console.log('serializing user:', users._id);
        return done(null, users._id);
    });

    passport.deserializeUser(function(username, done) {
//tell passport which ID to use for password.
        User.findById(id, function(err, user)
                     {
            if(err)
                {
                    return done (err, false);
                }
            
           if (!user)
               {
                   return done ('user not found',false);
               }
            
            //FOund user provided back to passport
            return done (user, true);
        });
        
    });

  passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 

      
      User.findOne({username}, function(err, user)
                  {
          if(err)
              {
                  return done(err, false);
              }
          
          if (!user)
              {
                  return done('username not found with name' + username, false);
              }
          
          if(!isValidPassword(user, password))
              {
                //Wrong Password
                  return done('incorrect password', false)
              }
          return done(null, user)
          
      });
                              
        }
));
    
    passport.use('signup', new LocalStrategy
                 (
        {
            passReqToCallback : true // allows us to pass back the entire request to the callback
        
        
        },
        
        function(req, username, password, done) 
        {
        User.findOne({username: username}, function(err, user)
                     {
            if(err)
                {
                    return done(err, false);
                }
            if(user)
                {
                    //we have already signed this user up
                    return done('username already taken, false');
                }
    
            
            var user = new User()
            user.username = username;
            user.password = createHash(password);
           
            user.save(function(err, user)
                      
            {
                if(err)
                {
                    return done(err, false);
                }
            console.log('successfully signed up');
            return done(null, user);
                
            }
            )
        }
                     )
        }
        )
                 )
};
                /*
                passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            User.findOne({ 'username' :  username }, function(err, user) {
    // In case of any error, return using the done method
    if (err){
        console.log('Error in SignUp: '+err);
        return done(err);
    }
    // already exists
    if (user) {
        console.log('User already exists with username: '+username);
        return done(null, false);
    } else {
        // if there is no user, create the user
        var newUser = new User();

        // set the user's local credentials
        newUser.username = username;
        newUser.password = createHash(password);

        // save the user
        newUser.save(function(err) {
            if (err){
                console.log('Error in Saving user: '+err);  
                throw err;  
            }
            console.log(newUser.username + ' Registration successful');    
            return done(null, newUser);
        });
    }
});*/


    var isValidPassword = function(users, password){
        return bCrypt.compareSync(password, user.password);
    };
    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };
    