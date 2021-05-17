import routeConfirmation from "./routes/routeConfirmation";
import routeInvitations from "./routes/routeInvitations";
import routeLogin from "./routes/routeLogin";
import routeMessages from "./routes/routeMessages";
import routeRooms from "./routes/routeRooms";
import routeUsers from "./routes/routeUsers";

export function error(res, message = '', code = 400) {
	return res.status(400).json({error: message});
}

export function applyRoutes(app) {
	routeConfirmation(app);
	routeInvitations(app);
	routeLogin(app);
	routeMessages(app);
	routeRooms(app);
	routeUsers(app);
}
