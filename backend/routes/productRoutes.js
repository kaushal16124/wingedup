import express from "express";
import { Products } from "../models/productModel.js";
const router = express.Router();
import auth from "../midleware/auth.js"

//include auth Admin middleware for all except get
router.post('/createproduct', async (req, res) => {
    let success=false;

    try {

        const { product_id, title, amount, description, content, images, category } = req.body;

        if (!images) return res.status(400).json({ msg: "No image" })
        const product = await Products.findOne({ product_id })

        if (product) return res.status(400).json({ msg: "Product exists" })

        const newProduct = new Products({
            product_id, title, amount, description, content, images, category
        })

        await newProduct.save()
        success=true;
        res.json({ success,newProduct })
    } catch (err) {
        return res.status(500).json({ success,msg: err.message })
    }
})


router.delete('/deleteproduct/:id', async (req, res) => {
    let success=false;
    try {

        await Products.findByIdAndDelete(req.params.id)
        success=true;
        res.json({ success,msg: "Product deleted" })

    } catch (err) {
        return res.status(500).json({ success,msg: err.message })
    }
})

router.put('/updateproduct/:id', async (req, res) => {
    let success=false;
    try {

        const { title, amount, description, content, images, category } = req.body;
        if (!images) return res.status(400).json({ msg: "No image" })


        await Products.findByIdAndUpdate({ _id: req.params.id }, {
            title, amount, description, content, images, category
        })
        success=true;
        res.json({ success,msg: "Product updated" })

    } catch (err) {
        return res.status(500).json({ success,msg: err.message })
    }
})

router.get('/getallproducts', async (req, res) => {
    try {
        
        const products = await Products.find()
        res.json({
            status: 'success',
            result: products.length,
            products: products
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})



export default router;