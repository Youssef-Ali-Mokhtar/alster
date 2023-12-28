const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

const {
    getProduct,
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct
} = require('../controllers/ProductControllers');

//require auth for all workout routes
// router.use('/', requireAuth)

router.get('/', getProducts)

router.get('/:id', getProduct)

router.use('/', requireAuth)

router.delete('/:id', deleteProduct)

router.patch('/:id', updateProduct)

// router.use('/post', requireAuth)

router.post('/post', createProduct)

module.exports = router;