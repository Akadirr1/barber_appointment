const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config({ path: '.env' });
const app = express();
const TMDB_API = process.env.API_KEY;

app.use(cors());

app.get("/popular", async (req, res) => {
	const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API}&language=tr-US&`);
	const data = await response.json();
	res.json(data);
});
app.get("/search", async (req, res) => {
	const searchquery = req.query.query;
	const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API}&query=${searchquery}`);
	const data = await response.json();
	res.json(data);
})
app.get("/movie/:id", async (req, res) => {
	const movieId = req.params.id;

	try {
		const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API}`);
		const data = await response.json();
		res.json(data);
	} catch (error) {
		console.error("API Hatası:", error);
		res.status(500).json({ error: "Film detayları alınırken bir hata oluştu" });
	}
});
app.get("/search/:year", async (req, res) => {
	const year = req.params.year;
	try {
		const responsse = await fetch(`https://api.themoviedb.org/3/movie/ ?api_key=${TMDB_API}`)
	}
	catch (err) {
		console.error("API Hatası:", error);
		res.status(500).json({ error: "Film detayları alınırken bir hata oluştu" });
	}
})
app.listen("5500", () => {
	console.log("server is running port : 5500")
})