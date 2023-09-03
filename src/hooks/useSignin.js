import React from 'react';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function useSignin () {
  
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    let signIn = async (email, password) => {
        try {
            setLoading(true);
            let res = await signInWithEmailAndPassword(auth, email, password);
            setError(false);
            return res.user;
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }
    
    return { error, loading, signIn };
}
