import {
    Login
} from '../controller/controllerLogin';
var passport = require('passport');

const routeLogin = (app) => {
    app.route('/login')
      .post(Login);
    app.get('/auth/google',
        passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login',
                                                'https://www.googleapis.com/auth/userinfo.email']}));
    app.get('/auth/imgur',
        passport.authenticate('imgur'));
    app.get('/auth/imgur/callback', 
        passport.authenticate('imgur', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/');
        });
    app.get('/auth/spotify', 
        passport.authenticate('spotify', {scope: ['user-read-email']}));
        // The request will be redirected to spotify for authentication, so this
        // function will not be called.
        
    app.get('/auth/spotify/callback',
        passport.authenticate('spotify', { failureRedirect: '/login' }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });
}

export default routeLogin;