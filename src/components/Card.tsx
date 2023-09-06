import { ITour } from '@lib/types';
import Link from 'next/link';
import { IMAGE_BASE_URL } from '../shared/constants';

const Card = ({ tour }: { tour: ITour }) => {
    const tourDate = new Date(tour?.startDates[0]);
    const date = tourDate?.toLocaleString('en-us', {
        month: 'long',
        year: 'numeric',
    });
    return (
        <>
            <div className='card'>
                <div className='card__header'>
                    <div className='card__picture'>
                        <div className='card__picture-overlay'>&nbsp;</div>
                        <img
                            className='card__picture-img'
                            src={`${IMAGE_BASE_URL}/img/tours/${tour.imageCover}`}
                            alt={tour.name}
                        />
                    </div>
                    <h3 className='heading-tertirary'>
                        <span>{tour.name}</span>
                    </h3>
                </div>
                <div className='card__details'>
                    <h4 className='card__sub-heading'>
                        {tour.difficulty} {tour.duration}-day tour
                    </h4>
                    <p className='card__text'>{tour.summary}</p>

                    <div className='card__data'>
                        <svg className='card__icon'>
                            <use xlinkHref='/img/icons.svg#icon-map-pin'></use>
                        </svg>
                        <span>{tour?.startLocation?.description}</span>
                    </div>
                    <div className='card__data'>
                        <svg className='card__icon'>
                            <use xlinkHref='/img/icons.svg#icon-calendar'></use>
                        </svg>
                        <span>{date}</span>
                    </div>
                    <div className='card__data'>
                        <svg className='card__icon'>
                            <use xlinkHref='/img/icons.svg#icon-flag'></use>
                        </svg>
                        <span>${tour?.locations?.length} stops</span>
                    </div>
                    <div className='card__data'>
                        <svg className='card__icon'>
                            <use xlinkHref='/img/icons.svg#icon-user'></use>
                        </svg>
                        <span>{tour.maxGroupSize} people</span>
                    </div>
                </div>
                <div className='card__footer'>
                    <p>
                        <span className='card__footer-value'>
                            {tour.price.toLocaleString('us-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}
                        </span>{' '}
                        <span className='card__footer-text'>per person</span>
                    </p>
                    <p className='card__ratings'>
                        <span className='card__footer-value'>{tour.ratingsAverage}</span>{' '}
                        <span className='card__footer-text'>{`rating (${tour.ratingsQuantity})`}</span>
                    </p>
                    <Link className='btn btn--green btn--small' href={`/tour/${tour.slug}`}>
                        Details
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Card;
