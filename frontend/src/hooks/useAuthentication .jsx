// import { useState, useEffect } from 'react';
// import { loggedInAtom } from '../store/atoms/userAtom';
// import { useRecoilState } from 'recoil';


// const useAuthentication = () => {
//     const [loggedIn, setLoggedIn] = useRecoilState(loggedInAtom);
//     const token = localStorage.getItem('token')
//     useEffect(() => {

//       if (token) {
//         setLoggedIn(true)
//       }else { 
//         setLoggedIn(false)
//       }

//     }, [token])

// }

// export default useAuthentication



import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { loggedInAtom } from '../store/atoms/userAtom';

const useAuthentication = () => {
    const [loggedIn, setLoggedIn] = useRecoilState(loggedInAtom);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
        setLoading(false);
    }, [setLoggedIn]);

    return loading;
};

export default useAuthentication;
