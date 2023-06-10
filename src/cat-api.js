const URL = "https://api.thecatapi.com/v1/breeds";
const API_KEY = "live_fNsbAds8lDJ3wZ0Q6Rd2N00xNBqkZr6YfEu789dp5u3ygpeUPzSw2uVkbGt7frFj";
const options = { 'x-api-key': API_KEY };
const URL_byId = "https://api.thecatapi.com/v1/images/search";

function fetchBreeds() {
    return fetch(`${URL}?api_key=${API_KEY}`).then((res) => res.json());
}

function getCatImg(breedId) {
    return fetch(`${URL_byId}?breed_id=${breedId}`, options).then(r=>r.json()).then(r => r.map(ar => ar.url)).then(r=>r[0]);
};


function fetchCatByBreed(breedId) {
    return fetch(`https://api.thecatapi.com/v1/breeds/${breedId}`, options).then(r=>r.json());
};




export { fetchBreeds };
export { fetchCatByBreed }; 
export { getCatImg};

