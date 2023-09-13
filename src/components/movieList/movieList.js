import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import useGetMovies from '~/hooks/useGetMovies';
import MovieCard, { MovieCardLoading } from '../movieCard/movieCard';
import { SlideNextButton, SlidePrevButton } from '../button/SlideButton';

const MovieList = ({ type }) => {
    const movies = useGetMovies({ type });
    const isLoading = !movies || movies.length < 1;

    return (
        <div className="w-full movie-list relative">
            {isLoading && (
                <Swiper grabCursor={'true'} spaceBetween={50} slidesPerView={'auto'}>
                    <SwiperSlide>
                        <MovieCardLoading></MovieCardLoading>
                    </SwiperSlide>
                    <SwiperSlide>
                        <MovieCardLoading></MovieCardLoading>
                    </SwiperSlide>
                    <SwiperSlide>
                        <MovieCardLoading></MovieCardLoading>
                    </SwiperSlide>
                    <SwiperSlide>
                        <MovieCardLoading></MovieCardLoading>
                    </SwiperSlide>
                    <SwiperSlide>
                        <MovieCardLoading></MovieCardLoading>
                    </SwiperSlide>
                    <SwiperSlide>
                        <MovieCardLoading></MovieCardLoading>
                    </SwiperSlide>
                </Swiper>
            )}
            <Swiper grabCursor={'true'} spaceBetween={20} slidesPerView={`auto`}>
                <SlideNextButton></SlideNextButton>
                <SlidePrevButton></SlidePrevButton>
                {movies?.results?.length > 0 &&
                    movies?.results?.map((item) => (
                        <SwiperSlide key={item.id}>
                            <MovieCard
                                item={item}
                                id={item.id}
                                name={item.title || item.name}
                                src={item.poster_path}
                                vote={item.vote_average}
                                release={item.release_date || item.first_air_date}
                            ></MovieCard>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
};

export default MovieList;
