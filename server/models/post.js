const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const postSchema = new mongoose.Schema({
    nombre: {
        type: String,
        min: 3,
        max: 160,
        required: true
    },
    apellido: {
        type: String,
        min: 3,
        max: 160,
        required: true
    },
    apellidoM: {
        type: String,
        min: 3,
        max: 160,
    },
    calle: {
        type: String,
        min: 3,
        max: 160,
        required: true
    },
    numeroD: {
        type: String,
        min: 3,
        max: 20,
        required: true
    },
    colon: {
        type: String,
        min: 3,
        max: 160,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        index: true,
        lowercase: true,
    },
    codigoP: {
        type: String,
        required: true,
        min: 1,
        max: 20
    },
    numeroTel: {
        type: String,
        required: true,
        min: 1,
        max: 20
    },
    rfc: {
        type: String,
        required: true,
        min: 2,
        max: 18
    },
    estado: {
        type: String,
        required: true,
        min: 2,
        max: 18
    },
    user: {
        type: String,
        default: 'Admin'
    }
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);