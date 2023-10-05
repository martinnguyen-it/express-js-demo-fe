import Spinner from '@/src/components/Spinner';
import { useForgotPassword } from '@/src/lib/hooks/api';
import { useUserDataContext } from '@/src/lib/hooks/context';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface IForm {
    email: string;
}
const ForgotPassword = () => {
    const router = useRouter();
    const { userData, access_token } = useUserDataContext();

    if (userData && userData.name && access_token) router.push('/');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>();

    const forgotPassword = useForgotPassword();

    const onSubmit = useCallback(
        handleSubmit(async (data: IForm) => {
            forgotPassword.sendRequest(
                { payload: data },
                {
                    onSuccess: async () => {
                        toast.success('Send successful!');
                        setTimeout(() => {
                            router.push('/');
                        }, 5000);
                    },
                    onError: (error) => {
                        toast.error(error.response?.data.message);
                    },
                },
            );
        }),
        [handleSubmit],
    );

    return (
        <main className='main'>
            <div className='login-form'>
                <h2 className='heading-secondary ma-bt-lg'>Forgot your password</h2>
                <div className={`form form--login ${forgotPassword.isSuccess ? 'hidden' : ''}`}>
                    <div className='form__group'>
                        <label className='form__label' htmlFor='email'>
                            Email address
                        </label>
                        <input
                            className='form__input'
                            id='email'
                            {...register('email', {
                                required: 'Email is required.',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                            type='email'
                            placeholder='you@example.com'
                        />
                        {errors.email && (
                            <p className='pl-[1rem] pt-1 text-2xl text-red-600'>{errors.email?.message}</p>
                        )}
                    </div>
                    <div className='form__group'>
                        <button onClick={onSubmit} className='btn btn--green btn--loading'>
                            {forgotPassword.isLoading && <Spinner />}
                            <p>Send my reset link</p>
                        </button>
                    </div>
                </div>
                {forgotPassword && forgotPassword.isSuccess && (
                    <p className='text-3xl leading-[3.25rem]'>
                        An email with your password reset link has been sent, if the provided email address is
                        registered with us.
                    </p>
                )}
            </div>
        </main>
    );
};

export default ForgotPassword;
