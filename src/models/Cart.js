const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  cart: {
    type: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],
    default: [],
  },
  totalamount: {
    type: Number,
    require: true,
    default: 0,
  },
});

//ändrade om i totalAmount från type: Number.
module.exports = mongoose.model("Cart", cartSchema);
