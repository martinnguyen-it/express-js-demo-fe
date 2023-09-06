import { privateRouteWrapper, withAuthTokenWrapper } from '@/src/components/hoc/auth';
import ChangeInfor from '@/src/components/pages/me/ChangeInfor';
import ChangePassword from '@/src/components/pages/me/ChangePassword';
import { queryFunctionAuth } from '@/src/lib/hooks/api';
import { useUserDataContext } from '@/src/lib/hooks/context';
import Link from 'next/link';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

const Me = () => {
    const { userData, setUserData } = useUserDataContext();
    const { data: respon, isSuccess } = useQuery('users/me', queryFunctionAuth);
    const role = useMemo(() => {
        if (isSuccess && respon && respon.data && respon.data.data) {
            return respon.data.data.role;
        }
        return '';
    }, [respon]);

    return (
        <main className='main'>
            <div className='user-view'>
                <nav className='user-view__menu'>
                    <ul className='side-nav'>
                        <li className='side-nav--active'>
                            <Link href='#'>
                                <svg>
                                    <use xlinkHref='img/icons.svg#icon-settings'></use>
                                </svg>
                                Settings
                            </Link>
                        </li>
                        <li>
                            <Link href='/my-tours'>
                                <svg>
                                    <use xlinkHref='img/icons.svg#icon-briefcase'></use>
                                </svg>
                                My bookings
                            </Link>
                        </li>
                        <li>
                            <Link href='#'>
                                <svg>
                                    <use xlinkHref='img/icons.svg#icon-star'></use>
                                </svg>
                                My reviews
                            </Link>
                        </li>
                        <li>
                            <Link href='#'>
                                <svg>
                                    <use xlinkHref='img/icons.svg#icon-credit-card'></use>
                                </svg>
                                Billing
                            </Link>
                        </li>
                    </ul>

                    {role === 'admin' ? (
                        <div className='admin-nav'>
                            <h5 className='admin-nav__heading font-bold'>Admin</h5>
                            <ul className='side-nav'>
                                <li>
                                    <Link href='/'>
                                        <svg>
                                            <use xlinkHref='img/icons.svg#icon-map'></use>
                                        </svg>
                                        Manage tours
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/'>
                                        <svg>
                                            <use xlinkHref='img/icons.svg#icon-users'></use>
                                        </svg>
                                        Manage users
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/'>
                                        <svg>
                                            <use xlinkHref='img/icons.svg#icon-star'></use>
                                        </svg>
                                        Manage reviews
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/'>
                                        <svg>
                                            <use xlinkHref='img/icons.svg#icon-briefcase'></use>
                                        </svg>
                                        Manage bookings
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        ''
                    )}
                </nav>
                <div className='user-view__content'>
                    <ChangeInfor userData={userData} setUserData={setUserData} />
                    <div className='line'>&nbsp;</div>
                    <ChangePassword setUserData={setUserData} />
                </div>
            </div>
        </main>
    );
};

export default withAuthTokenWrapper(privateRouteWrapper(Me));
