import mongoose,{Schema} from "mongoose";

const gameSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    truths: {
        type: [String],
        required: true,
        validate: {
            validator: arr => arr.length === 2,
            message: "Exactly 2 truth required"
        }
    },
    lie: {
        type: String,
        required: true
    },
    guesses: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Game = mongoose.model("Game",gameSchema);
export {Game};