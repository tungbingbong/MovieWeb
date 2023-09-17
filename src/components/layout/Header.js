import React, { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Genres from '~/components/genresSelector/Genres';
// import { useFilm } from '~/context/FilmContext';
import SearchBar from './Searchbar';

const list = [
    {
        id: 1,
        title: 'Home',
        to: '/',
    },
    {
        id: 2,
        title: 'Explore',
        to: '/movies&page=1',
    },
];

const Header = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Fragment>
            <div className="z-[200] flex md:flex-row flex-col justify-between mb-5 p-5bg-slate-900 items-center relative rounded-lg bg-opacity-70">
                <div className={`header text-white flex items-center justify-center md:gap-7 gap-4 z-[60]`}>
                    {list.map((item) => (
                        <NavLink
                            to={item.to}
                            key={item.id}
                            className={({ isActive }) =>
                                `hover:text-primary transition-all flex items-center ${isActive ? 'text-primary' : ''}`
                            }
                        >
                            {item.title}
                        </NavLink>
                    ))}
                    <Genres isHovered={isHovered} setIsHovered={setIsHovered}></Genres>
                </div>
                <SearchBar></SearchBar>
            </div>
        </Fragment>
    );
};

export default Header;
