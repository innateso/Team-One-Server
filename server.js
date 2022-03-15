const express = require("express");
const cors = require("cors");
const Artists = require("./models/artists");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./connection");
app.use(cors());
const router = express.Router();
app.use("/api", router);

////////////////////////ALL ROUTES
app.get("/", function (req, res) {
  res.send("<h1>Your espresso is ready...lynn</h1>");
});
router.get("/all", function (req, res) {
  Artists.find({ firstName: { $nin: [null, ""] } })
    .select("firstName lastName coverImage")
    .then((response) => {
      // Artists.find().then((response) => {
      res.json(response);
      console.log("view-all");
    });
});

router.get("/view-artists", function (req, res) {
  Artists.find().then((response) => {
    res.json(response);
    console.log("view-artists");
  });
});

router.get("/view-artist-by-id/:id", function (req, res) {
  Artists.findOne({ _id: req.params.id }).then((response) => {
    res.json(response);
  });
});

router.delete("/delete-artist-by-id/:id", function (req, res) {
  Artists.deleteOne({ _id: req.params.id }).then((response) => {
    res.json(response);
  });
});

// CREATE new artist
router.post("/create-artist", function (req, res) {
  var newArtist = new Artists();
  var theFormData = req.body;
  console.log(">>> ", theFormData);

  Object.assign(newArtist, theFormData);

  newArtist.save().then((response) => {
    return res.json(response);
  });
});

// end CREATE new writer

router.get("/view-artist-by-firstname/:name", function (req, res) {
  // console.log(req.params.name);

  Artists.findOne({ firstname: req.params.name }).then((response) => {
    res.json(response);
  });
});

router.get("/scientists", function (req, res) {
  res.json([
    {
      name: "Albert Einstein",
      date: "14/03/1879",
      url: "https://en.wikipedia.org/wiki/Albert_Einstein",
    },
    {
      name: "Benjamin Franklin",
      date: "17/01/1706",
      url: "https://en.wikipedia.org/wiki/Benjamin_Franklin",
    },
    {
      name: "Ada Lovelace",
      date: "10/12/1815",
      url: "https://en.wikipedia.org/wiki/Ada_Lovelace",
    },
    {
      name: "Rita Levi-Montalcini",
      date: "22/04/1909",
      url: "https://en.wikipedia.org/wiki/Rita_Levi-Montalcini",
    },
    {
      name: "Marie Curie",
      date: "07/11/1867",
      url: "https://en.wikipedia.org/wiki/Marie_Curie",
    },
  ]);
});

// catch bad endpoints on the api route only

router.get("/*", (req, res) => {
  return res.json({ result: "hey, no hacking please...." });
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Phew!, listening on port ${PORT}`);
});
