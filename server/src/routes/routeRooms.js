import {
	createRoom,
	getRooms,
	promoteUser,
	getMyRooms
} from "../controller/controllerRooms";
import auth from '../middleware/auth';

const routeRooms = (app) => {
	app.route('/rooms')
		.get(auth, getMyRooms)
		.post(auth, createRoom);
	app.route('/promote')
		.post(auth, promoteUser);
	app.route('/roomlist')
		.get(getRooms);
}

export default routeRooms;
