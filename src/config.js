export const fetcher = (...args) => fetch(...args).then((res) => res.json());

const endpointMovie = 'https://api.themoviedb.org/3/movie';
const searchEndpoint =
    'https://api.themoviedb.org/3/search/movie?api_key=68ff44b16c8cfc514f5219295b422d75&language=en-US';
const apiKey = '68ff44b16c8cfc514f5219295b422d75';

export const tmdb = {
    getMovieList: (type, page) => `${endpointMovie}/${type}?api_key=${apiKey}&language=en-US&page=${page ? page : 1}`,
    getMovieDetails: (id, detail) =>
        `${endpointMovie}/${id}${detail ? `/${detail}` : ''}?api_key=${apiKey}&language=en-US`,
    getMovieSearchPage: (query, page) => `${searchEndpoint}&page=${page}&query=${query}`,
    getMovieGenre: () => `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`,
    getMovieGenreList: (genre, page) =>
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&page=${page}`,
};
