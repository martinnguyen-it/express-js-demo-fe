import { useMutationApi } from '../useMutationApi';
import { TUpdateMeType } from '@/src/lib/types/userType';

type TRequestRequiredParams = {
    payload: TUpdateMeType;
};

type TResponse = Array<any>;

export function useUpdateMe() {
    const restAPI = useMutationApi<TResponse, TRequestRequiredParams>((requestRequiredParams) => ({
        method: 'PATCH',
        endpoint: '/users/update-me',
        payload: requestRequiredParams.payload,
    }));

    return restAPI;
}
