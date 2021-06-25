import mongoose from "mongoose"

const Schema = mongoose.Schema

const health_schema = new Schema({

    fullname: {
        type: String,
        required: true,
        trim: true
    },
    temperature: {
        type: Number,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone_number: {
        type: String,
        required: true,
        trim: true
    }

}, {

    timestamps: true

})

const Health = mongoose.model('health', health_schema)

export default Health