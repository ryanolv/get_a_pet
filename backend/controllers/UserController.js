const User = require('../models/User');


module.exports = class UserController {

    static async register(request, response) {
        
        const { name, email, phone, password, confirmpassword } = request.body;

        // validations
        if(!name) {
            response.status(422).json({ message: 'O nome é obrigatório' })
            return
        }
        if(!email) {
            response.status(422).json({ message: 'O email é obrigatório' })
            return
        }
        if(!phone) {
            response.status(422).json({ message: 'O telefone é obrigatório' })
            return
        }
        if(!password) {
            response.status(422).json({ message: 'A senha é obrigatória' })
            return
        }
        if(!confirmpassword) {
            response.status(422).json({ message: 'A confirmação de senha é obrigatória' })
            return
        }
        if(password !== confirmpassword) {
            response.status(422).json({ message: 'Verifique a confirmação de senha'})
        }

        // check if user exists
        const userExists = await User.findOne({ email: email })
        if(userExists) {
            response.status(422).json({ message: 'Usuário já existe'})
            return
        }

        
    }

}