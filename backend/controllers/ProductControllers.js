const Product = require('../models/ProductModel');
const mongoose = require('mongoose');

//get all products
const getProducts = async(req, res)=> {
    const productsList = await Product.find({}, {name: true}).sort({createdAt: -1});
    res.json(productsList);
}

// get a single product
const getProduct = async(req, res)=> {
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such product'});
    }

    const product = await Product.findById(id);

    if(!product) {
        return res.status(404).json({error: 'No such product'})
    }
    res.status(200).json(product);
}

//create a new product
const createProduct = async(req, res) => {
    const user_id = req.user._id
    const {name, type, price} = req.body;

    try {
        const product = await Product.create({name, type, price, user_id});
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({error: error.message});
    }

}

//delete product
const deleteProduct = async(req, res)=> {
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such product'});
    }

    const product = await Product.findOne({_id: id});

    if(!product) {
        return res.status(404).json({error: 'No such product'})
    }
    
    //compare current user id with the user that posted the product
    if(product.user_id !== req.user._id.toString()) {
        return res.status(401).json({error: 'Request is not authorized'})
    }

    const deletedProduct = await Product.findOneAndDelete({_id: id});

    res.status(200).json(deletedProduct);
}

//update product
const updateProduct = async(req, res)=> {
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such product'});
    }

    const product = await Product.findOne({_id: id});

    if(!product) {
        return res.status(404).json({error: 'No such product'})
    }
    
    //compare current user id with the user that posted the product
    if(product.user_id !== req.user._id.toString()) {
        return res.status(401).json({error: 'Request is not authorized'})
    }

    const updatedProduct = await Product.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    res.status(200).json(updatedProduct);
}



  module.exports = {
    getProduct,
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct
  }