import axios from 'axios';
import { EXPO_PUBLIC_API_KEY } from '@env';

// image width url

export const image_w500 = (path) => (path ? `https://image.tmdb.org/t/p/w500${path}  ` : null);
export const image_w342 = (path) => (path ? `https://image.tmdb.org/t/p/w342${path}  ` : null);
export const image_w185 = (path) => (path ? `https://image.tmdb.org/t/p/w185${path}  ` : null);

// endpoints
const apiBaseurl = `https://api.themoviedb.org/3`;
const trendingMovies = `${apiBaseurl}/trending/movie/day?language=en-US&api_key=${EXPO_PUBLIC_API_KEY}`;
// https://api.themoviedb.org/3/trending/all/day?language=en-US
const upComingMovies = `${apiBaseurl}/movie/upcoming?api_key=${EXPO_PUBLIC_API_KEY}`;
const topRatedMovies = `${apiBaseurl}/movie/top_rated?api_key=${EXPO_PUBLIC_API_KEY}`;

//  Dynamic endpoints
const movieDetailsEndPoints = (id) => (id ? `${apiBaseurl}/movie/${id}?api_key=${EXPO_PUBLIC_API_KEY}` : null);
const movieCreditsEndPoints = (id) =>
  id ? `${apiBaseurl}/movie/${id}/credits?language=en-US&api_key=${EXPO_PUBLIC_API_KEY}` : null;
const movieSimilarEndPoints = (id) =>
  id ? `${apiBaseurl}/movie/${id}/similar?language=en-US&api_key=${EXPO_PUBLIC_API_KEY}` : null;
const movieTrailerEndPoints = (id) =>
  id ? `${apiBaseurl}/movie/${id}/videos?language=en-US&api_key=${EXPO_PUBLIC_API_KEY}` : null;

// person details endpoints
const personDetailsEndPoints = (id) =>
  id ? `${apiBaseurl}/person/${id}?language=en-US&api_key=${EXPO_PUBLIC_API_KEY}` : null;
const personMoviesEndPoints = (id) =>
  id ? `${apiBaseurl}/person/${id}/movie_credits?language=en-US&api_key=${EXPO_PUBLIC_API_KEY}` : null;

// search movie endpoints
const searchMovieEndPoints = (params) =>
  params
    ? `${apiBaseurl}/search/multi?query=${params}&include_adult=false&language=en-US&page=1&api_key=${EXPO_PUBLIC_API_KEY}`
    : null;

const apiCall = async (endpoint) => {
  const options = {
    method: 'GET',
    url: endpoint,
  };
  try {
    const response = await axios.request(options);
    return response;
  } catch (error) {
    console.log('error: ', error);
    return {};
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingMovies);
};
export const fetchUpcomingMovies = () => {
  return apiCall(upComingMovies);
};
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMovies);
};
export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndPoints(id));
};
export const fetchCreditsID = (id) => {
  return apiCall(movieCreditsEndPoints(id));
};
export const fetchSimilarMovies = (id) => {
  return apiCall(movieSimilarEndPoints(id));
};
export const fetchPersonDetails = (id) => {
  return apiCall(personDetailsEndPoints(id));
};
export const fetchPersonMovies = (id) => {
  return apiCall(personMoviesEndPoints(id));
};
export const fetchMovieTrailer = (id) => {
  return apiCall(movieTrailerEndPoints(id));
};
export const SearchMovies = (params) => {
  return apiCall(searchMovieEndPoints(params));
};
