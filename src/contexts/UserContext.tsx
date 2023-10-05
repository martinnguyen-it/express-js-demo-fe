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
    access_token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
}

const DEFAULT_USER_DATA: IUserDataContext = {
    userData: { role: '', email: '', name: '', photo: '' },
    setUserData: () => {},
    reset: () => {},
    setToken: () => {},
    access_token: '',
};

const UserContext = React.createContext<IUserDataContext>(DEFAULT_USER_DATA);

export const UserContextProvider: React.FC<{ children: any }> = ({ children }) => {
    const [userData, setUserData] = useLocalStorage({
        key: LOCAL_STORAGE_KEY_USER_DATA,
        defaultValue: DEFAULT_USER_DATA.userData,
    });

    const [access_token, setToken] = useState<string>(() => {
        return typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN) || '{}') : '';
    });

    useEffect(() => {
        access_token &&
            typeof window !== 'undefined' &&
            localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, JSON.stringify(access_token));
    }, [access_token]);

    const reset = () => {
        setUserData(DEFAULT_USER_DATA.userData);
        setToken('');
        localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, JSON.stringify(''));
        localStorage.setItem(LOCAL_STORAGE_KEY_USER_DATA, JSON.stringify(''));
    };

    return (
        <UserContext.Provider value={{ userData, setUserData, reset, access_token, setToken }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
