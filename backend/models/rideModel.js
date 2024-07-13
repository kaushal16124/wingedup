import mongoose from "mongoose";

const RideSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    amount : {
        type: String,
        required: true
    },

  });

  export const Ride = mongoose.model('ride',RideSchema)