import Head from 'next/head';
import Card from '@/src/components/Card';
import { useQuery } from 'react-query';
import { queryFunction } from '@/src/lib/hooks/api';
import { isEmpty, map } from 'lodash';
import Spinner from '@/src/components/Spinner';

export default function Home() {
    const { isLoading, isError, data, error, isSuccess } = useQuery('tours/', queryFunction);

    return (
        <>
            <Head>
                <title>Natours | Exciting tours for adventurous people</title>
            </Head>

            <main className='main'>
                {isLoading ? <Spinner className='mx-auto w-14' /> : ''}

                <div className='card-container'>
                    {isSuccess &&
                        !isEmpty(data.data.data) &&
                        map(data.data.data, (tour, index) => <Card key={index} tour={tour} />)}
                </div>
            </main>
        </>
    );
}
