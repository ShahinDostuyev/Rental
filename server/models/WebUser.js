const { default: mongoose, Schema } = require("mongoose");

const WebUserSchema = new Schema({
  email: String,
  password: String,
  name: String,
  username: String,
  code: String,
  codeExpire: Date,
  ownedCars: {
    type: [{ type: Schema.Types.ObjectId, ref: "Car" }],
    default: [],
  },
  isActive: {
    type: Boolean,
    default: false,
  },

  codeCounter: {
    type: Number,
    default: 3,
  },
  forgetToken: String,
});

const WebUser = mongoose.model("WebUser", WebUserSchema);

module.exports = {
  WebUser,
};
