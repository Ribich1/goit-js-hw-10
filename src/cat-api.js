const URL = "https://api.thecatapi.com/v1/breeds";
const API_KEY = "live_fNsbAds8lDJ3wZ0Q6Rd2N00xNBqkZr6YfEu789dp5u3ygpeUPzSw2uVkbGt7frFj";


function fetchBreeds() {
    return fetch(`${URL}?api_key=${API_KEY}`).then((res) => res.json());
}

// fetchBreeds().then(result => console.log(result));
export { fetchBreeds };
