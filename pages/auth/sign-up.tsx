import Spinner from '@/src/components/Spinner';
import { IUserData } from '@/src/contexts/UserContext';
import { FormSignUpSchema } from '@/src/lib/domain/formUser';
import { useSignUp } from '@/src/lib/hooks/api';
import { useUserDataContext } from '@/src/lib/hooks/context';
import { TSignUpType } from '@/src/lib/types/userType';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const SignUp = () => {
    const router = useRouter();
    const { userData, setUserData, access_token } = useUserDataContext();

    if (userData && userData.name && access_token) router.push('/');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TSignUpType>({
        resolver: yupResolver(FormSignUpSchema),
    });
    const signup = useSignUp();

    const handleLogin = useCallback(
        handleSubmit(async (data: TSignUpType) => {
            signup.sendRequest(
                { payload: data },
                {
                    onSuccess: async (respon: any) => {
                        toast.success('Signup successful!');
                        const user = {
                            name: respon.data.data.user.name,
                            email: respon.data.data.user.email,
                            photo: respon.data.data.user?.photo,
                            role: respon.data.data.user.role,
                            access_token: respon.data.access_token,
                        } as IUserData;

                        await setUserData(user);
                        reset();
                    },
                    onError: (error) => {
                        toast.error(error.response?.data.message);
                    },
                },
            );
        }),
        [],
    );

    return (
        <main className='main'>
            <div className='login-form'>
                <h2 className='heading-secondary ma-bt-lg'>Create your account!</h2>
                <div className='form form--login'>
                    <div className='form__group'>
                        <label className='form__label' htmlFor='email'>
                            Your name
                        </label>
                        <input
                            className='form__input'
                            id='name'
                            {...register('name')}
                            type='name'
                            placeholder='Nguyen Van An'
                        />
                        {errors.name && <p className='pl-[1rem] pt-1 text-2xl text-red-600'>{errors.name?.message}</p>}
                    </div>
                    <div className='form__group'>
                        <label className='form__label' htmlFor='email'>
                            Email address
                        </label>
                        <input
                            className='form__input'
                            id='email'
                            {...register('email')}
                            type='email'
                            placeholder='you@example.com'
                        />
                        {errors.email && (
                            <p className='pl-[1rem] pt-1 text-2xl text-red-600'>{errors.email?.message}</p>
                        )}
                    </div>
                    <div className='form__group ma-bt-md'>
                        <label className='form__label' htmlFor='password'>
                            Password
                        </label>
                        <input
                            {...register('password')}
                            className='form__input'
                            id='password'
                            type='password'
                            placeholder=''
                        />
                        {errors.password && (
                            <p className='pl-[1rem]  pt-1 text-2xl text-red-600'>{errors.password?.message}</p>
                        )}
                    </div>
                    <div className='form__group ma-bt-md'>
                        <label className='form__label' htmlFor='passwordConfirm'>
                            Confirm password
                        </label>
                        <input
                            {...register('passwordConfirm')}
                            className='form__input'
                            id='passwordConfirm'
                            type='password'
                            placeholder=''
                        />
                        {errors.passwordConfirm && (
                            <p className='pl-[1rem]  pt-1 text-2xl text-red-600'>{errors.passwordConfirm?.message}</p>
                        )}
                    </div>
                    <div className='form__group'>
                        <button onClick={handleLogin} className='btn btn--green btn--loading'>
                            {signup.isLoading && <Spinner />}
                            <p>Sign up</p>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SignUp;
