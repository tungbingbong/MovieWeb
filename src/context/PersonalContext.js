/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';

import { tmdb } from '~/config';
import { auth, db } from '~/firebase-config';

const PersonalContext = createContext();
function PersonalProvider(props) {
    const [bookmark, setBookMark] = useState([]);
    const [history, setHistory] = useState([]);
    const [currentId, setCurrentId] = useState('');
    const [moviesHistory, setMoviesHistory] = useState([]);

    const value = {
        bookmark,
        setBookMark,
        history,
        setHistory,
        currentId,
        setCurrentId,
        moviesHistory,
        setMoviesHistory,
    };
    useEffect(() => {
        const arr = [];
        history.forEach((item) => {
            axios.get(tmdb.getMovieDetails(item, null)).then((res) => {
                arr.push(res.data);
                setMoviesHistory([...arr]);
            });
        });
    }, [history]);
    const userList = collection(db, 'users');
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const uid = currentUser.uid;
                onSnapshot(userList, (snapshot) => {
                    const result = snapshot.docs.forEach((doc) => {
                        if (doc.data().uid === uid) {
                            setHistory(JSON.parse(doc.data().history));
                            setBookMark(JSON.parse(doc.data().bookmark));
                            setCurrentId(doc.id);
                        }
                    });
                    return result;
                });
            }
        });
    }, []);
    return <PersonalContext.Provider {...props} value={value}></PersonalContext.Provider>;
}

function usePersonal() {
    const context = useContext(PersonalContext);
    if (context === 'undefined') {
        throw new Error('usePersonal must be used in PersonalProvider');
    }
    return context;
}

export { PersonalProvider, usePersonal };
