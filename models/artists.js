const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArtistsSchema = new Schema({
  firstname: String,
  lastname: String,
  description: String,
  image: String,
});

// singular capitalized name for the mongo collection - artists
const Artist = mongoose.model("Artist", ArtistsSchema);

module.exports = Artist;
