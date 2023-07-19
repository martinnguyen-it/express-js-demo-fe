const QuickFact = ({ xlinkHref, label, value }: { xlinkHref: string; label: string; value: string }) => {
    return (
        <div className='overview-box__detail !flex !w-[255px] justify-between'>
            <div className='flex'>
                <svg className='overview-box__icon'>
                    <use xlinkHref={xlinkHref}></use>
                </svg>
                <span className='overview-box__label'>{label}</span>
            </div>
            <span className='overview-box__text'>{value}</span>
        </div>
    );
};
export default QuickFact;
