const jwt = require("jsonwebtoken")

const authentificateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.sendStatus(401)
    
    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
        if (err) return res.sendStatus(403)
        req.jwtData = data
        next()
    })
}

module.exports = authentificateToken