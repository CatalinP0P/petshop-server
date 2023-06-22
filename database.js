const { ObjectId } = require('mongodb')
const db = require('./lib/mongodb')
const { response } = require('express')
const products = db.collection('Products')

const getAllProducts = async () => {
    try {
        const response = await products
            .find({})
            .sort({ 'sys.createdAt': -1 })
            .toArray()
        return response
    } catch (err) {
        console.error(err)
        return err
    }
}

const getProduct = async (productID) => {
    try {
        const product = await products.findOne({ _id: new ObjectId(productID) })
        return product
    } catch (err) {
        console.error(err)
        return err
    }
}

const insertProduct = async (product) => {
    const response = await products.insertOne(product)
    return response.insertedId
}

const getBestSelling = async () => {
    const response = await products
        .find({})
        .sort({ sales: -1 })
        .limit(10)
        .toArray()

    return response
}

const incrementSales = async (productID) => {
    await products.updateOne(
        { _id: new ObjectId(productID) },
        { $inc: { sales: 1 } }
    )

    return 'Done'
}

module.exports = {
    getAllProducts: getAllProducts,
    getProduct: getProduct,

    insertProduct: insertProduct,
    getBestSelling: getBestSelling,
    incrementSales: incrementSales,
}
