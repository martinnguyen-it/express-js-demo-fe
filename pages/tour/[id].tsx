import Head from 'next/head';
import Spinner from '@/src/components/Spinner';
import { ITour } from '@lib/types';
import { useStateLinkContext } from '@/src/lib/hooks/context';
import { useQuery } from 'react-query';
import { queryFunction } from '@/src/lib/hooks/api';
import { isEmpty, map } from 'lodash';
import GuideItem from '@/src/components/tour/GuideItem';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { IMAGE_BASE_URL } from '@/src/shared/constants';
// import MapContainer from '@/src/components/map-box';

const MapContainer = dynamic(import('@/src/components/map-box'), { ssr: false });
const ReviewSlider = dynamic(import('@/src/components/tour/review/index'), { ssr: false });

export default function Tour() {
    const { stateLink } = useStateLinkContext();
    const { isLoading, data, isSuccess } = useQuery(`tours/${stateLink?.id}`, queryFunction);
    const tour: ITour = data?.data.data;
    const tourDate = new Date(tour?.startDates[0]);
    const date = tourDate?.toLocaleString('en-us', {
        month: 'long',
        year: 'numeric',
    });
    return (
        <>
            <Head>
                <title>Natours | Exciting tours for adventurous people</title>
            </Head>

            {isLoading && (
                <div className='mx-auto'>
                    <Spinner />
                </div>
            )}
            {isSuccess && tour && (
                <>
                    <section className='section-header'>
                        <div className='header__hero'>
                            <div className='header__hero-overlay'>&nbsp;</div>
                            <img
                                className='header__hero-img'
                                src={`${IMAGE_BASE_URL}/img/tours/${tour.imageCover}`}
                                alt={tour.name}
                            />
                        </div>
                        <div className='heading-box'>
                            <h1 className='heading-primary'>
                                <span>{tour.name} tour</span>
                            </h1>
                            <div className='heading-box__group'>
                                <div className='heading-box__detail'>
                                    <svg className='heading-box__icon'>
                                        <use xlinkHref='/img/icons.svg#icon-clock'></use>
                                    </svg>
                                    <span className='heading-box__text'>{tour.duration} days</span>
                                </div>
                                <div className='heading-box__detail'>
                                    <svg className='heading-box__icon'>
                                        <use xlinkHref='/img/icons.svg#icon-map-pin'></use>
                                    </svg>
                                    <span className='heading-box__text'>{tour?.startLocation?.description}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className='section-description'>
                        <div className='overview-box'>
                            <div>
                                <div className='overview-box__group'>
                                    <h2 className='heading-secondary ma-bt-lg'>Quick facts</h2>
                                    <div className='overview-box__detail'>
                                        <svg className='overview-box__icon'>
                                            <use xlinkHref='/img/icons.svg#icon-calendar'></use>
                                        </svg>
                                        <span className='overview-box__label'>Next date</span>
                                        <span className='overview-box__text'>{date}</span>
                                    </div>
                                    <div className='overview-box__detail'>
                                        <svg className='overview-box__icon'>
                                            <use xlinkHref='/img/icons.svg#icon-trending-up'></use>
                                        </svg>
                                        <span className='overview-box__label'>Difficulty</span>
                                        <span className='overview-box__text'>{tour.difficulty}</span>
                                    </div>
                                    <div className='overview-box__detail'>
                                        <svg className='overview-box__icon'>
                                            <use xlinkHref='/img/icons.svg#icon-user'></use>
                                        </svg>
                                        <span className='overview-box__label'>Participants</span>
                                        <span className='overview-box__text'>{tour.maxGroupSize} people</span>
                                    </div>
                                    <div className='overview-box__detail'>
                                        <svg className='overview-box__icon'>
                                            <use xlinkHref='/img/icons.svg#icon-star'></use>
                                        </svg>
                                        <span className='overview-box__label'>Rating</span>
                                        <span className='overview-box__text'>{tour.ratingsAverage} / 5</span>
                                    </div>
                                </div>
                                <div className='overview-box__group'>
                                    <h2 className='heading-secondary ma-bt-lg'>Your tour guides</h2>
                                    {!isEmpty(tour.guides) &&
                                        tour.guides.map((guide, index) => <GuideItem key={index} guide={guide} />)}
                                </div>
                            </div>
                        </div>

                        <div className='description-box'>
                            <h2 className='heading-secondary ma-bt-lg'>About {tour.name} tour</h2>
                            {tour.description
                                ? tour.description.split('\n').map((line, index) => (
                                      <p key={index} className='description__text'>
                                          {line}
                                      </p>
                                  ))
                                : ''}
                        </div>
                    </section>
                    <section className='section-pictures'>
                        {!isEmpty(tour.images) &&
                            map(tour.images, (image, index) => (
                                <div key={index} className='picture-box'>
                                    <img
                                        className={`picture-box__img picture-box__img--${index + 1}`}
                                        src={`${IMAGE_BASE_URL}/img/tours/${image}`}
                                        alt={`${tour.name}-${index + 1}`}
                                    />
                                </div>
                            ))}
                    </section>
                    {tour.locations && (
                        <section className='section-map'>
                            <MapContainer locations={tour.locations} />
                        </section>
                    )}

                    {tour.reviews && !isEmpty(tour.reviews) && (
                        <section className='section-reviews'>
                            <ReviewSlider reviews={tour.reviews} />
                        </section>
                    )}

                    <section className='section-cta'>
                        <div className='cta'>
                            <div className='cta__img cta__img--logo'>
                                <img src='/img/logo-white.png' alt='Natours logo' />
                            </div>
                            {tour.images && (
                                <>
                                    <img
                                        className='cta__img cta__img--1'
                                        src={`${IMAGE_BASE_URL}/img/tours/${tour?.images[1]}`}
                                        alt='Tour '
                                    />
                                    <img
                                        className='cta__img cta__img--2'
                                        src={`${IMAGE_BASE_URL}/img/tours/${tour?.images[2]}`}
                                        alt='Tour  1'
                                    />
                                </>
                            )}
                            <div className='cta__content'>
                                <h2 className='heading-secondary'>What are you waiting for?</h2>
                                <p className='cta__text'>
                                    5 days. 1 adventure. Infinite memories. Make it yours today!
                                </p>
                                <Link className='btn btn--green span-all-rows' href='/login'>
                                    Log in to book tour
                                </Link>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    );
}
