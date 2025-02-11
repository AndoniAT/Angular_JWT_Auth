/**
 * Author: Andoni ALONSO TORT
 */

export interface UserType {
    _id?: string,
    createdAt?: string,
    updatedAt?: string,
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    roles: number[]
    password?: string,
    confirmPassword?: string
}

export interface UserAdminActionsType extends UserType {
    modify: () => void,
    delete: () => void
}

export enum CreateAccountAttributesType {
    username = "username",
    firstname = "firstname",
    lastname = "lastname",
    email = "email",
    password = "password",
    confirmPassword = "confirmPassword"
}

export interface UserCreateType {
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    confirmPassword:string
}