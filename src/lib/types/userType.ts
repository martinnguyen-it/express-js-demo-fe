export type TAuthType = {
    email: string;
    password: string;
};

export type TSignUpType = {
    email: string;
    password: string;
    passwordConfirm: string;
    name: string;
    photo?: File | Blob;
};

export type TUpdateMeType = {
    email?: string;
    name?: string;
    photo?: File | Blob;
};

export type TUpdatePasswordType = {
    password: string;
    newPassword: string;
    newPasswordConfirm: string;
};
