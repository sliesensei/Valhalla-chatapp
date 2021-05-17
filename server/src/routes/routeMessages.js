import {
	getRoomMessages
} from "../controller/controllerMessages";
import auth from "../middleware/auth";

const routeMessages = (app) => {
	app.route('/room/messages')
		/**
		 * List Room's Messages
		 * @param roomId
		 */
		.get(auth, getRoomMessages)
}

export default routeMessages;
