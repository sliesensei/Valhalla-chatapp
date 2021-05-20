import {
	invite,
	accept,
	getInvitations
} from "../controller/controllerInvitations";
import auth from "../middleware/auth";

const routeInvitations = (app) => {
	app.route('/invite')
		/**
		 * List all invitations
		 */
		.get(auth, getInvitations)
		/**
		 * Invite an user
		 * @param roomId
		 * @param userId
		 */
		.post(auth, invite);
	app.route('/accept')
		/**
		 * @param token
		 */
		.post(auth, accept);
}

export default routeInvitations;
