import { GenreProvider } from './context/GenreContext';
import { Fragment, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'swiper/scss';

import './App.css';
import Main from '~/components/layout/Main';
import ProfilePageMain from './components/layout/ProfilePageMain';
import Banner from './components/banner/Banner';
import { AuthProvider } from './context/AuthContext';
import { PersonalProvider } from './context/PersonalContext';

import NotFoundPage from './pages/NotFoundPage';
import MovieSearchPage from './pages/Movies/MovieSearchPage';
import SignUpPage from './pages/SignUp';
import UserProfile from './pages/UserProfile';
import ChangePassword from './pages/ChangePassword';
import History from './pages/History';
import Bookmark from './pages/BookMark';

const HomePage = lazy(() => import('~/pages/Home'));
const MoviePage = lazy(() => import('~/pages/Movies/MoviePage'));
const MovieDetailPage = lazy(() => import('~/pages/Movies/MovieDetailPage'));
const GenresSearchPage = lazy(() => import('~/pages/GenresSearchPage'));

function App() {
    return (
        <Fragment>
            <Suspense>
                <AuthProvider>
                    <PersonalProvider>
                        <GenreProvider>
                            <Routes>
                                <Route element={<Main></Main>}>
                                    <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
                                    <Route
                                        path="/"
                                        element={
                                            <Fragment>
                                                <Banner></Banner>
                                                <HomePage></HomePage>
                                            </Fragment>
                                        }
                                    ></Route>
                                    <Route path="/movies&page=:page" element={<MoviePage></MoviePage>}></Route>
                                    <Route
                                        path="/movies/:movieId"
                                        element={<MovieDetailPage></MovieDetailPage>}
                                    ></Route>
                                    <Route
                                        path="/movies/page=:page&search=:movieName"
                                        element={<MovieSearchPage></MovieSearchPage>}
                                    ></Route>
                                    <Route
                                        path="/movies/page=:page&searchGenre=:genre&type=:type"
                                        element={<GenresSearchPage></GenresSearchPage>}
                                    ></Route>
                                    <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
                                    <Route path="/account" element={<ProfilePageMain></ProfilePageMain>}>
                                        <Route path="/account/general" element={<UserProfile></UserProfile>}></Route>
                                        <Route
                                            path="/account/password"
                                            element={<ChangePassword></ChangePassword>}
                                        ></Route>
                                        <Route path="/account/history" element={<History></History>}></Route>
                                        <Route path="/account/bookmark" element={<Bookmark></Bookmark>}></Route>
                                    </Route>
                                </Route>
                            </Routes>
                        </GenreProvider>
                    </PersonalProvider>
                </AuthProvider>
            </Suspense>
        </Fragment>
    );
}

export default App;
