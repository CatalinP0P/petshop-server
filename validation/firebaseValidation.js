const admin = require('../lib/firebase')

const validateIdToken = async (req, res, next) => {
    // Getting the token
    const authHeader = req.header('authorization')
    if (!authHeader) return res.status(401).send('Id Token not provided')
    const token = authHeader.split(' ')[1]
    if (!token) return res.status(401).send('Id Token not in corrent format')

    // Validating the token
    admin
        .auth()
        .verifyIdToken(token)
        .then((user) => {
            req.user = user
            return next()
        })
        .catch((err) => {
            res.status(403).send(err.message)
        })
}

module.exports = {
    validateIdToken: validateIdToken,
}
