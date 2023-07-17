import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../lib/hooks/localStorage';
import { LOCAL_STORAGE_KEY_TOKEN, LOCAL_STORAGE_KEY_USER_DATA } from '../shared/constants';

export interface IUserData {
    role: string;
    email: string;
    name: string;
    photo?: string;
}

export interface IUserDataContext {
    userData: IUserData;
    setUserData: React.Dispatch<React.SetStateAction<IUserData>>;
    reset: () => void;
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
}

const DEFAULT_USER_DATA: IUserDataContext = {
    userData: { role: '', email: '', name: '', photo: '' },
    setUserData: () => {},
    reset: () => {},
    setToken: () => {},
    token: '',
};

const UserContext = React.createContext<IUserDataContext>(DEFAULT_USER_DATA);

export const UserContextProvider: React.FC<{ children: any }> = ({ children }) => {
    const [userData, setUserData] = useLocalStorage({
        key: LOCAL_STORAGE_KEY_USER_DATA,
        defaultValue: DEFAULT_USER_DATA.userData,
    });

    const [token, setToken] = useState<string>(() => {
        return typeof window !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN) || '' : '';
    });

    useEffect(() => {
        token && localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, JSON.stringify(token));
    }, [token]);

    const reset = () => {
        setUserData(DEFAULT_USER_DATA.userData);
        localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, '');
        localStorage.setItem(LOCAL_STORAGE_KEY_USER_DATA, '');
    };

    return (
        <UserContext.Provider value={{ userData, setUserData, reset, token, setToken }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;