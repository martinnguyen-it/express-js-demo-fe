import Slider from 'react-slick';
import { IReview } from '@/src/lib/types';
import CardCell from './cell';

const SETTINGS = {
    dots: false,
    infinite: true,
    initialSlide: 0,
    autoplay: true,
    speed: 10000,
    autoplaySpeed: 1000,
    cssEase: 'linear',
    className: 'custom-review-slider flex w-full',
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    vertical: false,
    centerMode: true,
    responsive: [
        {
            breakpoint: 1440,
            settings: {
                slidesToShow: 3,
            },
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                centerMode: false,
            },
        },
        {
            breakpoint: 640,
            settings: {
                slidesToShow: 1,
                centerMode: true,
            },
        },
    ],
};

const ReviewSlider = ({ reviews }: { reviews: IReview[] }) => {
    return (
        <Slider {...SETTINGS}>
            {/* <div className='flex w-full '> */}
            {reviews.map((item: IReview, index) => (
                <CardCell {...item} review={item} key={`slider-review-${index}`} />
            ))}
            {/* </div> */}
        </Slider>
    );
};

export default ReviewSlider;
