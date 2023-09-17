import { GenreProvider } from './context/GenreContext';
import { Fragment, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'swiper/scss';

import './App.css';
import Main from '~/components/layout/Main';
import Banner from './components/banner/Banner';
import { FilmProvider } from './context/FilmContext';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import MovieSearchPage from './pages/Movies/MovieSearchPage';

const HomePage = lazy(() => import('~/pages/Home/Home'));
const MoviePage = lazy(() => import('~/pages/Movies/MoviePage'));
const MovieDetailPage = lazy(() => import('~/pages/Movies/MovieDetailPage'));
const GenresSearchPage = lazy(() => import('~/pages/GenresSearchPage/GenresSearchPage'));

function App() {
    return (
        <Fragment>
            <Suspense>
                <FilmProvider>
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
                                <Route path="/movies/:movieId" element={<MovieDetailPage></MovieDetailPage>}></Route>
                                <Route
                                    path="/movies/page=:page&search=:movieName"
                                    element={<MovieSearchPage></MovieSearchPage>}
                                ></Route>
                                <Route
                                    path="/movies/page=:page&searchGenre=:genre&type=:type"
                                    element={<GenresSearchPage></GenresSearchPage>}
                                ></Route>
                            </Route>
                        </Routes>
                    </GenreProvider>
                </FilmProvider>
            </Suspense>
        </Fragment>
    );
}

export default App;
