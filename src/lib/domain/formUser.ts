import * as yup from 'yup';

export const FormLoginSchema = yup.object({
    email: yup.string().required('Email is required').email('Email is invalid'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export const FormSignUpSchema = yup.object({
    email: yup.string().required('Email is required').email('Email is invalid'),
    name: yup.string().required('Name is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    passwordConfirm: yup
        .string()
        .required('Password confirm is required')
        .min(8, 'Password confirm must be at least 8 characters')
        .oneOf([yup.ref('password')], 'Passwords must match'),
});

export type FormLoginSchemaType = yup.InferType<typeof FormLoginSchema>;

export const FormUpdateUserSchema = yup.object({
    email: yup.string().optional().email('Email is invalid'),
    name: yup.string().optional(),
});

export type FormUpdateUserSchemaType = yup.InferType<typeof FormUpdateUserSchema>;

export const FormUpdatePasswordSchema = yup.object({
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    newPassword: yup.string().required('New password is required').min(8, 'New password must be at least 8 characters'),
    newPasswordConfirm: yup
        .string()
        .required('Password confirm is required')
        .min(8, 'Password confirm must be at least 8 characters')
        .oneOf([yup.ref('newPassword')], 'Passwords must match'),
});

export type FormUpdatePasswordSchemaType = yup.InferType<typeof FormUpdatePasswordSchema>;
