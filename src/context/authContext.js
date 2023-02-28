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
    let initialName;
    let initialEmail;

    const localData = getLocalData();

    if (localData) {
        initialToken = localData.token;
        initialName = localData.userName;
        initialEmail = localData.email;
    }

    const [token, setToken] = useState(initialToken);
    const [userId, setUserId] = useState(null);
    const [name, setName] = useState(initialName);
    const [email, setEmail] = useState(initialEmail);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);

        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('email');
        localStorage.removeItem('name');

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    const login = (token, exp, userId, name, email) => {
        setToken(token);
        setUserId(userId);
        setName(name);
        setEmail(email);

        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('expirationTime', exp);
        localStorage.setItem('userName', name);
        localStorage.setItem('email', email);

        let remainingTime = calculateRemainingTime(exp);

        logoutTimer = setTimeout(logout, remainingTime);
    }

    const context = {
        token,
        login,
        logout,
        userId,
        name,
        email
    }

    return (
        <AuthContext.Provider value={context}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;