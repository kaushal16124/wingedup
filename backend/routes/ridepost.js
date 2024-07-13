import express from "express";
import {Ride} from "../models/rideModel.js";
const router = express.Router();
import {body, validationResult } from "express-validator";

router.post('/', [
    body('title', 'Title should be atleast 5 characters').isLength({ min: 5 }),
    body('description', 'Description should be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {

        let ride = await Ride.create({
            title: req.body.title,
            description: req.body.description,
            amount: req.body.amount
        })
        res.json(ride);

    } catch (error) {

        console.error(error.message)
        res.status(500).send("Some error occured bro")
    }
})

router.get('/fetchallrides', async (req, res) => {

    try {
        const ride = await Ride.find().sort({ "date": -1 });
        res.json(ride);

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured!")
    }

})


router.put('/updateride/:id', async (req, res) => {

    const { title, description, amount } = req.body;
    try {
        //Create a new note object
        const newRide = {};
        if (title) { newRide.title = title };
        if (description) { newRide.description = description };
        if (amount) { newRide.amount = amount };

        //Check if it's the same user and fetch/update the note
        let ride = await Ride.findById(req.params.id);
        if (!ride) {
            return res.status(404).send("Not found")
        }



        ride = await Ride.findByIdAndUpdate(req.params.id, { $set: newRide }, { new: true })
        res.json({ ride });
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured!")
    }
})



router.delete('/deleteride/:id', async (req, res) => {
    let ride = await Ride.findById(req.params.id);
    if (!ride) { return res.status(404).send("Not Found") }

    ride = await Ride.findByIdAndDelete(req.params.id)
    res.json({ "Success": "Ride deleted", ride: ride });
})


export default router;