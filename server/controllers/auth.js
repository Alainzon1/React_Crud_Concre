const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.login = (req, res) => {
    const { name, password } = req.body
    if (password === process.env.PASSWORD) {
        //generar el token y mandarlo al cliente
        const token = jwt.sign({ name }, process.env.JWT_SECRET, { expiresIn: '1d' })
        return res.json({ token, name })
    } else {
        return res.status(400).json({
            error: 'Incorrect paswword'
        })
    }
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['sha1', 'RS256', 'HS256'],
  });