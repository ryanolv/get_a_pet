const Pet = require('../models/Pet');

// helpers
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

module.exports = class PetController {

    // create a pet
    static async create(request, response) {

        const { name, age, weight, color } = request.body;

        const images = request.files;

        const available = true;

        // TODO: images upload

        // validations

        if(!name) {
            return response.status(422).json({ message: "O nome é obrigatório." })
        }

        if(!age) {
            return response.status(422).json({ message: "A idade é obrigatória." })
        }

        if(!weight) {
            return response.status(422).json({ message: "O peso é obrigatório." })
        }

        if(!color) {
            return response.status(422).json({ message: "A cor é obrigatória." })
        }

        if(images.length === 0) {
            return response.status(422).json({ message: 'A imagem é obrigatória.'});
        }

        // get pet owner
        const token = getToken(request);
        const user = await getUserByToken(token);

        // create a pet
        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone,
            }
        })

        images.map((image) => {
            pet.images.push(image.filename);
        })

        try {
            const newPet = await pet.save();
            response.status(201).json({
                message: 'Pet cadastrado com sucesso.',
                newPet,
            })

        } catch(error) {

            response.status(500).json({ message: error })
        }

    }

}