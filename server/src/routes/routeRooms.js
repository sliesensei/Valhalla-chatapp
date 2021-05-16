import {
	createRoom,
	getRooms,
	promoteUser,
	getMyRooms,
	leave
} from "../controller/controllerRooms";
import auth from '../middleware/auth';

const routeRooms = (app) => {
	app.route('/rooms')
		/**
		 * Get all my rooms
		 */
		.get(auth, getMyRooms)
		/**
		 * Create a room
		 * @param name Room name
		 */
		.post(auth, createRoom);
	app.route('/promote')
		/**
		 * Promote an user
		 * @param userId user's ID to promote
		 * @param roomId
		 */
		.post(auth, promoteUser);
	app.route('/roomlist')
		/**
		 * List all rooms
		 */
		.get(getRooms);
	app.route('/leave')
		/**
		 * Leave a room
		 * @param roomId
		 */
		.post(auth, leave);
}

export default routeRooms;
