/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { v4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { tmdb } from '~/config';
import useGetMovies from '~/hooks/useGetMovies';
import { setType } from '~/redux/TypeSlice/typeSlice';
import Pagination from '~/components/pagination/Pagination';
import MovieCard, { MovieCardLoading } from '~/components/movieCard/movieCard';

const MoviesGenreSearch = () => {
    const genre = useParams().genre;
    const page = useParams().page;
    const type = useParams().type;
    const searchAPI = useGetMovies(tmdb.getMovieGenreList(genre, page));
    const loading = !searchAPI;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setType('Movies'));
    }, []);
    return (
        <>
            <span className="text-white text-center text-xl block mb-5">
                Result for <span className="text-primary">{type}</span> film
            </span>
            {loading ? (
                <div className="w-full h-auto text-white flex flex-wrap flex-row gap-y-7 gap-x-7 justify-center">
                    {new Array(20).fill(0).map(() => (
                        <div className="md:w-[300px] w-[45%] flex-shrink-0" key={v4()}>
                            <MovieCardLoading></MovieCardLoading>
                        </div>
                    ))}
                </div>
            ) : searchAPI?.results?.length > 0 ? (
                <>
                    <div className="w-full h-auto text-white flex flex-wrap flex-row md:gap-7 gap-3 justify-center">
                        {searchAPI?.results?.length > 0 &&
                            searchAPI?.results?.map((item) => {
                                if (
                                    item?.title &&
                                    item?.poster_path &&
                                    item?.vote_average &&
                                    item?.release_date &&
                                    item?.id
                                )
                                    return (
                                        <div className="md:max-w-[240px] w-[40%] flex-shrink-0" key={item.id}>
                                            <MovieCard
                                                name={item?.title}
                                                src={item?.poster_path}
                                                vote={item?.vote_average}
                                                release={item?.release_date}
                                                id={item?.id}
                                                item={item}
                                            ></MovieCard>
                                        </div>
                                    );
                            })}
                    </div>

                    <Pagination type={{ id: genre, name: type }} searchAPI={searchAPI} page={page}></Pagination>
                </>
            ) : (
                <span className="text-white text-2xl text-center mt-10 block">There is no result for {genre}</span>
            )}
        </>
    );
};

export default MoviesGenreSearch;
