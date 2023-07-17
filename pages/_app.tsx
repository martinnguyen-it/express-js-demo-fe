import AppContextProvider from '@/src/contexts';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Footer from '@/src/components/Footer';
import dynamic from 'next/dynamic';

const Header = dynamic(import('@/src/components/Header'), { ssr: false });

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AppContextProvider>
                    <Header />
                    <Component {...pageProps} />
                    <ToastContainer autoClose={1500} />
                    <Footer />
                </AppContextProvider>
            </QueryClientProvider>
        </>
    );
}
