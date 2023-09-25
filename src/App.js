/* eslint-disable react-hooks/exhaustive-deps */
import 'swiper/scss';
import axios from 'axios';
import { Fragment, lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';
import { tmdb, flexible } from './config';
import Main from '~/components/layout/Main';
import { auth, db } from './firebase-config';
import Banner from './components/banner/Banner';
import { setUserInfo } from './redux/AuthSlice/authSlice';
import ProfilePageMain from './components/layout/ProfilePageMain';
import {
    setBookmarkId,
    setCurrentId,
    setHistory,
    setMoviesBookmarkData,
    setMoviesHistory,
} from './redux/PersonalSlice/personalSlice';
import SeriesBanner from './components/banner/SeriesBanner';
import SeriesSearchPage from './pages/Series/SeriesSearchPage';
import SeriesWatchPage from './pages/Series/SeriesWatchPage';
import { setGenreList } from './redux/GenreSlice/genreSlice';

import NotFoundPage from './pages/NotFoundPage';
import MovieSearchPage from './pages/Movies/MovieSearchPage';
import MovieWatchPage from './pages/Movies/MovieWatchPage';
import SignUpPage from './pages/SignUp';
import UserProfile from './pages/UserProfile';
import ChangePassword from './pages/ChangePassword';
import History from './pages/History';
import Bookmark from './pages/BookMark';

const HomePage = lazy(() => import('~/pages/Home'));
const ExplorePage = lazy(() => import('~/pages/ExplorePage'));
const MovieDetailPage = lazy(() => import('~/pages/Movies/MovieDetailPage'));
const MoviesGenreSearch = lazy(() => import('~/pages/Movies/MovieGenreSearch'));
const SeriesDetailPage = lazy(() => import('~/pages/Series/SeriesDetailPage'));
const SeriesGenreSearch = lazy(() => import('~/pages/Series/SeriesGenreSearch'));

// https://api.themoviedb.org/3/movie/now_playing?api_key=68ff44b16c8cfc514f5219295b422d75&language=en-US&page=1

function App() {
    const dispatch = useDispatch();
    const { history, bookmarkId } = useSelector((state) => state.personal);
    const currentType = useSelector((state) => state.type);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                dispatch(setUserInfo(currentUser));
            } else {
                dispatch(setUserInfo(''));
            }
        });
    }, [dispatch]);

    useEffect(() => {
        const arr = [];
        const bookmarkArr = [];

        history.forEach((item) => {
            axios.get(flexible.getDetails(item.type, item.id)).then((res) => {
                arr.push(res.data);
                dispatch(setMoviesHistory([...arr]));
            });
        });
        bookmarkId.forEach((item) => {
            axios.get(flexible.getDetails(item.type, item.id)).then((res) => {
                bookmarkArr.push(res.data);
                dispatch(setMoviesBookmarkData([...bookmarkArr]));
            });
        });
    }, [history, bookmarkId, dispatch]);

    const userList = collection(db, 'users');

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const uid = currentUser.uid;
                onSnapshot(userList, (snapshot) => {
                    snapshot.forEach((doc) => {
                        if (doc.data().uid === uid) {
                            dispatch(setHistory(JSON.parse(doc.data().history)));
                            dispatch(setBookmarkId(JSON.parse(doc.data().bookmark)));
                            dispatch(setCurrentId(doc.id));
                        }
                    });
                });
            }
        });
    }, []);

    useEffect(() => {
        axios
            .get(tmdb.getTypeGenre(currentType === 'Movies' ? 'movie' : 'tv'))
            .then((res) => dispatch(setGenreList(res.data.genres)));
    }, [currentType]);

    return (
        <Fragment>
            <Suspense>
                <Routes>
                    <Route element={<Main></Main>}>
                        <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
                        <Route
                            path="/"
                            element={
                                <Fragment>
                                    {currentType === 'Movies' ? <Banner></Banner> : <SeriesBanner></SeriesBanner>}
                                    <HomePage></HomePage>
                                </Fragment>
                            }
                        ></Route>
                        <Route path="/explore&page=:page" element={<ExplorePage></ExplorePage>}></Route>
                        <Route path="/movies/:movieId" element={<MovieDetailPage></MovieDetailPage>}></Route>
                        <Route path="/series/:movieId" element={<SeriesDetailPage></SeriesDetailPage>}></Route>
                        <Route path="/movies/:movieId/watch" element={<MovieWatchPage></MovieWatchPage>}></Route>
                        <Route
                            path="/series/:movieId/watch&season=:season&ep=:ep"
                            element={<SeriesWatchPage></SeriesWatchPage>}
                        ></Route>
                        <Route path="/movies/search=:movieName" element={<MovieSearchPage></MovieSearchPage>}></Route>
                        <Route path="/series/search=:movieName" element={<SeriesSearchPage></SeriesSearchPage>}></Route>
                        <Route
                            path="/movies/page=:page&searchGenre=:genre&type=:type"
                            element={<MoviesGenreSearch></MoviesGenreSearch>}
                        ></Route>
                        <Route
                            path="/series/page=:page&searchGenre=:genre&type=:type"
                            element={<SeriesGenreSearch></SeriesGenreSearch>}
                        ></Route>
                        <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
                        <Route path="/account" element={<ProfilePageMain></ProfilePageMain>}>
                            <Route path="/account/general" element={<UserProfile></UserProfile>}></Route>
                            <Route path="/account/password" element={<ChangePassword></ChangePassword>}></Route>
                            <Route path="/account/history" element={<History></History>}></Route>
                            <Route path="/account/bookmark" element={<Bookmark></Bookmark>}></Route>
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
        </Fragment>
    );
}

export default App;
