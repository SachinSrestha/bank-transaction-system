const mongoose = require('mongoose');

const ledgerSchema = mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account',
        required: [true, "Account is required for creating a ledger entry"],
        index: true,
        immutable: true
    },
    amount: {
        type: Number,
        required: [true, "Amount is required for creating a ledger entry"],
        immutable: true
    },
    type: {
        type: String,
        enum:{
            values: ["DEBIT", "CREDIT"],
            message: "Type should be either DEBIT or CREDIT",
        },
        required: [true, "Type is required for creating a ledger entry"],
        immutable: true
    },
    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'transaction',
        required: [true, "Transaction is required for creating a ledger entry"],
        index: true,
        immutable: true
    }
},{
    timestamps:true
})

function preventLedgerModification() {
    throw new Error("Ledger entries cannot be modified or deleted")
}

ledgerSchema.pre("findOneAndUpdate", preventLedgerModification)
ledgerSchema.pre("updateOne", preventLedgerModification)
ledgerSchema.pre("deleteOne", preventLedgerModification)
ledgerSchema.pre("findOneAndDelete", preventLedgerModification)
ledgerSchema.pre("findOneAndRemove", preventLedgerModification)
ledgerSchema.pre("remove", preventLedgerModification)
ledgerSchema.pre("updateMany", preventLedgerModification)
ledgerSchema.pre("deleteMany", preventLedgerModification)

const ledgerModel = mongoose.model("ledger", ledgerSchema)

module.exports = ledgerModel;