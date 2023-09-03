import React from 'react';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function useSignout () {
  
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    let logOut = async () => {
        try {
            setLoading(true);
            let res = await signOut(auth);
            setError(false);
            return res.user;
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }
    
    return { error, loading, logOut };
}
