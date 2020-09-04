'use strict'

const jwt = require('jsonwebtoken');
const moment = require('moment');

// create Token
function createToken(user){
    var payload = {
        id: user.id,
        iat: moment().unix(),
        exp: moment().add(24, 'hour').unix()
    };
    return jwt.sign(payload,'T0k3n_p4ss');
}

module.exports = {
    createToken
}