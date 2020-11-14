const Post = require('../models/post');
const slugify = require('slugify');

exports.create = (req, res) => {
    const 
    { nombre, apellido, apellidoM, calle, numeroD, colon, codigoP, numeroTel, rfc, estado, user } = req.body;
    const slug = slugify(nombre + apellido); //My post = my-post (example de slugify)
    //Validate
    switch (true) {
        case !nombre:
            return res.status(400).json({ error: 'El nombre es requerido' });
            break;
        case !apellido:
            return res.status(400).json({ error: 'Tu apellido es requerido' });
            break;
        case !calle:
            return res.status(400).json({ error: 'El nombre de calle es requerido' });
            break;
        case !numeroD:
            return res.status(400).json({ error: 'El número de domicilio es requerido' });
            break;
        case !colon:
            return res.status(400).json({ error: 'La colonia es requerido' });
            break;
        case !codigoP:
            return res.status(400).json({ error: 'El código postal es requerido' });
            break;
        case !numeroTel:
            return res.status(400).json({ error: 'El número de teléfono es requerido' });
            break;
        case !rfc:
            return res.status(400).json({ error: 'El RFC es requerido' });
            break;    
    }
    //Create post
    Post.create(
        { nombre, apellido, apellidoM, calle, numeroD, colon, codigoP, numeroTel, rfc, estado, user, slug }, 
            (err, post) => {
        if (err) {
            console.log(err)
            res.status(400).json({ error: 'Postulante duplicado. intenta con otro nombre' });
        }
        res.json(post);
    });
};


exports.list = (req, res) => {
    Post.find({})
        .limit(100)
        .sort({ createdAt: -1 })
        .exec((err, posts) => {
            if (err) console.log(err)
            res.json(posts);
        });

};

exports.read = (req, res) => {
    const { slug } = req.params
    Post.findOne({ slug })
        .exec((err, post) => {
            if (err) console.log(err)
            res.json(post);
        });

};

exports.update = (req, res) => {
    const { slug } = req.params;
    const { nombre, apellido, apellidoM, calle, numeroD, colon, codigoP, numeroTel, rfc, estado, user } = req.body
    Post.findOneAndUpdate({ slug }, 
        { nombre, apellido, apellidoM, calle, numeroD, colon, codigoP, numeroTel, rfc, estado, user }, { new: true }).exec((err, post) => {
        if (err) console.log(err)
        res.json(post);
    });
};

exports.remove = (req, res) => {
    const { slug } = req.params;
    Post.findOneAndRemove({ slug }).exec((err, post) => {
        if (err) console.log(err);
        res.json({
            message: 'Post deleted'
        });
    });
};