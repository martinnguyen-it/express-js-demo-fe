import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { MutationFunction, useMutation } from 'react-query';
import { TMutationAPIEndPoints } from './endpoints';
import { IErrorResponseBody } from '@lib/types/api/api.response';
import { API, LOCAL_STORAGE_KEY_TOKEN } from '@/src/shared/constants';

export function useMutationApi<TResponse = any, TRequestRequiredParams = any>(
    sendRequestFunction: (requestRequiredParams: TRequestRequiredParams) => TMutationAPIEndPoints,
) {
    const [responseBody, setResponseBody] = useState<any>();
    const token =
        typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN) || '{}') : '';

    const mutationFunction: MutationFunction<AxiosResponse<TResponse>, TRequestRequiredParams> = React.useCallback(
        (requestRequiredParams) => {
            const sendRequestParams = sendRequestFunction(requestRequiredParams);
            return sendRequestParams.payload
                ? axios({
                      headers: token ? { Authorization: `Bearer ${token}` } : {},
                      method: sendRequestParams.method,
                      baseURL: API,
                      url: sendRequestParams.endpoint,
                      data: sendRequestParams.payload,
                  })
                : axios({
                      headers: token ? { Authorization: `Bearer ${token}` } : {},
                      method: sendRequestParams.method,
                      baseURL: API,
                      url: sendRequestParams.endpoint,
                  });
        },
        [],
    );

    const { mutate, isError, error, isSuccess, isLoading } = useMutation<
        AxiosResponse<TResponse>,
        AxiosError<IErrorResponseBody, any>,
        TRequestRequiredParams
    >(mutationFunction, {
        onSuccess: (response) => {
            if (response.data) {
                setResponseBody(response.data as any);
            }
        },
    });

    const errorMessage = error && (error?.response?.data?.message || error.message);

    return { responseBody, isLoading, sendRequest: mutate, isError, error, errorMessage, isSuccess };
}
