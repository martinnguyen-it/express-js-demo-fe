import Spinner from '@/src/components/Spinner';
import { IUserData } from '@/src/contexts/UserContext';
import { FormResetPasswordSchema } from '@/src/lib/domain/formUser';
import { useResetPassword } from '@/src/lib/hooks/api';
import { useUserDataContext } from '@/src/lib/hooks/context';
import { TResetPasswordType } from '@/src/lib/types/userType';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const router = useRouter();
    const { id } = router.query;

    const { userData, setUserData, access_token } = useUserDataContext();

    if (userData && userData.name && access_token) router.push('/');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TResetPasswordType>({
        resolver: yupResolver(FormResetPasswordSchema),
    });
    const resetPasswordApi = useResetPassword();

    const handleResetPassword = useCallback(
        handleSubmit(async (data: TResetPasswordType) => {
            resetPasswordApi.sendRequest(
                { payload: data, tokenResetPassword: id as string },
                {
                    onSuccess: async (respon: any) => {
                        toast.success('Reset password successful!');
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
        [id],
    );

    return (
        <main className='main'>
            <div className='login-form'>
                <h2 className='heading-secondary ma-bt-lg'>Create your account!</h2>
                <div className='form form--login'>
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
                        <button onClick={handleResetPassword} className='btn btn--green btn--loading'>
                            {resetPasswordApi.isLoading && <Spinner />}
                            <p>Reset password</p>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ResetPassword;
