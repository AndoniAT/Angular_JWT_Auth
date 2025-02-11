export interface AccesTokenDecodedType {
    user: AuthUserType
}

export interface AuthUserType {
    username:string,
    email:string,
    roles:number[]
}