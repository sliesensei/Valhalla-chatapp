import {
    Login
} from '../controller/controllerLogin';

const routeLogin = (app) => {
    app.route('/login')
      .post(Login);
}

export default routeLogin;
