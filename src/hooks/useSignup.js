import React from 'react';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function useSignup () {
  
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    let signUp = async (email, password) => {
        try {
            setLoading(true);
            let res = await createUserWithEmailAndPassword(auth, email, password);
            setError(false);
            return res.user;
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }
    
    return { error, loading, signUp };
}
