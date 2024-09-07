const mongoose = require('mongoose');
const express = require('express');
const Product = require('../models/Product');
const Order = require('../models/Order');  // Ensure this is correctly pathed to your Order model
const router = express.Router();


// POST: Place a bulk order
router.post('/bulk-order', async (req, res) => {
    const { userId, type, totalQuantity } = req.body;
    console.log(req.body);
    
    try {
        console.log('start bulk order');
        // Fetch all products of the specified type and sort them by the creation date
        let products = await Product.find({ name: type }).sort('createdAt');
        console.log('products', products);
        
        let results = [];
        let remainingQuantity = totalQuantity;
        console.log('sorting products by createdAt', products);
        
        // Distribute the order among the products
        for (const product of products) {
            if (remainingQuantity <= 0) break;
            let available = Math.min(product.quantity, remainingQuantity);
            if (available > 0) {
                product.quantity -= available;  // Update product stock
                remainingQuantity -= available;
                console.log('remaining quantity', remainingQuantity);


                // Create an order record
                const order = new Order({
                    userId: userId,
                    sellerId: product.userId,  // Assuming the owner of the product is the seller
                    productId: product._id,
                    quantity: available,
                    totalPrice: available * product.price,  // Assuming total price needs to be calculated
                    status: 'pending'  // Default status
                });

                await order.save();
                await product.save();  // Save the product with updated quantity
                
                results.push({
                    orderId: order._id,
                    productId: product._id,
                    sellerId: product.userId,
                    distributedQuantity: available,
                    remainingProductQuantity: product.quantity
                });
            }
        }

        res.json({
            message: 'Bulk order processed successfully',
            distribution: results
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
