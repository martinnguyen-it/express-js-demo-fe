import { NextComponentType, NextPageContext } from 'next';
import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserDataContext } from '@/src/lib/hooks/context';

export interface AuthProps {
    access_token?: string;
}

/**
 * Client side get authToken hoc
 *
 * @param {NextComponentType} Component
 * @param {string} [redirectUrl='/login']
 * @returns {NextComponentType}
 */
export const withAuthTokenWrapper = (
    Component: NextComponentType<NextPageContext, unknown, AuthProps>,
): NextComponentType => {
    const WrappedComponent: FC = (props) => {
        const { access_token } = useUserDataContext();

        return <Component access_token={access_token} {...props} />;
    };

    return WrappedComponent;
};

/**
 * Private route only hoc
 *
 * @param {NextComponentType} Component
 * @param {string} [redirectUrl='/login']
 * @returns {NextComponentType}
 */
export const privateRouteWrapper = (Component: NextComponentType, redirectUrl = '/'): NextComponentType => {
    const WrappedComponent: FC<AuthProps> = ({ access_token, ...restProps }) => {
        const router = useRouter();
        const { reset } = useUserDataContext();

        useEffect(() => {
            // Always do navigations after the first render
            if (access_token) return;
            reset();
            // redirect if not auth
            router.push(redirectUrl);
        }, [access_token, router, reset]);

        // show loading when redirecting
        // if (!authToken) {
        //     return <div className="text-xl">Loading ...</div>;
        // }

        return <Component {...restProps} />;
    };

    return WrappedComponent;
};
