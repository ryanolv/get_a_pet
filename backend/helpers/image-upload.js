const { request } = require('http');
const multer = require('multer');
const path = require('path');

// Destination to store the image
const imageStorage = multer.diskStorage({
    destination: function (request, file, cb) {

        let folder = ""

        if(request.baseUrl.includes("users")) {
            folder = 'users';
        } else if(request.baseUrl.includes("pets")) {
            folder = 'pets';
        }

        cb(null, `public/images/${folder}`)

    },
    filename: (request, file, cb) => {
        cb(null, Date.now() + String(Math.floor(Math.random() * 100)) 
        + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(request, file, cb) {
        if(file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error("Por favor, envie apenas jpg ou png."))
        }
        cb(undefined, true)
    }
})

module.exports = {imageUpload};