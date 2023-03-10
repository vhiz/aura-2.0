const { Schema, model } = require("mongoose");

const conversationSchema = new Schema(
  {
    members: Array,
  },
  { timestamps: true }
);

module.exports = model("Conversation", conversationSchema);
