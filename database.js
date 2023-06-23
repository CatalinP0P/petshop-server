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

const filterProducts = async (filters) => {
    const { q, category, minPrice, maxPrice } = filters
    
    const query = {}
    if (q) query.title = { $regex: q, $options: 'i' }
    if (category) query.category = { $regex: category, $options: 'i' }
    if (minPrice) query.price = { $gte: minPrice }
    if (maxPrice) query.price = { ...query.price, $lte: maxPrice }

    console.log(query)

    const response = await products.find(query).toArray()

    return response
}

module.exports = {
    getAllProducts: getAllProducts,
    getProduct: getProduct,

    insertProduct: insertProduct,
    getBestSelling: getBestSelling,
    incrementSales: incrementSales,
    filterProducts: filterProducts,
}
