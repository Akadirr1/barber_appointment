const searchbtn = document.getElementById('searchbtn')
searchbtn.addEventListener("click", searchmovie)
document.addEventListener("DOMContentLoaded", function () {
	// Ana sayfa yüklenme fonksiyonları
	const currentPathname = window.location.pathname;

	addYearButtons();
	if (currentPathname === '/local/' || currentPathname.endsWith('/index.html')) {
		carousel1();
		carousel2();
		popularPage();
	}
	// Ana sayfaya dön butonu
});
function searchmovie() {
	const searchQuery = document.getElementById("search").value.trim();
	console.log(searchQuery);
	window.location.href = 'search.html?search=' + searchQuery;

	if (!searchQuery) return;

	const encodedUrl = encodeURIComponent(searchQuery);

	//showPage('search-page')

	// Loading göstergesi ekle
	const resultsContainer = document.getElementById("searchResults");
	resultsContainer.innerHTML = '<div class="spinner-border text-light" role="status"><span class="visually-hidden">Loading...</span></div>';

	fetch(`http://127.0.0.1:5500/search?query=${encodedUrl}`)
		.then(res => res.json())
		.then(data => {
			console.log(data)
			displaySearchResults(data);
		})
		.catch(error => {
			console.error('Hata:', error)
			document.getElementById("searchResults").innerHTML = '<div class="alert alert-danger">Arama sırasında bir hata oluştu!</div>';

		});

}
function selectMovie(movieId) {
	// Loading göstergesi ekle
	//const filmResults = document.getElementById("filmResults");
	//filmResults.innerHTML = '<div class="spinner-border text-light" role="status"><span class="visually-hidden">Loading...</span></div>';

	// Film detay sayfasını göster
	window.location.href = 'detail.html?id=' + movieId;
	// Film detaylarını API'den çek

}
//function displaySearchResults(data) {
//	const resultsContainer = document.getElementById("searchResults") || document.createElement("div");
//	resultsContainer.id = "searchResults";
//	resultsContainer.innerHTML = ""; // Önceki sonuçları temizle

//	if (data.results && data.results.length > 0) {
//		data.results.forEach(movie => {
//			const movieCard = document.createElement("div");
//			movieCard.classList.add("movie-card");

//			movieCard.innerHTML = `
//                <img src="https://image.tmdb.org/t/p/w200${movie.poster_path || '/no-image.png'}" alt="${movie.title}">
//                <h3>${movie.title}</h3>
//                <p>Rating: ${movie.vote_average}/10</p>
//            `;
//			movieCard.addEventListener('click', function () {
//				selectMovie(movie.id);
//			});
//			resultsContainer.appendChild(movieCard);
//		});
//	} else {
//		resultsContainer.innerHTML = "<p>Arama sonucu bulunamadı</p>";
//	}

//	// Container'a ekle
//	//const container = document.querySelector(".container") || document.body;
//	//container.appendChild(resultsContainer);
//}
//function displayFilmResults(data) {
//	const resultsContainer = document.getElementById("filmResults");
//	resultsContainer.innerHTML = ""; // Önceki sonuçları temizle

//	if (!data) {
//		resultsContainer.innerHTML = "<p>Film bilgileri bulunamadı.</p>";
//		return;
//	}

//	// Film detay kartı oluştur
//	const detailCard = document.createElement("div");
//	detailCard.classList.add("movie-detail-card");

//	// Daha fazla film bilgisi ekleyebilirsiniz
//	detailCard.innerHTML = `
//        <div class="movie-detail-poster">
//            <img src="https://image.tmdb.org/t/p/w500${data.poster_path || '/no-image.png'}" alt="${data.title}">
//        </div>
//        <div class="movie-detail-info">
//            <h1>${data.title}</h1>
//            <div class="movie-meta">
//                <span class="movie-rating">${data.vote_average.toFixed(1)}/10</span>
//                <span class="movie-year">${data.release_date ? data.release_date.substring(0, 4) : 'N/A'}</span>
//                <span class="movie-runtime">${data.runtime || 'N/A'} dakika</span>
//            </div>
//            <div class="movie-genres">
//                ${data.genres ? data.genres.map(genre => `<span class="genre">${genre.name}</span>`).join('') : ''}
//            </div>
//            <div class="movie-overview">
//                <h3>Özet</h3>
//                <p>${data.overview || 'Bu film için özet bulunmuyor.'}</p>
//            </div>
//            <div class="movie-additional">
//                <p><strong>Orijinal Başlık:</strong> ${data.original_title}</p>
//                <p><strong>Popülerlik:</strong> ${data.popularity}</p>
//                <p><strong>Durum:</strong> ${data.status}</p>
//                <p><strong>Bütçe:</strong> $${data.budget ? (data.budget / 1000000).toFixed(1) + ' milyon' : 'Bilinmiyor'}</p>
//                <p><strong>Hasılat:</strong> $${data.revenue ? (data.revenue / 1000000).toFixed(1) + ' milyon' : 'Bilinmiyor'}</p>
//            </div>
//        </div>
//    `;

