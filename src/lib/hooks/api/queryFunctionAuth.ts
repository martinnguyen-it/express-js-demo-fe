import { API, LOCAL_STORAGE_KEY_TOKEN } from '@/src/shared/constants';
import axios from 'axios';
import { isArray } from 'lodash';
import { useRouter } from 'next/router';
import { QueryFunctionContext } from 'react-query';

export const queryFunctionAuth = (queryContext: QueryFunctionContext) => {
    const token =
        typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN) || '{}') : '';

    if (!token) {
        useRouter().push('/auth/login');
    }

    const endpoint = isArray(queryContext.queryKey) ? queryContext.queryKey[0] : queryContext.queryKey || '';
    return axios({
        headers: { Authorization: `Bearer ${token}` },
        method: 'GET',
        baseURL: API,
        url: endpoint,
    });
};
