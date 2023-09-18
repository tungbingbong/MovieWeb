import React from 'react';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import { tmdb } from '~/config';

import MovieCard, { MovieCardLoading } from '~/components/movieCard/movieCard';
import Pagination from '~/components/pagination/Pagination';
import useGetMovies from '~/hooks/useGetMovies';

const MoviePage = () => {
    const page = useParams().page;
    const movies = useGetMovies(tmdb.getMovieList('popular', page));
    const loading = !movies;

    return (
        <>
            {loading ? (
                <div className="w-full h-auto text-white flex flex-wrap flex-row md:gap-7 gap-3 justify-center">
                    {new Array(20).fill(0).map(() => (
                        <div className="md:w-[300px] w-[45%] flex-shrink-0" key={v4()}>
                            <MovieCardLoading></MovieCardLoading>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <div className="w-full h-auto text-white flex flex-wrap flex-row gap-y-7 gap-x-7 justify-center">
                        {movies?.results?.length > 0 &&
                            movies?.results?.map((item) => (
                                <div className="w-[300px]" key={item.id}>
                                    <MovieCard
                                        name={item.title || item.name}
                                        src={item.poster_path}
                                        vote={item.vote_average}
                                        release={item.release_date || item.first_air_date}
                                        id={item.id}
                                        item={item}
                                    ></MovieCard>
                                </div>
                            ))}
                    </div>
                    <Pagination page={page} searchAPI={movies}></Pagination>
                </>
            )}
        </>
    );
};

export default MoviePage;
