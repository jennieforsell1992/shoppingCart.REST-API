const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  cart: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Product",
    default: [],
  },
  totalamount: {
    type: Number,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
