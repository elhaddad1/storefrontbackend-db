export interface User_md {
    id?: number
    first_name: string
    last_name: string
    username: string
    password?: string
    password_digest?: string
}
export interface UserAut_md extends User_md {
    auth: boolean
    token: string
}
