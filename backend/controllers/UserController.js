const User = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// helpers
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

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

        // create a password
        const salt = await bcrypt.genSalt(12); // insert 12 chars in password
        const passwordHash = await bcrypt.hash(password, salt); // Crypto the password

        // create a user
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash,
        })

        try {
            const newUser = await user.save()

            await createUserToken(newUser, request, response)
            return
        } catch(error) {
            response.status(500).json({ message: error });
        }
    }

    static async login(request, response) {

        const { email, password } = request.body;

        if(!email) {
            response.status(422).json({ message: 'O email é obrigatório' })
            return
        }

        if(!password) {
            response.status(422).json({ message: 'A senha é obrigatória' })
            return
        }

        // check if user exists
        const user = await User.findOne({ email: email })
        if(!user) {
            response.status(422).json({ message: 'Não há usuário cadastrado com este email!'})
            return
        }

        // check if password match with db password
        const checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword) {
            response.status(422).json({ message: 'Senha inválida!'})
            return
        }

        await createUserToken(user, request, response)
    }   

    static async checkUser(request, response) {
        
        let currentUser;

        if(request.headers.authorization) {

            const token = getToken(request);
            const decoded = jwt.verify(token, 'nossosecret');

            currentUser = await User.findById(decoded.id);
            currentUser.password = undefined;

        } else {
            currentUser = null;
        }

        response.status(200).json({ message: currentUser });

    }

    static async getUserById(request, response) {

        const id = request.params.id;

        const user = await User.findById(id).select("-password");

        if(!user) {
            response.status(422).json({ message: 'Usuário não encontrado!' })
            return
        }

        response.status(200).json({ user })
    }
    
    static async editUser(request, response) {
        
        const id = request.params.id;
        
        // check if user exists
        const token = getToken(request);
        const user = await getUserByToken(token)

        const { name, email, phone, password, confirmpassword } = request.body;
        
        let image = '';

        // validations
        if(!name) {
            response.status(422).json({ message: 'O nome é obrigatório' })
            return
        }

        user.name = name;

        if(!email) {
            response.status(422).json({ message: 'O email é obrigatório.' })
            return
        }

        // check if email has already taken
        const userExists = await User.findOne({ email: email }) 

        if(user.email !== email && userExists) {
            response.status(422).json({ message: 'Por favor, utilize outro email.' })
            return
        }

        user.email = email;

        if(!phone) {
            response.status(422).json({ message: 'O telefone é obrigatório;' })
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
            return
        }


       

    }

}