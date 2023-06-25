const router = require('express').Router()

const { ObjectId } = require('mongodb')
const mongo = require('../lib/mongodb')

const cart = mongo.collection('Cart')
const orders = mongo.collection('Orders')

router.get('/', async (req, res) => {
    res.send('Getting all orders')
})

router.post('/', async (req, res) => {
    const { products, adress, userId } = req.body
    const response = await orders.insertOne({
        userId: userId,
        products: products,
        adress: adress,
        createdAt: new Date(),
    })

    res.send(response.insertedId)
})

router.get('/:id', async (req, res) => {
    const order = await orders.findOne({ _id: new ObjectId(req.params.id) })
    res.send(order)
})

module.exports = router
