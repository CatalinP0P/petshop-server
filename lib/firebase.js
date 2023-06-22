const admin = require('firebase-admin')
const firebaseConfig = require('../firebase.json')

admin.initializeApp(admin.credential.cert(firebaseConfig))

module.exports = admin