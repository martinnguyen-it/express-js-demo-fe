import { IGetLinkPayMent } from '../../types/payment';
import { TAuthType, TUpdateMeType, TUpdatePasswordType } from '../../types/userType';

interface IGenericEndpoint {
    endpoint: string;
    payload?: Partial<TAuthType> | TUpdateMeType | TUpdatePasswordType | IGetLinkPayMent;
}

interface IEndpoint extends IGenericEndpoint {
    method: 'POST' | 'GET' | 'DELETE' | 'PATCH';
    endpoint: string;
}

export type TMutationAPIEndPoints = IEndpoint;
