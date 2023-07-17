import { useMutationApi } from '../useMutationApi';
import { TSignUpType } from '@/src/lib/types/userType';

type TRequestRequiredParams = {
    payload: TSignUpType;
};

type TResponse = Array<any>;

export function useSignUp() {
    const restAPI = useMutationApi<TResponse, TRequestRequiredParams>((requestRequiredParams) => ({
        method: 'POST',
        endpoint: '/users/signup',
        payload: requestRequiredParams.payload,
    }));

    return restAPI;
}
