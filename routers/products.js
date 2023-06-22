const router = require('express').Router()
const database = require('../database')
const firebaseValidation = require('../validation/firebaseValidation')

router.get('/', async (req, res) => {
    const prod = await database.getAllProducts()
    res.send(prod)
})

router.get('/bestselling', async (req, res) => {
    const response = await database.getBestSelling()
    res.send(response)
})

router.get('/:id', async (req, res) => {
    const prod = await database.getProduct(req.params.id)
    res.send(prod)
})

router.post('/', async (req, res) => {
    const { title, price, description, imageURL, category } = req.body
    const response = await database.insertProduct({
        title: title,
        price: price,
        description: description,
        category: category,
        imageURL: imageURL,
        sales: 0,
    })
    res.send(response)
})

module.exports = router
