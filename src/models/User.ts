import { AuthResponseMessages } from 'config/auth';
import { db } from 'config/database';
import { STUB_LOGIN, STUB_USER } from 'config/user';

import { responsibleSelector } from 'utils/selectors';

export type User = {
    id: number;

    firstName: string;
    lastName: string;
    patronymic: string;

    login: string;
    passwordHash: string;

    directorId: number;
    director?: SessionUser;
};

export type SessionUser = Omit<User, 'passwordHash'>;

export interface IUserRepository {
    findByLogin: (login: string) => Promise<User>;
    getResponsibleUserByDirectorId: (
        directorId: number
    ) => Promise<SessionUser[]>;
}

export class LoginNotFoundError extends Error {}
export class IncorrectPasswordError extends Error {}

export class UserRepository implements IUserRepository {
    async findByLogin(login: string): Promise<User> {
        const user = await db('user')
            .where({ login })
            .first()
            .then<User>((row) => row);

        if (!user) {
            throw new LoginNotFoundError(
                AuthResponseMessages.LOGIN_NOT_FOUND(login)
            );
        }

        return user;
    }

    async getResponsibleUserByDirectorId(
        directorId: number
    ): Promise<SessionUser[]> {
        return await db('user')
            .select(responsibleSelector)
            .where({ directorId })
            .then((rows) => rows);
    }
}

export class StubUserRepository implements IUserRepository {
    async findByLogin(login: string): Promise<User> {
        if (login === STUB_LOGIN) {
            return STUB_USER;
        }

        throw new LoginNotFoundError(
            AuthResponseMessages.LOGIN_NOT_FOUND(login)
        );
    }

    async getResponsibleUserByDirectorId(
        _directorId: number
    ): Promise<SessionUser[]> {
        return Promise.resolve([]);
    }
}
