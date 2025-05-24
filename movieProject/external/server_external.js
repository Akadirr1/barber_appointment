const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config({ path: '.env' });//vmde çalışmazsa yolu düzenle kanks!
const app = express();

const corsOptions = {
	// Hem www'li hem de www'siz haline izin ver
	origin: ['https://koufrontend.com', 'https://www.koufrontend.com']
};

app.use(cors(corsOptions));
app.use(express.json());

const TMDB_API = process.env.API_KEY;

app.get('/', (req, res) => {
	console.log("sunucu çalışmış la");
	res.send('API Sunucusu Çalışıyor! 🚀');
});

app.get("/popular", async (req, res) => {
	console.log("--- '/popular' endpoint'ine yeni bir istek geldi. ---");
	try {
		const apiKey = TMDB_API;

		// API anahtarının yüklenip yüklenmediğini kontrol et ve logla
		console.log("Kullanılan API Anahtarı yüklendi mi?:", apiKey ? "EVET" : "HAYIR - UNDEFINED!");

		if (!apiKey) {
			// Eğer API anahtarı yoksa, sunucuyu çökertmeden hata mesajı döndür.
			console.error("KRİTİK HATA: TMDB_API_KEY ortam değişkeni bulunamadı!");
			return res.status(500).json({ error: "Sunucu yapılandırma hatası: API anahtarı eksik." });
		}

		const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=tr-US`);

		// TMDB'den gelen cevabın başarılı olup olmadığını kontrol et
		if (!response.ok) {
			console.error("TMDB API'sinden Hatalı Cevap:", response.status, response.statusText);
			const errorBody = await response.text();
			console.error("TMDB Hata Detayı:", errorBody);
			return res.status(response.status).json({ error: "Film verileri alınırken bir hata oluştu." });
		}

		const data = await response.json();
		console.log("TMDB'den veri başarıyla alındı ve istemciye gönderiliyor.");
		res.json(data);

	} catch (error) {
		// Fetch sırasında veya başka bir yerde oluşan kritik hataları yakala
		console.error("'/popular' BLOĞUNDA BEKLENMEDİK KRİTİK HATA:", error);
		res.status(500).json({ error: "Sunucuda beklenmedik bir hata oluştu." });
	}
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
		const responsse = await fetch(`https://api.themoviedb.org/3/movie/?api_key=${TMDB_API}`)
	}
	catch (err) {
		console.error("API Hatası:", error);
		res.status(500).json({ error: "Film detayları alınırken bir hata oluştu" });
	}
})
const PORT = 3000;

app.listen(PORT, '0.0.0.0', () => {
	console.log(`Sunucu http://localhost:${PORT} adresinde başlatıldı.`);
});