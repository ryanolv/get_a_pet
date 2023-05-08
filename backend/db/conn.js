const mongoose = require('mongoose');


async function main() {
    mongoose.set('strictQuery', true)
    await mongoose.connect('mongodb://127.0.0.1:27017/get_a_pet');
    console.log('Conectou ao Mongoose!');
}

main().catch(err => console.log(err))

module.exports =  mongoose;