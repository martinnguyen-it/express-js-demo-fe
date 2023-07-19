import { IGetLinkPayMent } from '@lib/types/payment';
import { useMutationApi } from '../useMutationApi';

type TRequestRequiredParams = {
    payload: IGetLinkPayMent;
};

type TResponse = Array<any>;

export function useGetLinkPayment() {
    const restAPI = useMutationApi<TResponse, TRequestRequiredParams>((requestRequiredParams) => ({
        method: 'POST',
        endpoint: '/pay/create_payment_url',
        payload: requestRequiredParams.payload,
    }));

    return restAPI;
}
