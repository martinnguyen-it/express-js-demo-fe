import Spinner from '@/src/components/Spinner';
import { queryFunction } from '@/src/lib/hooks/api';
import { useGetLinkPayment } from '@/src/lib/hooks/api/booking/useGetLinkPayment';
import { usePayViaPaypal } from '@/src/lib/hooks/api/booking/usePayViaPaypal';
import { ITour } from '@/src/lib/types';
import { IMAGE_BASE_URL } from '@/src/shared/constants';
import { CreateOrderActions, CreateOrderData, OnApproveActions, OnApproveData } from '@paypal/paypal-js';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { isEmpty, map } from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { useQuery } from 'react-query';

/* eslint-disable @next/next/no-html-link-for-pages */
const Checkout = () => {
    const [{ isPending }] = usePayPalScriptReducer();

    const router = useRouter();

    const { isLoading, data, isSuccess } = useQuery(`tours/slug/${router.query.id}`, queryFunction);
    const tour: ITour = isSuccess && data?.data.data;

    const tourDate = useMemo(() => {
        if (tour && tour?.startDates[0]) {
            return new Date(tour?.startDates[0]);
        }
    }, [tour]);

    const date = tourDate?.toLocaleString('en-us', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const payViaPaypal = usePayViaPaypal();
    const getLinkPaymentVnpay = useGetLinkPayment();

    const onCreateOrder = useCallback(
        (_data: CreateOrderData, actions: CreateOrderActions) => {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: `${tour.price}`,
                        },
                        description: `${tour.name}`,
                    },
                ],
                application_context: {
                    shipping_preference: 'NO_SHIPPING',
                },
            });
        },
        [tour.price, tour.name],
    );

    const onBookingViaVnpay = useCallback(() => {
        getLinkPaymentVnpay.sendRequest(
            { payload: { amount: tour.price * 23000, tourId: tour.id } },
            {
                onSuccess: (respon: any) => {
                    const vnpUrl = respon.data.data.vnpUrl;
                    window.location.href = vnpUrl;
                },
            },
        );
    }, [tour]);

    const onApprove = useCallback(
        async (data: OnApproveData, actions: OnApproveActions) => {
            const details = await (actions && actions.order && actions.order.capture());

            if (details?.status === 'COMPLETED') {
                const payload = { amount: tour.price, tourId: tour.id, paid: true, orderId: data.orderID };
                await payViaPaypal.sendRequest(
                    { payload },
                    {
                        onSuccess: () => {
                            router.push('/payment?paid=true');
                        },
                    },
                );
            }
        },
        [tour],
    );

    return (
        <main className=''>
            {isLoading && <Spinner className='mx-auto w-14' />}
            {isSuccess && (
                <>
                    <div className='flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32'>
                        <a href={`/tour/${router.query.id}`} className='text-4xl font-bold text-gray-800'>
                            {tour.name}
                        </a>
                        <div className='mt-4 py-2 text-xs sm:ml-auto sm:mt-0 sm:text-base'>
                            <div className='relative'>
                                <ul className='relative flex w-full items-center justify-between space-x-2 sm:space-x-4'>
                                    <li className='flex items-center space-x-3 text-left sm:space-x-4'>
                                        <a
                                            className='flex h-12 w-12 items-center justify-center rounded-full bg-emerald-200 text-2xl font-semibold text-emerald-700'
                                            href='/'
                                        >
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                className='h-8 w-8'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                stroke='currentColor'
                                                strokeWidth='2'
                                            >
                                                <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                                            </svg>
                                        </a>
                                        <span className='text-2xl font-semibold text-gray-900'>Shop</span>
                                    </li>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='h-8 w-8 text-gray-400'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                    >
                                        grid
                                        <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
                                    </svg>
                                    <li className='flex items-center space-x-3 text-left sm:space-x-4'>
                                        <a
                                            className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-600 text-2xl font-semibold text-white ring ring-gray-600 ring-offset-2'
                                            href='/'
                                        >
                                            2
                                        </a>
                                        <span className='text-2xl font-semibold text-gray-900'>Shipping</span>
                                    </li>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='h-8 w-8 text-gray-400'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                    >
                                        <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
                                    </svg>
                                    <li className='flex items-center space-x-3 text-left sm:space-x-4'>
                                        <a
                                            className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-400 text-2xl font-semibold text-white'
                                            href='/'
                                        >
                                            3
                                        </a>
                                        <span className='text-2xl font-semibold text-gray-500'>Payment</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32'>
                        <div className='px-4 pt-8'>
                            <p className='pb-3 text-4xl font-medium'>Order Summary</p>
                            <p className='text-2xl text-gray-400'>
                                Check your items. And select a suitable shipping method.
                            </p>
                            <div className='mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6'>
                                <div className='grid lg:grid-cols-3'>
                                    <img
                                        className='card__picture-img object-cover transition duration-300 ease-in-out hover:scale-150'
                                        src={`${IMAGE_BASE_URL}/img/tours/${tour.imageCover}`}
                                        alt={tour.name}
                                    />
                                    <div className='col-span-2'>
                                        <div className='flex w-full flex-col p-4'>
                                            <p className='pb-1 text-4xl font-semibold'>{tour.name}</p>
                                            <p className='float-right pb-2 text-2xl text-gray-400'>{date}</p>
                                            <p className='pb-4 text-3xl font-bold'>
                                                {tour.price.toLocaleString('us-US', {
                                                    style: 'currency',
                                                    currency: 'USD',
                                                })}
                                            </p>
                                            <p className='text-2xl'>
                                                {tour.description
                                                    ? tour.description.split('\n').map((line, index) => (
                                                          <p key={index} className='description__text'>
                                                              {line}
                                                          </p>
                                                      ))
                                                    : ''}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='grid gap-5 py-10 lg:grid-cols-3'>
                                    {!isEmpty(tour.images) &&
                                        map(tour.images, (image, index) => (
                                            <div key={index} className='picture-box'>
                                                <img
                                                    className={`picture-box__img transition duration-300 ease-in-out hover:scale-150`}
                                                    src={`${IMAGE_BASE_URL}/img/tours/${image}`}
                                                    alt={`${tour.name}-${index + 1}`}
                                                />
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                        <div className='mt-10 flex items-center justify-center bg-gray-50 px-4 pt-8 lg:mt-0'>
                            <div className='w-[398px] duration-300 ease-in'>
                                {isPending ? <Spinner className='mx-auto w-14' /> : null}
                                <PayPalButtons createOrder={onCreateOrder} onApprove={onApprove} />
                                <div className='flex flex-col items-center text-center text-2xl'>
                                    <p>or</p>
                                    <button
                                        className='btn btn--green span-all-rows btn--loading w-full justify-center !rounded-lg'
                                        onClick={onBookingViaVnpay}
                                    >
                                        {getLinkPaymentVnpay.isLoading && <Spinner />}
                                        <p>Pay via VNPAY!</p>
                                    </button>{' '}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </main>
    );
};

export default Checkout;
