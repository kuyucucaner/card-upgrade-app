// models/Card.ts

import mongoose, { Schema } from "mongoose";

const CardSchema = new Schema({
userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: {type : String , default : "Zümrüt Kehanet"},
  level: { type: Number, default: 1 , max: 3 , min:1},
  progress: { type: Number, default: 0 , min:0 , max:100},
}, { timestamps: true });

export default mongoose.models.Card || mongoose.model("Card", CardSchema);
