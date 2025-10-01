import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    correctGuesses: {  
        type: Number,
        default: 0
    },
    totalGuesses: {
        type: Number,
        default: 0
    },
});

const User = mongoose.model("User", userSchema);
export {User};