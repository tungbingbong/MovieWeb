import { combineReducers } from '@reduxjs/toolkit';

import genreSlice from './GenreSlice/genreSlice';
import authSlice from './AuthSlice/authSlice';
import personalSlice from './PersonalSlice/personalSlice';

const reducer = combineReducers({
    genre: genreSlice,
    auth: authSlice,
    personal: personalSlice,
});

export default reducer;
