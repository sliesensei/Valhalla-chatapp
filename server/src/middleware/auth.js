const jwt = require("jsonwebtoken");
const config = require('../../config/default.json');

module.exports = function (req, res, next) {
	const token = req.headers.authorization.split(' ')[1];
	if (!token) return res.status(401).json({message: "Auth Error"});

	try {
		const decoded = jwt.verify(token, config.JWT_SECRET);
		req.user = decoded.user;
		next();
	} catch (e) {
		console.error(e);
		res.status(500).send({message: "Invalid Token"});
	}
};
