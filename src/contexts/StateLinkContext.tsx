import React from 'react';
import { useLocalStorage } from '../lib/hooks/localStorage';
import { STATE_LINK } from '../shared/constants';

export interface IStateLinkContext {
    stateLink: any;
    setStateLink: React.Dispatch<React.SetStateAction<any>>;
}

const DEFAULT_STATE_LINK: IStateLinkContext = {
    stateLink: {},
    setStateLink: () => {},
};

const StateLinkContext = React.createContext<IStateLinkContext>(DEFAULT_STATE_LINK);

export const StateLinkContextProvider: React.FC<{ children: any }> = ({ children }) => {
    const [stateLink, setStateLink] = useLocalStorage({ key: STATE_LINK, defaultValue: {} });
    return <StateLinkContext.Provider value={{ stateLink, setStateLink }}>{children}</StateLinkContext.Provider>;
};

export default StateLinkContext;
