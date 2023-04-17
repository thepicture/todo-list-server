import { STUB_LOGIN, STUB_USER } from 'config/user';

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    login: string;
    passwordHash: string;
    director?: ISessionUser;
}

export interface ISessionUser {
    id: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    login: string;
    director?: ISessionUser;
}

export interface IUserRepository {
    findByLogin: (login: string) => Promise<IUser>;
}

export class LoginNotFoundError extends Error {}
export class IncorrectPasswordError extends Error {}

export class UserRepository implements IUserRepository {
    async findByLogin(login: string): Promise<IUser> {
        return STUB_USER;
    }
}

export class StubUserRepository implements IUserRepository {
    async findByLogin(login: string): Promise<IUser> {
        if (login === STUB_LOGIN) {
            return STUB_USER;
        }

        throw new LoginNotFoundError(
            `пользователя с логином ${login} не существует`
        );
    }
}
