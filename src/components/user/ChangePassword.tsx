import { IUserData } from '@/src/contexts/UserContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormUpdatePasswordSchema } from '../../lib/domain/formUser';
import { TUpdatePasswordType } from '@/src/lib/types/userType';
import { useUpdatePassword } from '@/src/lib/hooks/api/user/useUpdatePassword';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';

const ChangePassword = ({ setUserData }: { setUserData: React.Dispatch<React.SetStateAction<IUserData>> }) => {
    const updatePassword = useUpdatePassword();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TUpdatePasswordType>({
        resolver: yupResolver(FormUpdatePasswordSchema),
    });
    const handleUpdatePassword = useCallback(
        handleSubmit((data: TUpdatePasswordType) => {
            updatePassword.sendRequest(
                { payload: data },
                {
                    onSuccess: async (respon: any) => {
                        reset();
                        setUserData((prev) => ({ ...prev, token: respon.data.token }));
                        toast.success('Update successful!');
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
        <div className='user-view__form-container'>
            <h2 className='heading-secondary ma-bt-md'>Password change</h2>
            <div className='form form-user-password'>
                <div className='form__group'>
                    <label className='form__label' htmlFor='password'>
                        Current password
                    </label>
                    <input
                        className='form__input'
                        id='password'
                        type='password'
                        placeholder=''
                        {...register('password')}
                    />
                    {errors.password && (
                        <p className='pl-[1rem] pt-1 text-2xl text-red-600'>{errors.password?.message}</p>
                    )}
                </div>
                <div className='form__group'>
                    <label className='form__label' htmlFor='newPassword'>
                        New password
                    </label>
                    <input
                        className='form__input'
                        id='newPassword'
                        type='password'
                        placeholder=''
                        {...register('newPassword')}
                    />
                    {errors.newPassword && (
                        <p className='pl-[1rem] pt-1 text-2xl text-red-600'>{errors.newPassword?.message}</p>
                    )}
                </div>
                <div className='form__group ma-bt-lg'>
                    <label className='form__label' htmlFor='newPasswordConfirm'>
                        Confirm password
                    </label>
                    <input
                        className='form__input'
                        id='newPasswordConfirm'
                        type='password'
                        placeholder=''
                        {...register('newPasswordConfirm')}
                    />
                    {errors.newPasswordConfirm && (
                        <p className='pl-[1rem] pt-1 text-2xl text-red-600'>{errors.newPasswordConfirm?.message}</p>
                    )}
                </div>
                <div className='form__group right'>
                    <button
                        onClick={handleUpdatePassword}
                        className='btn btn--small btn--loading btn--green btn--save-password'
                    >
                        {updatePassword.isLoading ? <Spinner /> : ''}
                        <span>Save password</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
