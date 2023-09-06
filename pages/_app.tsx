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
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const Header = dynamic(import('@/src/components/Header'), { ssr: false });

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

const initialOptions = {
    clientId: 'AT8FMhoQOxa5X38aa8eC_NjXHSqZ9nn2-TRAeUEmg2Dh25XtbbqQC2vuDK1w0I0C4cmb3ySlYQUMk1WQ',
    currency: 'USD',
    intent: 'capture',
};

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <PayPalScriptProvider options={initialOptions}>
                <QueryClientProvider client={queryClient}>
                    <AppContextProvider>
                        <Header />
                        <Component {...pageProps} />
                        <ToastContainer autoClose={1500} />
                        <Footer />
                    </AppContextProvider>
                </QueryClientProvider>
            </PayPalScriptProvider>
        </>
    );
}
