import Spinner from '@/src/components/Spinner';
import { IUserData } from '@/src/contexts/UserContext';
import { FormLoginSchema } from '@/src/lib/domain/formUser';
import { useLogin } from '@/src/lib/hooks/api/auth/useLogin';
import { useUserDataContext } from '@/src/lib/hooks/context';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
interface IForm {
    email: string;
    password: string;
}
const Login = () => {
    const router = useRouter();
    const { userData, setUserData, token, setToken } = useUserDataContext();

    if (userData && userData.name && token) router.push('/');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IForm>({
        resolver: yupResolver(FormLoginSchema),
    });
    const loginUser = useLogin();
    const handleLogin = useCallback(
        handleSubmit(async (data: IForm) => {
            loginUser.sendRequest(
                { payload: data },
                {
                    onSuccess: async (respon: any) => {
                        toast.success('Login successful!');
                        const user = {
                            name: respon.data.data.user.name,
                            email: respon.data.data.user.email,
                            photo: respon.data.data.user?.photo,
                            role: respon.data.data.user.role,
                        } as IUserData;
                        await setToken(respon.data.token);
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
                <h2 className='heading-secondary ma-bt-lg'>Log into your account</h2>
                <form className='form form--login'>
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
                    <div className='form__group'>
                        <button onClick={handleLogin} className='btn btn--green btn--loading'>
                            {loginUser.isLoading && <Spinner />}
                            <p>Login</p>
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Login;
