export interface allListProps {
    _id: string;
    title: string;
    description: string;
    image: string;
    status: number;
    data: string
}
export interface ListProps extends allListProps {
    user: allListProps
}
export interface allDeleteProps {
    id: string;
    token: string;
    message: string;
    status: number;
    title: string;
    description: string;
}
export interface DeleteProps extends allDeleteProps {
    user: DeleteProps
}
export interface allCreate {
    token: string;
    message: string;
    status: number;
    title: string;
    description: string;
    image: string;
    user?: Record<string, any>;
}
export interface CreateProps extends allCreate{
    user: CreateProps
}
export interface allUpdate{
    id: string;
    token: string;
    message: string;
    status: number;
    title: string;
    description: string;
}
export interface UpdateProps extends allUpdate{
    user: UpdateProps
}
export interface allDetails{
    id: string;
    token: string;
    message: string;
    status: number;
    title: string;
    description: string;
    image: string
}
export interface DetailProps extends allDetails{
    user: DetailProps
}
export interface IProfile{
    id: string;
    token: string;
    message: string;
    status: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    profile_pic: string
}