const HttpStatus = require('../constants/http-status');
const { getTokenRoles } = require("../helpers/jwt.helper");

const authorizeMiddleware = (roles) => {
    return [
        (req, res, next) => {
            const headers = req.headers;
            const token = headers.authorization.substring(headers.authorization.indexOf(' ') + 1, headers.authorization.length).trim();
            const rolesToken = getTokenRoles(token);

            const isRolValid = roles.some(rol => rolesToken.indexOf(rol) >= 0);

            if (!isRolValid) {
                return res.status(HttpStatus.UNAUTHORIZED).send();
            }

            next();
        }
    ];
}

module.exports = { authorizeMiddleware };