import mongoose from "mongoose"

const emailSchema = new mongoose.Schema({
    to:{
        type:String,
        required:true,
    },
    from:{
        type:String,
        required:true
    },
    subject:{
        type:String
    },
    body:{
        type:String
    },
    time:{
        type:String
    },
    isRead:{
        type:Boolean,
        default:false
    },
    type: {
        type: String,
        enum: ["inbox", "sent"],
        required: true
    },
    attachment: {
        type: String, // URL of the attachment
        default: null
    }
},{
    timestamps:true
})

export const Email = mongoose.model("Email",emailSchema)