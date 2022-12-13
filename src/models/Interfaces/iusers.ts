export interface User_md {
    id?: number
    firstname: string
    lastname: string
    username: string
    password: string
}
export interface UserAut_md extends User_md {
    auth: boolean
    token: string
}
