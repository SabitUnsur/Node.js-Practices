const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (!req.url.includes('/login')) {
        if (req.headers.authorization) {
            const t = req.headers.authorization.split(' ')[1] // Bearer token 
            jwt.verify(t, 'sabitunsur', (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: 'Auth failed' })
                }
                req.user = decoded // decoded içindeki bilgileri req.user a atadık 
                next()
            })
        } else {
            return res.status(401).json({ message: 'Auth failed' })
        }
    }else{
        next()
    }
}