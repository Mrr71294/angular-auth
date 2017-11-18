const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    username:{
      type: String,
      require: [true, "Username is required"]
    },
    password: {
      type: String,
      required: [true, "Password id required"]
    }
  },
  {
    timestamps:{
      createdAt: "dataAdded",
      updatedAt: "datedUpdated"
    }
  }
);



const User = mongoose.model("User", userSchema);








module.exports = User;
