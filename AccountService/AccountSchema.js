const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://yvan:yvan@cluster0-vkamr.mongodb.net/AccountDB?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const accountSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  subscribers: [{userId : String,userEmail : String}]
});

mongoose.connection.once("open", () => {
  console.log("connection started successfully");
});

module.exports = mongoose.model("Account", accountSchema);

//mongodb+srv://yvan:yvan@cluster0-vkamr.mongodb.net/streams?retryWrites=true&w=majority"
//mongodb://localhost:27017/admin