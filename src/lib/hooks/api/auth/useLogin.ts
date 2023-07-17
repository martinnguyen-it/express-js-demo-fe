import { useMutationApi } from '../useMutationApi';
import { TAuthType } from '@/src/lib/types/userType';

type TRequestRequiredParams = {
    payload: Partial<TAuthType>;
};

type TResponse = Array<any>;

export function useLogin() {
    const restAPI = useMutationApi<TResponse, TRequestRequiredParams>((requestRequiredParams) => ({
        method: 'POST',
        endpoint: '/users/login',
        payload: requestRequiredParams.payload,
    }));

    return restAPI;
}
