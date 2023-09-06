import Spinner from '@/src/components/Spinner';
import { API } from '@/src/shared/constants';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const MyTour = () => {
    const router = useRouter();
    console.log('🚀 ~ file: [my-tours].tsx:10 ~ MyTour ~ router:', router.query);

    useEffect(() => {
        if (router.query && router.query.vnp_SecureHash) {
            const query = router.asPath.split('?')[1];
            (async () => {
                try {
                    await axios({
                        method: 'GET',
                        baseURL: API,
                        url: `/pay/vnpay_return?${query}`,
                    }).then(() => {
                        toast.success('Paid successfully');
                        router.replace({ pathname: '/payment', query: { paid: true } });
                    });
                } catch (err: any) {
                    if (err.response?.data?.message) {
                        toast.error(err.response?.data?.message);
                    } else {
                        toast.error('Error');
                    }
                    router.replace('/payment');
                }
            })();
        }
    }, [router]);

    return (
        <>
            <main className='main text-center'>
                <Spinner className='mx-auto w-32' />{' '}
            </main>
        </>
    );
};
export default MyTour;
