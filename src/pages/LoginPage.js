/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth, db } from '~/firebase-config';

const LoginPage = () => {
    const docRef = collection(db, 'users');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        addDoc(docRef, {
            userName,
            password,
        }).then(() => console.log('success'));
        const user = await createUserWithEmailAndPassword(auth, userName, password);
        console.log(user);
    };

    const handleInputChange = (name, value) => {
        switch (name) {
            case 'username':
                setUserName(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    };

    const handleDelete = () => {
        const deleteRef = doc(db, 'users', 'uHCw0DioLqTSmR7m8CBv');
        deleteDoc(deleteRef).then(() => console.log('okay'));
    };

    const array = [];
    useEffect(() => {
        getDocs(docRef).then((snapshot) => {
            console.log(snapshot.docs);
            snapshot.docs.forEach((doc) => {
                array.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
        });
    }, []);

    return (
        <div>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your name"
                    onChange={(e) => handleInputChange('username', e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter your password"
                    onChange={(e) => handleInputChange('password', e.target.value)}
                />
                <button onClick={handleSubmit}>Sign Up</button>
            </form>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default LoginPage;
