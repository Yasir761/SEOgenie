
import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  email: { type: String, required: true },
  plan: String,
  amount: Number,
  orderId: String,
  createdAt: Date
});

export const TransactionModel = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
