import Link from 'next/link';

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer__logo'>
                <img src='/img/logo-green.png' alt='Natour logo' />
            </div>
            <ul className='footer__nav'>
                <li>
                    <Link href='#'>About us</Link>
                </li>
                <li>
                    <Link href='#'>Download apps</Link>
                </li>
                <li>
                    <Link href='#'>Become a guide</Link>
                </li>
                <li>
                    <Link href='#'>Careers</Link>
                </li>
                <li>
                    <Link href='#'>Contact</Link>
                </li>
            </ul>
        </footer>
    );
};

export default Footer;
