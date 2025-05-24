const Authorization = require("../constants/authorization");
const HttpStatus = require("../constants/http-status");
const { verifyToken } = require("../helpers/jwt.helper");

const authorizationMiddleware = (req, res, next) => {
    const headers = req.headers;

    if (!headers.authorization) {
        return res.status(HttpStatus.UNAUTHORIZED).send();
    }

    if (!headers.authorization.toUpperCase().includes(Authorization.TYPE.toUpperCase())) {
        return res.status(HttpStatus.UNAUTHORIZED).send();
    }

    const token = headers.authorization.substring(headers.authorization.indexOf(' ') + 1, headers.authorization.length).trim();
    
    if (!verifyToken(token)) {
        return res.status(HttpStatus.UNAUTHORIZED).send();
    }

    next();
}

module.exports = { authorizationMiddleware }