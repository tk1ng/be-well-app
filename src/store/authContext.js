import { createContext, useState } from 'react';


let logoutTimer;

export const AuthContext = createContext({
    token: '',
    login: () => { },
    logout: () => { }
})

const calculateRemainingTime = (exp) => {
    const currentTime = new Date().getTime()
    const expTime = exp
    const remainingTime = expTime - currentTime
    return remainingTime
}

const getLocalData = () => {
    const storedToken = localStorage.getItem('token');
    const storedExp = localStorage.getItem('expirationTime');

    const remainingTime = calculateRemainingTime(storedExp);

    if (remainingTime <= 1000 * 60 * 30) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null
    }


    return {
        token: storedToken,
        duration: remainingTime,
    }
}

const AuthContextProvider = (props) => {
    let initialToken;
    const localData = getLocalData();

    const [token, setToken] = useState(initialToken);
    const [userId, setUserId] = useState(null);

    console.log('From authContext', localData);

    if (localData) {
        initialToken = localData.token
    }

    const logout = () => {
        setToken(null);
        setUserId(null);

        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('expirationTime');

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }

    const login = (token, exp, userId) => {
        setToken(token);
        setUserId(userId);

        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('expirationTime', exp);

        let remainingTime = calculateRemainingTime(exp);

        logoutTimer = setTimeout(logout, remainingTime);
    }

    const context = {
        token,
        login,
        logout,
        userId
    }


    return (
        <AuthContext.Provider value={context}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;