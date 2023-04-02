// const User = require('../models/User');


module.exports = class UserController {

    static async register(request, response) {
        await response.json('Hello Get a Pet');
    }

}