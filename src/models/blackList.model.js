const mongoose = require("mongoose");

const tokenBlacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Token is required for blacklisting"], 
        unique: true,
    },
},{
    timestamps: true
})

tokenBlacklistSchema.index({ createdAt: 1 },{
    expireAfterSeconds: 60 * 60 * 24 * 3 // Tokens will be automatically removed after 3 days
});

const tokenBlackListModel = mongoose.model("tokenBlackList", tokenBlacklistSchema);

module.exports = tokenBlackListModel;