//	resultsContainer.appendChild(detailCard);
//}
function showPage(pageId) {
	document.querySelectorAll(".page").forEach(page => {
		page.classList.remove('active')
	});

	document.getElementById(pageId).classList.add("active");
}
function carousel1() {
	fetch("http://127.0.0.1:5500/popular")
		.then(res => res.json())
		.then(data => {
			console.log(data);
			const carousel_example = document.getElementById('carouselExampleCaptions')
			const carousel_indicators = document.querySelector('.carousel-indicators')
			const carousel = document.querySelector('.carousel-inner');
			const movie = data.results;
			let slideIndex = 0;
			movie.forEach((film, index) => {
				if (index % 2 == 0) {
					const indicator = document.createElement('button')
					indicator.setAttribute("type", "button");
					indicator.setAttribute("data-bs-target", "#carouselExampleCaptions");
					indicator.setAttribute("data-bs-slide-to", `${slideIndex}`);
					indicator.setAttribute("aria-label", `Slide ${slideIndex}`);
					const item = document.createElement('div');
					item.classList.add('carousel-item');
					if (index === 0) {
						item.classList.add('active');
						indicator.classList.add('active');
						indicator.setAttribute("aria-current", "true");

					}
					const img = document.createElement('img');
					img.setAttribute("src", `https://image.tmdb.org/t/p/w500/${film.backdrop_path}`)
					img.classList.add('d-block')
					img.classList.add('w-100')

					const carousel_caption = document.createElement('div');
					carousel_caption.classList.add('carousel-caption')
					carousel_caption.classList.add('d-none')
					carousel_caption.classList.add('d-md-block')
					carousel_caption.innerHTML = `
				<h6>${film.title}</h6>
				`
					item.appendChild(carousel_caption);
					carousel_indicators.appendChild(indicator);
					item.appendChild(img);
					carousel.appendChild(item);
					slideIndex++;

				}
			});

			const carouselInstance = new bootstrap.Carousel(carousel_example, {
				interval: 2000,  // 2 saniyede bir değişsin
				wrap: true,      // Son slayttan sonra başa dönsün
				keyboard: true,
				ride: 'carousel' // Otomatik hareketi açıkça belirttik

			})
		})
		.catch(error => console.error('Hata:', error));


}
function carousel2() {
	fetch("http://127.0.0.1:5500/popular")
		.then(res => res.json())
		.then(data => {
			console.log(data);
			const carousel_example1 = document.getElementById('carouselExampleCaptions1')
			const carousel_indicators = carousel_example1.querySelector('.carousel-indicators')
			const carousel = carousel_example1.querySelector('.carousel-inner');
			const movie = data.results;
			let slideIndex1 = 0;
			movie.forEach((film, index) => {
				if (index % 2 != 0) {
					const indicator = document.createElement('button')
					indicator.setAttribute("type", "button");
					indicator.setAttribute("data-bs-target", "#carouselExampleCaptions1");
					indicator.setAttribute("data-bs-slide-to", `${slideIndex1}`);
					indicator.setAttribute("aria-label", `Slide ${slideIndex1}`);
					const item = document.createElement('div');
					item.classList.add('carousel-item');
					if (slideIndex1 === 0) {
						item.classList.add('active');
						indicator.classList.add('active');
						indicator.setAttribute("aria-current", "true");

					}
					const img = document.createElement('img');
					img.setAttribute("src", `https://image.tmdb.org/t/p/w500/${film.backdrop_path}`)
					img.classList.add('d-block')
					img.classList.add('w-100')

					const carousel_caption = document.createElement('div');
					carousel_caption.classList.add('carousel-caption')
					carousel_caption.classList.add('d-none')
					carousel_caption.classList.add('d-md-block')
					carousel_caption.innerHTML = `
				<h6>${film.title}</h6>
				`
					item.appendChild(carousel_caption);
					carousel_indicators.appendChild(indicator);
					item.appendChild(img);
					carousel.appendChild(item);
					slideIndex1++;
				}
			});

			const carouselInstance = new bootstrap.Carousel(carousel_example1, {
				interval: 2000,  // 2 saniyede bir değişsin
				wrap: true,      // Son slayttan sonra başa dönsün
				keyboard: true,
				ride: 'carousel' // Otomatik hareketi açıkça belirttik

			})
		})
		.catch(error => console.error('Hata:', error));


}
function popularPage() {
	fetch("http://127.0.0.1:5500/popular")
		.then(res => res.json())
		.then(data => {
			const movie = data.results;
			console.log(movie)
			movie.forEach((film, index) => {
				if (index < 18) {
					const populardiv = document.querySelector(".popular");
					const card = document.createElement("div");

					// Link yerine tıklama olayı kullanıyoruz
					card.classList.add("card")
					card.classList.add("text-bg-dark")

					// Film ID'sini veri özelliği olarak ekliyoruz
					card.dataset.movieId = film.id;

					// Karta tıklama olayı ekliyoruz
					card.addEventListener('click', function () {
						selectMovie(film.id);
					});

					const img = document.createElement("img");
					img.classList.add("card-img");
					img.setAttribute("src", `https://image.tmdb.org/t/p/w500/${film.poster_path}`);

					const card_img_overlay = document.createElement("div");
					card_img_overlay.classList.add("card-img-overlay");

					card_img_overlay.innerHTML = `
                        <h6 class="card-title">${film.title}</h6>
                        <p class="card-text">${film.vote_average.toFixed(1)}</br>puan</p>
                    `

					card.appendChild(img);
					card.appendChild(card_img_overlay);
					populardiv.appendChild(card);
				}
			})
		})
}
function addYearButtons() {
	const currentYear = new Date().getFullYear();
	const yearButtons = document.getElementById("year-buttons");
	for (let year = currentYear; year >= 2000; year--) {
		const yearButton = document.createElement("button");
		yearButton.classList.add("btn");
		yearButton.classList.add("btn-link");

		yearButton.textContent = year;

		yearButton.addEventListener('click', () => {
			fetch
		})
		yearButtons.appendChild(yearButton);
	}
}