export interface IloginProps {
    email: string,
    password: string,
    token: string,
    message: string,
    status: number
}
export interface IregisterProps {
    name: string,
    email: string,
    mobile: string,
    password: string,
    photo: FileList,
    token: string,
    message: string,
    status: number
}
export interface loginProps extends IloginProps {
    user: loginProps
}

export interface registerProps extends IregisterProps {
    user: registerProps
}