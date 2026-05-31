const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    fromAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account',
        required: [true, "From Account is required for creating a transaction"],
        index: true
    },
    toAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account',
        required: [true, "From Account is required for creating a transaction"],
        index: true
    },
    status:{
        type: String,
        enum:{
            values: ["PENDING", "COMPLETED", "FAILED","REVERSED"],
            message: "Status should be either PENDING, COMPLETED, REVERSED or FAILED",
        },
        default: "PENDING"
    },
    amount: {
        type: Number,
        required: [true, "Amount is required for creating a transaction"],
        min: [0.01, "Amount should be greater than 0"]
    },
    idempotencyKey: {
        type: String,
        required: [true, "Idempotency Key is required for creating a transaction"],
        index: true,
        unique: true
    }
},{
    timestamps:true
})

const transactionModel = mongoose.model("transaction", transactionSchema)

module.exports = transactionModel