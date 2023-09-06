import Link from 'next/link';
import { useRouter } from 'next/router';

const MyTour = () => {
    const router = useRouter();

    return (
        <>
            <main className='main text-center'>
                {router.query && router.query.paid === 'true' ? (
                    <>
                        <h1 className='heading-secondary ma-bt-lg !text-[50px]'>
                            You have successfully paid!<br></br>
                            Please visit the Booking page for details.
                        </h1>
                        <Link
                            href={'/my-tours'}
                            className='card__sub-heading mt-20 flex !h-[20px]  justify-center !text-2xl'
                        >
                            <img className='h-[70px]' src='/img/giphy.gif' alt='gif' />
                            <span className='leading-[42px]'> Go to the Booking page</span>
                        </Link>
                    </>
                ) : (
                    <>
                        <h1 className='heading-secondary heading-secondary--error ma-bt-lg !text-[50px]'>
                            You have fail paid!
                        </h1>
                        <Link href={'/'} className='card__sub-heading mt-20 flex !h-[20px]  justify-center !text-2xl'>
                            <img className='h-[70px]' src='/img/giphy.gif' alt='gif' />
                            <span className='leading-[42px]'> Go to the homepage</span>
                        </Link>
                    </>
                )}
            </main>
        </>
    );
};
export default MyTour;
