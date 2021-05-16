export function error(res, message = '', code = 400) {
	return res.status(400).json({error: message});
}
