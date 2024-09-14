import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title : {
        type: String,
        trim: true
        
    },
    description : {
        type: String,
        
    },
    author : {
        type: String,
        default: "Sushant Thakur"
    }
  },{
    timestamps:true
});

  export const Blogs = mongoose.model('Blogs',BlogSchema)