const express = require('express')
const cors = require('cors')
const db = require('./lib/mongodb')
const firebaseValidation = require('./validation/firebaseValidation')

const app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    res.send('Server for PetShop running')
})

const productsRouter = require('./routers/products')
app.use('/products', productsRouter)

const cartRouter = require('./routers/cart')
app.use('/cart', firebaseValidation.validateIdToken, cartRouter)

app.listen(3001, () => {
    console.log('Server running on port 3001')
})
