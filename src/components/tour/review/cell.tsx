import { IReview } from '@/src/lib/types';
import { IMAGE_BASE_URL } from '@/src/shared/constants';
import { map } from 'lodash';
const CardCell = ({ review }: { review: IReview }) => {
    return (
        <>
            <div className='reviews__card md:h-[281px]'>
                <div className='reviews__avatar'>
                    <img
                        className='reviews__avatar-img'
                        src={`${IMAGE_BASE_URL}/img/users/${review.user?.photo}`}
                        alt={review.user?.name}
                    />
                    <h6 className='reviews__user'>{review.user?.name}</h6>
                </div>
                <p className='reviews__text'>{review.review}</p>
                <div className='reviews__rating'>
                    {review.rating &&
                        map(Array(5), (_, idx) => (
                            <svg
                                key={idx}
                                className={`reviews__star reviews__star--${
                                    review.rating >= idx + 1 ? 'active' : 'inactive'
                                }`}
                            >
                                <use xlinkHref='/img/icons.svg#icon-star'></use>
                            </svg>
                        ))}
                </div>
            </div>
        </>
    );
};
export default CardCell;
