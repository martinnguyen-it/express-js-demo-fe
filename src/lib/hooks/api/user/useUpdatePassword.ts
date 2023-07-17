import { useMutationApi } from '../useMutationApi';
import { TUpdatePasswordType } from '@/src/lib/types/userType';

type TRequestRequiredParams = {
    payload: TUpdatePasswordType;
};

type TResponse = Array<any>;

export function useUpdatePassword() {
    const restAPI = useMutationApi<TResponse, TRequestRequiredParams>((requestRequiredParams) => ({
        method: 'PATCH',
        endpoint: '/users/update-my-password',
        payload: requestRequiredParams.payload,
    }));

    return restAPI;
}
