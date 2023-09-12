import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import Genres from '~/components/genresSelector/Genres';
import SearchBar from './Searchbar';

const list = [
    {
        id: 1,
        title: 'Home',
        to: '/',
    },
    {
        id: 2,
        title: 'Movies',
        to: '/movies&page=1',
    },
];

const Header = () => {
    return (
        <Fragment>
            <div className="z-[200] flex flex-row justify-between px-10 py-5 bg-slate-900 items-center relative rounded-lg bg-opacity-70">
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
                    <Genres></Genres>
                </div>
                <SearchBar></SearchBar>
            </div>
        </Fragment>
    );
};

export default Header;
