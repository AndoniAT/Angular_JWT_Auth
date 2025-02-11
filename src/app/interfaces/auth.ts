export interface AccesTokenDecodedType {
    user: AuthUserType
}

export interface AuthUserType {
    username:string,
    email:string,
    roles:number[]
}

export interface RolesType {
    admin: number,
    user: number
}