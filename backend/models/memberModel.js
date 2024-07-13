import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    age : {
        type: String,
        required: true
    },
    exp : {
        type: String,
        required: true
    },
    desc : {
        type: String,
        required: true
    },
    profilePicUrl : {
        type: String,
        required: true
    },
    instaUrl : {
        type: String,
        required: true
    },
    whatsAppUrl : {
        type: String,
        required: true
    },
    facebookUrl : {
        type: String,
        required: true
    }
  },{
    timestamps:true
});

  export const Member = mongoose.model('Member',MemberSchema)