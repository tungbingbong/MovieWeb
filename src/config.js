export const fetcher = (...args) => fetch(...args).then((res) => res.json());

const endpointMovie = 'https://api.themoviedb.org/3/movie';
const searchEndpoint =
    'https://api.themoviedb.org/3/search/movie?api_key=68ff44b16c8cfc514f5219295b422d75&language=en-US';
const apiKey = '68ff44b16c8cfc514f5219295b422d75';

export const tmdb = {
    getMovieList: (type, page = 1) => `${endpointMovie}/${type}?api_key=${apiKey}&language=en-US&page=${page}`,
    getMovieDetails: (id, detail) =>
        `${endpointMovie}/${id}${detail ? `/${detail}` : ''}?api_key=${apiKey}&language=en-US`,
    getMovieSearchPage: (query, page = 1) => `${searchEndpoint}&query=${query}&page=${page}`,
    getMovieGenre: (type = 'movie') =>
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=${apiKey}&language=en-US`,
    getMovieGenreList: (genre, page) =>
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&page=${page}`,
};
