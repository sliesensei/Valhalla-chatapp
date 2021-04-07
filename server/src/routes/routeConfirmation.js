import {
	confirm,
	getConfirms
} from "../controller/controllerConfirmation";

const routeConfirmation = (app) => {
	app.route('/confirmations')
		.get(getConfirms);
	app.route('/confirmations/:code')
		.post(confirm);
}

export default routeConfirmation;
