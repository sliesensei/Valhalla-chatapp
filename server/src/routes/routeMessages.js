import {
	getRoomMessages
} from "../controller/controllerMessages";
import auth from "../middleware/auth";

const routeMessages = (app) => {
	app.route('/rooms/:roomId/messages')
		/**
		 * List Room's Messages
		 * @param roomId
		 */
		.get(auth, getRoomMessages)
}

export default routeMessages;
