import {
	createRoom,
	promoteUser
} from "../controller/controllerRooms";
import auth from '../middleware/auth';

const routeRooms = (app) => {
	app.route('/rooms')
		.post(auth, createRoom);
	app.route('/promote')
		.post(auth, promoteUser);
}

export default routeRooms;
