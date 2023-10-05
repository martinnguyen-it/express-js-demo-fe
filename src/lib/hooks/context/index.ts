import StateLinkContext from '@/src/contexts/StateLinkContext';
import UserContext from '@/src/contexts/UserContext';
import { useContext } from 'react';

export const useStateLinkContext = () => {
    const { stateLink, setStateLink } = useContext(StateLinkContext);
    return { stateLink, setStateLink };
};

export const useUserDataContext = () => {
    const { userData, setUserData, reset, access_token, setToken } = useContext(UserContext);
    return { userData, setUserData, reset, access_token, setToken };
};
