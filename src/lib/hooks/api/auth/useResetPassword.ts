import { TResetPasswordType } from '@/src/lib/types/userType';
import { useMutationApi } from '../useMutationApi';

type TRequestRequiredParams = {
    payload: TResetPasswordType;
    tokenResetPassword: string;
};

type TResponse = Array<any>;

export function useResetPassword() {
    const restAPI = useMutationApi<TResponse, TRequestRequiredParams>((requestRequiredParams) => ({
        method: 'PATCH',
        endpoint: `/auth/reset-password/${requestRequiredParams.tokenResetPassword}`,
        payload: requestRequiredParams.payload,
    }));

    return restAPI;
}
