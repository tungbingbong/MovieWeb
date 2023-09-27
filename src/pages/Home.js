import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import MovieList from '~/components/movieList/movieList';
import SeriesList from '~/components/movieList/SeriesList';
import PersonalList from '~/components/movieList/PersonalList';

const Homepage = () => {
    const userInfo = useSelector((state) => state.auth.userInfo);
    const { currentType } = useSelector((state) => state.type);
    return (
        <Fragment>
            <section className="container flex flex-col gap-y-5 text-white mb-10">
                <div className="flex justify-between w-full">
                    <span className="text-[20px]">Now Playing</span>
                </div>
                {currentType === 'Movies' ? (
                    <MovieList type={'now_playing'}></MovieList>
                ) : (
                    <SeriesList type={'airing_today'}></SeriesList>
                )}
            </section>

            <section className="container flex flex-col gap-y-5 text-white mb-10">
                <div className="flex justify-between w-full">
                    <span className="text-[20px]">Top Rated</span>
                </div>
                {currentType === 'Movies' ? (
                    <MovieList type={'top_rated'}></MovieList>
                ) : (
                    <SeriesList type={'top_rated'}></SeriesList>
                )}
            </section>

            <section className="container flex flex-col gap-y-5 text-white mb-10">
                <div className="flex justify-between w-full">
                    <span className="text-[20px]">{currentType === 'Movies' ? 'Upcoming' : 'Latest'}</span>
                </div>
                {currentType === 'Movies' ? (
                    <MovieList type={'upcoming'}></MovieList>
                ) : (
                    <SeriesList type={'on_the_air'}></SeriesList>
                )}
            </section>

            {userInfo && (
                <section className="container flex flex-col gap-y-5 text-white mb-10">
                    <div className="flex justify-between w-full">
                        <span className="text-[20px]">History</span>
                    </div>
                    <PersonalList type={'history'}></PersonalList>
                </section>
            )}

            {userInfo && (
                <section className="container flex flex-col gap-y-5 text-white mb-10">
                    <div className="flex justify-between w-full">
                        <span className="text-[20px]">Bookmark</span>
                    </div>
                    <PersonalList type={'bookmark'}></PersonalList>
                </section>
            )}
        </Fragment>
    );
};

export default Homepage;
