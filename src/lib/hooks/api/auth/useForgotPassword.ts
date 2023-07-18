import { useMutationApi } from '../useMutationApi';

type TRequestRequiredParams = {
    payload: {
        email: string;
    };
};

type TResponse = Array<any>;

export function useForgotPassword() {
    const restAPI = useMutationApi<TResponse, TRequestRequiredParams>((requestRequiredParams) => ({
        method: 'POST',
        endpoint: '/users/forgot-password',
        payload: requestRequiredParams.payload,
    }));

    return restAPI;
}
