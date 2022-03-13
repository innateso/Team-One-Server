const express = require('express');

const cors = require('cors');

const Artists = require('./models/artists');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// leave until later

require('./connection');

app.use(cors());

// app to use api routes

const router = express.Router();

app.use('/api', router);

////////////////////////ALL ROUTES

router.get('/view-artists', function (req, res) {
	Artists.find().then((response) => {
		res.json(response);
	});
});

router.get('/view-artist-by-id/:id', function (req, res) {
	Artists.findOne({ _id: req.params.id }).then((response) => {
		res.json(response);
	});
});

router.delete('/delete-artist-by-id/:id', function (req, res) {
	Artists.deleteOne({ _id: req.params.id }).then((response) => {
		res.json(response);
	});
});

// CREATE new artist
router.post('/create-artist', function (req, res) {
	var newArtist = new Artists();
	var theFormData = req.body;
	console.log('>>> ', theFormData);

	Object.assign(newArtist, theFormData);

	newArtist.save().then((response) => {
		return res.json(response);
	});
});

// end CREATE new writer

router.get('/view-artist-by-firstname/:name', function (req, res) {
	// console.log(req.params.name);

	Artists.findOne({ firstname: req.params.name }).then((response) => {
		res.json(response);
	});
});

// catch bad endpoints on the api route only

router.get('/*', (req, res) => {
	return res.json({ result: 'hey, no hacking please....' });
});

const PORT = 4000;

app.listen(PORT, () => {
	console.log(`Phew!, listening on port ${PORT}`);
});