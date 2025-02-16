import { UserType } from "../interfaces/user";

const USERS = [
    {
        _id: '1',
        username: 'User1Test',
        firstname: 'admin',
        lastname: 'ADMIN',
        password: 'Admin?123',
        email: 'admin@exemple.com',
        roles: [ 1000, 2000 ]
    },
    {
        _id: '2',
        username: 'User2Test',
        firstname: 'User 2',
        lastname: 'Example',
        password: 'Admin?123',
        email: 'user2@example.com',
        roles: [ 2000 ]
    }
] as UserType[];

export default USERS;