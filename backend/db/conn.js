const moongose = require('moongose')


async function main() {
    await moongose.connect('mongodb://localhost:27017/getapet');
    console.log('Conectou ao Mongoose!');
}

main().catch(err => console.log(err))

module.exports =  moongose;