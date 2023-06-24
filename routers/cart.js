const router = require('express').Router()
const { ObjectId } = require('mongodb')
const mongo = require('../lib/mongodb')
const cart = mongo.collection('Cart')
const db = require('../database')

router.get('/', async (req, res) => {
    const response = await cart.findOne({ userId: req.user.uid })
    console.log(response)
    if (!response) {
        console.log('Creating a new cart')
        const cartId = await db.createCart(req.user.uid)
        const newCart = await cart.findOne({ _id: new ObjectId(cartId) })
        return res.send(newCart)
    }
    console.log('Getting the cart from db')
    return res.send(response)
})

router.post('/', async (req, res) => {
    const { products } = req.body
    const response = await cart.updateOne(
        { userId: req.user.uid },
        { $set: { products: products } }
    )

    res.send(response)
})

module.exports = router
