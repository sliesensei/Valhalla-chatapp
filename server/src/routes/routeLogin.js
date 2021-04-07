import {
    Login
} from '../controller/controllerLogin';
var passport = require('passport');

const routeLogin = (app) => {
    app.route('/login')
      .post(Login);
}

export default routeLogin;
