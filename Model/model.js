import mongoose from "mongoose";

const phoneSchema = new mongoose.Schema({
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    modelName: {
        type: String,
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    mfgYear: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export default mongoose.model("phones", phoneSchema);
