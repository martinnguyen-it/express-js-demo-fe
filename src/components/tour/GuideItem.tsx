import { IUser } from '@/src/lib/types';
import { IMAGE_BASE_URL } from '@/src/shared/constants';

const GuideItem = ({ guide }: { guide: Partial<IUser> }) => {
    return (
        <div className='overview-box__detail'>
            <img className='overview-box__img' src={`${IMAGE_BASE_URL}/img/users/${guide.photo}`} alt={guide.name} />
            <span className='overview-box__label'>
                {guide.role === 'lead-guide' ? 'Lead guide' : guide.role === 'guide' ? 'Tour guide' : ''}
            </span>
            <span className='overview-box__text'>{guide.name}</span>
        </div>
    );
};
export default GuideItem;
