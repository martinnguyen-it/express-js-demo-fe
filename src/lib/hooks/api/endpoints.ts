import { TAuthType, TUpdateMeType, TUpdatePasswordType } from '../../types/userType';

interface IGenericEndpoint {
    endpoint: string;
    payload?: Partial<TAuthType> | TUpdateMeType | TUpdatePasswordType;
}

interface IEndpoint extends IGenericEndpoint {
    method: 'POST' | 'GET' | 'DELETE' | 'PATCH';
    endpoint: string;
}

export type TMutationAPIEndPoints = IEndpoint;
