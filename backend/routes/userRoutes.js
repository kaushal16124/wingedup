import express from "express";
import { Users } from "../models/userModel.js";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import auth from "../midleware/auth.js"
import { v4 as uuidv4 } from 'uuid';


router.post('/register', async (req, res) => {
    let success = false;

    try {
        const { name, email, password } = req.body;

        const user = await Users.findOne({ email })

        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        if (password.length < 6)
            return res.status(400).json({ msg: "Password is weak" });

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new Users({
            name, email, password: passwordHash
        })

        await newUser.save()

        const accesstoken = createAccessToken({ id: newUser._id })
        const refreshtoken = createRefreshToken({ id: newUser._id })

        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/user/refreshtoken'

        })
        success = true;
        res.json({ success, accesstoken });
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

router.post('/refreshtoken', async (req, res) => {
    let success = false;
    try {
        const rf_token = req.cookies.refreshtoken;
        if (!rf_token) {
            return res.status(400).json({ msg: "Please login or register" })

        }
        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(400).json({ msg: "Please login or register" })
            const accesstoken = createAccessToken({ id: user.id })
            success = true;
            res.json({ success, accesstoken })
        })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }

})

router.post('/login', async (req, res) => {
    let success = false;
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ email });

        if (!user) return res.status(400).json({ msg: "User doesn't exist" })

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid password" })

        const accesstoken = createAccessToken({ id: user._id })
        const refreshtoken = createRefreshToken({ id: user._id })

        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/user/refreshtoken'

        })
        success = true;
        res.json({ success, accesstoken, refreshtoken });
        // res.json({msg:"Logged In"})
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }


})

router.get('/logout', async (req, res) => {
    try {
        res.clearCookie('refreshtoken', { path: '/user/refreshtoken' });
        return res.json({ msg: "Logged Out" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }


})

router.get('/info', auth, async (req, res) => {
    let success = false;

    try {
        const user = await Users.findById(req.user.id).select('-password')

        if (!user) return res.status(400).json({ msg: "User not found" });
        success = true;
        res.json({ success, user });

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }

})

//GET ALL CART ITEMS
router.get('/getallcartitems', auth, async (req, res) => {
    try {
        // Find the user by ID
        const user = await Users.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        // Return the cart items
        res.json({ cart: user.cart });
    } catch (err) {
        console.error("Error retrieving cart items:", err);
        return res.status(500).json({ msg: "Error retrieving cart items" });
    }
});

//ADD TO CART 
router.put('/addtocart', auth, async (req, res) => {
    let success=false;
    try {

        const { product_id, count, price, selectedDate } = req.body;
        const cartItem = {
            cartItem_id: uuidv4(),
            product_id: product_id,
            count: count,
            price: price,
            selectedDate: selectedDate
        };

        const user = await Users.findById(req.user.id);
        if (!user) return res.status(400).json({ msg: "User not found" });
        user.cart.push(cartItem)

        await user.save();
        success=true;
        res.json({ success, cart: user.cart })


    } catch (err) {
        return res.status(500).json({ success,msg: err.message })
    }
})

//UPDATE CART
router.put('/updatecart/:id', auth, async (req, res) => {

    try {

        const { count, price, selectedDate } = req.body;

        const user = await Users.findById(req.user.id);
        if (!user) return res.status(400).json({ msg: "User not found" });

        const cartItem_id = req.params.id;

        const cartItemIndex = user.cart.findIndex(item => item.cartItem_id === cartItem_id);
        if (cartItemIndex === -1) {
            return res.status(400).json({ msg: "Cart item not found" });
        }

        // Update the properties of the cart item
        if (count !== undefined) {
            user.cart[cartItemIndex].count = count;
        }
        if (price !== undefined) {
            user.cart[cartItemIndex].price = price;
        }
        if (selectedDate !== undefined) {
            user.cart[cartItemIndex].selectedDate = selectedDate;
        }

        // Update the user document in the database
        await Users.findByIdAndUpdate(user._id, user);


        res.json({ msg: "Cart item updated", cart: user.cart })


    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})


//REMOVE FROM CART
router.put('/removefromcart/:id', auth, async (req, res) => {

    try {


        const user = await Users.findById(req.user.id);
        if (!user) return res.status(400).json({ msg: "User not found" });
        const cartItem_Id = req.params.id;
        const indexToRemove = user.cart.findIndex(item => item.cartItem_id === cartItem_Id);
        

        if (indexToRemove === -1) {
            return res.status(400).json({ msg: "Cart item not found" });
        }

        user.cart.splice(indexToRemove, 1); // Remove the item from the cart array

        await user.save(); // Save the user document with the updated cart
        

        res.json({ msg: "Product removed from cart", cart: user.cart });


    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})


const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}


const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}



export default router;