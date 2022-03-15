const mongoose = require("mongoose");

// start editable
// as defined in 'Database Access' on Atlas/Mongo

const dbname = "artistcollection";//or "Formativetwo"
const username = "yoobeeteamone";
const password = "yoobeeteamone";

// with backticks
const url = `mongodb+srv://${username}:${password}@formativetwo.kyx6g.mongodb.net/${dbname}?retryWrites=true&w=majority`;

// end editable

// connection start

mongoose.connect(url, {
  useNewUrlParser: true,

  useUnifiedTopology: true,
});

// feedback to let us know we succeeded

mongoose.connection.on("connected", (err, res) => {
  console.log("Success! Connected to MongoDB");
});

// let us know we failed

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to MongoDB ", err);
});

// end connection code
