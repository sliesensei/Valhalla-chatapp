import {
    Login
} from '../controller/controllerLogin';
import auth from '../middleware/auth';

const routeLogin = (app) => {
    app.route('/login')
        .post(Login)
        .get(auth, (req, res) => { res.status(200).send })
}

export default routeLogin;
