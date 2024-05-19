import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTY1NDU3NThiNGQ0MTc5MGE2YjljY2Q2MjA5OGI1MiIsInN1YiI6IjY2NDg0NzU2ZjYwZmZlZWVmMjkyNTE5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0yACyUsdBqCkkL8yghlrumVvgklONh_cIhOCt40JUZA'; // Replace with your actual TMDB API key

const api = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
});

export default api;
