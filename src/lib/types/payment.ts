export interface IGetLinkPayMent {
    amount: number;
    tourId: string;
    paid?: boolean;
    orderId?: string;
    bankCode?: number;
    locale?: string;
}
