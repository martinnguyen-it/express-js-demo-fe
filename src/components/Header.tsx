import Link from 'next/link';
import { useUserDataContext } from '../lib/hooks/context';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { IMAGE_BASE_URL } from '../shared/constants';

const Header = () => {
    const router = useRouter();

    const { userData, token, reset } = useUserDataContext();

    const logout = useCallback(async () => {
        toast.success('Logout successful!');
        await reset();
        router.push('/');
    }, []);

    return (
        <header className='header'>
            <nav className='nav nav--tours'>
                <Link href='/' className='nav__el'>
                    All tours
                </Link>
            </nav>
            <div className='header__logo'>
                <img src='/img/logo-white.png' alt='Natours logo' />
            </div>
            <nav className='nav nav--user'>
                {userData && userData.name && token ? (
                    <>
                        <Link href='/me' className='nav__el'>
                            <img
                                src={`${IMAGE_BASE_URL}/img/users/${userData.photo}`}
                                alt='User'
                                className='nav__user-img'
                            />
                            <span>{userData.name}</span>
                        </Link>
                        <button onClick={logout} className='nav__el nav__el--cta'>
                            LOGOUT
                        </button>
                    </>
                ) : (
                    <>
                        <Link href={'/auth/login'} className='nav__el'>
                            Log in
                        </Link>
                        <Link href={'/auth/sign-up'} className='nav__el nav__el--cta'>
                            Sign up
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
