const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    try {
        let data = [{ Order_date: req.body.order_date }, ...req.body.order_data];
        console.log("spliced data:", data);

        let eId = await Order.findOne({ "email": req.body.email });
        console.log("eId", eId);

        if (eId === null) {
            await Order.create({
                email: req.body.email,
                order_data: [data],
            });
            console.log("success");
            res.json({ success: true });
        } else {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            res.json({ success: true });
        }
    } catch (error) {
        console.error('Error processing orderData:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/myOrderData', async (req, res) => {
    try {
        //console.log(req.body);
        let myData = await Order.findOne({ "email": req.body.email });
        res.json({ orderData: myData });
    } catch (error) {
        console.error('Error fetching myOrderData:', error);
        res.status(500).send('Server Error: ' + error.message);
    }
});

module.exports = router;
