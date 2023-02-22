import { createContext, useState, useCallback } from 'react';
import { calculateRemainingTime, getLocalData } from './utils/token';


let logoutTimer;

const AuthContext = createContext({
    token: '',
    login: () => { },
    logout: () => { }
})

export const AuthContextProvider = (props) => {
    let initialToken;
    const localData = getLocalData();

    if (localData) {
        initialToken = localData.token
    }

    const [token, setToken] = useState(initialToken);
    const [userId, setUserId] = useState(null);
    const [name, setName] = useState(null);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);

        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('expirationTime');

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    const login = (token, exp, userId, name) => {
        setToken(token);
        setUserId(userId);
        setName(name);

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
        userId,
        name
    }


    return (
        <AuthContext.Provider value={context}>
            {props.children}
        </AuthContext.Provider>
    )
}

// export default AuthContextProvider;

export default AuthContext;