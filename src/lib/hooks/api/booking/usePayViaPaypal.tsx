import { IGetLinkPayMent } from '@lib/types/payment';
import { useMutationApi } from '../useMutationApi';

type TRequestRequiredParams = {
    payload: IGetLinkPayMent;
};

type TResponse = Array<any>;

export function usePayViaPaypal() {
    const restAPI = useMutationApi<TResponse, TRequestRequiredParams>((requestRequiredParams) => ({
        method: 'POST',
        endpoint: '/pay/pay_via_paypal',
        payload: requestRequiredParams.payload,
    }));

    return restAPI;
}
