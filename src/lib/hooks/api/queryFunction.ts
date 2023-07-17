import { API, LOCAL_STORAGE_KEY_TOKEN } from '@/src/shared/constants';
import axios from 'axios';
import { isArray } from 'lodash';
import { QueryFunctionContext } from 'react-query';

export const queryFunction = (queryContext: QueryFunctionContext) => {
    const token =
        typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN) || '{}') : '';

    const endpoint = isArray(queryContext.queryKey) ? queryContext.queryKey[0] : queryContext.queryKey || '';
    return axios({
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        method: 'GET',
        baseURL: API,
        url: endpoint,
    });
};
