import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    author : {
        type: String,
        required: true
    },
    images: [{
        type: String
    }],
    videos: [{
        type: String
    }]
  },{
    timestamps:true
});

  export const Blogs = mongoose.model('Blogs',BlogSchema)