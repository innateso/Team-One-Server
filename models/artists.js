const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArtistsSchema = new Schema({
  firstName: String,
  lastName: String,
  coverImage: String,
  description: String,
  coverTitle: String,
  DateOfBirth: String,
  DateOfDeath: String,
});

// singular capitalized name for the mongo collection - artists
const Artist = mongoose.model("Artist", ArtistsSchema);

module.exports = Artist;
