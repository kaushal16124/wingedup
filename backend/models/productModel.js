import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    product_id: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    amount: {
        type: Number,
        trim: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    images: {
        type: Object,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        default: false
    },
    sold: {
        type: Number,
        default: 0
    }
},{
    timestamps:true
})

export const Products = mongoose.model("Products",ProductSchema);