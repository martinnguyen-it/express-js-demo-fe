import { IUserData } from '@/src/contexts/UserContext';
import { useUpdateMe } from '@/src/lib/hooks/api/user/useUpdateMe';
import { ChangeEvent, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Spinner from '../../Spinner';
import { IMAGE_BASE_URL } from '@/src/shared/constants';
import imageCompression from 'browser-image-compression';
import { TUpdateMeType } from '@/src/lib/types/userType';
import _ from 'lodash';

interface IForm {
    email?: string;
    name?: string;
}

const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
};

const ChangeInfor = ({
    userData,
    setUserData,
}: {
    userData: IUserData;
    setUserData: React.Dispatch<React.SetStateAction<IUserData>>;
}) => {
    const updateMeApi = useUpdateMe();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>();

    const [imgFile, setImgFile] = useState<File | null>(null);
    const [imgFileURL, setImgFileURL] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleUpdate = useCallback(
        handleSubmit(async (data: IForm) => {
            const filteredObj = _.pickBy(data, _.identity);
            if (!_.isEmpty(filteredObj) || imgFile) {
                setError('');
                !data.email && (data.email = userData?.email);
                !data.name && (data.name = userData?.name);
                if (!imgFile) {
                    updateMeApi.sendRequest(
                        { payload: data },
                        {
                            onSuccess: async () => {
                                toast.success('Update successful!');
                                setUserData({ ...userData, ...data });
                            },
                            onError: (error) => {
                                toast.error(error.response?.data.message);
                            },
                        },
                    );
                } else {
                    const form = new FormData();
                    data.email && form.append('email', data.email);
                    data.name && form.append('name', data.name);
                    form.append('photo', imgFile);

                    await updateMeApi.sendRequest(
                        { payload: form as TUpdateMeType },
                        {
                            onSuccess: (res: any) => {
                                toast.success('Update successful!');
                                setUserData({ ...userData, ...data, photo: res.data.data.photo });
                            },
                            onError: (error) => {
                                toast.error(error.response?.data.message);
                            },
                        },
                    );
                    setImgFile(null);
                    setImgFileURL('');
                }
            } else {
                setError('You cannot leave all three fields blank.');
            }
        }),
        [imgFile, handleSubmit],
    );

    const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const compressedFile = await imageCompression(file, options);
            setImgFile(compressedFile);
            setImgFileURL(URL.createObjectURL(compressedFile));
        }
    };
    return (
        <div className='user-view__form-container'>
            <h2 className='heading-secondary ma-bt-md'>Your account settings</h2>
            <div className='form form-user-data'>
                <div className='form__group'>
                    <label className='form__label' htmlFor='name'>
                        Name
                    </label>
                    <input
                        className='form__input'
                        id='name'
                        type='text'
                        {...register('name')}
                        defaultValue={userData?.name}
                        name='name'
                    />
                    {errors.name && <p className='pl-[1rem] pt-1 text-2xl text-red-600'>{errors.name?.message}</p>}
                </div>
                <div className='form__group ma-bt-md'>
                    <label className='form__label' htmlFor='email'>
                        Email address
                    </label>
                    <input
                        className='form__input'
                        id='email'
                        type='email'
                        {...register('email', {
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address',
                            },
                        })}
                        defaultValue={userData?.email}
                        name='email'
                    />
                    {errors.email && <p className='pl-[1rem] pt-1 text-2xl text-red-600'>{errors.email?.message}</p>}
                </div>
                <div className='form__group ma-bt-md'>
                    <label className='form__label' htmlFor='role'>
                        Role
                    </label>
                    <input className='form__input !capitalize' id='role' disabled defaultValue={userData?.role} />
                </div>
                <div className='form__group form__photo-upload'>
                    {imgFileURL || (userData && userData.photo) ? (
                        <img
                            className='form__user-photo'
                            src={imgFileURL || `${IMAGE_BASE_URL}/img/users/${userData.photo}`}
                            alt='User'
                        />
                    ) : (
                        ''
                    )}
                    <input
                        onChange={onFileChange}
                        className='form__upload'
                        type='file'
                        accept='image/*'
                        id='photo'
                        name='photo'
                    />
                    <label htmlFor='photo'>Choose new photo</label>
                </div>
                {error && <p className='form__group pl-[1rem] pt-1 text-2xl text-red-600'>{error}</p>}
                <div className='form__group right'>
                    <button onClick={handleUpdate} className='btn btn--small btn--green btn--loading'>
                        {updateMeApi.isLoading ? <Spinner /> : ''}
                        <span>Save settings</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangeInfor;
