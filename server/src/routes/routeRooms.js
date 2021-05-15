import {
	createRoom
} from "../controller/controllerRooms";
import auth from '../middleware/auth';

const routeRooms = (app) => {
	app.route('/rooms')
		.post(auth, createRoom);
}

export default routeRooms;
