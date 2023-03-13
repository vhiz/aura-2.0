const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    conversationId: { type: String, required: true },
    sender: { type: String },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("Message", messageSchema);
