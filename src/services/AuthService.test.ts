import { STUB_LOGIN } from 'config';

import {
    IncorrectPasswordError,
    LoginNotFoundError,
    StubUserRepository,
} from 'models/User';

import { AuthService } from './AuthService';

describe('auth service', () => {
    const authService = new AuthService(new StubUserRepository());

    it('when login is incorrect then throws LoginNotFoundError', async () => {
        const expected = LoginNotFoundError;
        const user = {
            login: '_responsible',
            password: '123',
        };

        const actual = () =>
            authService.tryGetUserByLoginAndPassword(user.login, user.password);

        await expect(actual()).rejects.toThrow(expected);
    });

    it('when login is correct but stub password is not then throws IncorrectPasswordError', async () => {
        const expected = IncorrectPasswordError;
        const user = {
            login: STUB_LOGIN,
            password: '_123',
        };

        const actual = () =>
            authService.tryGetUserByLoginAndPassword(user.login, user.password);

        await expect(actual()).rejects.toThrow(expected);
    });

    it('when login is correct and password is correct then returns User', async () => {
        const expected = {
            firstName: 'Иван',
            lastName: 'Иванов',
            patronymic: 'Иванович',
            login: 'responsible',
            director: {
                firstName: 'Пётр',
                lastName: 'Петров',
                patronymic: 'Петрович',
                login: 'director',
            },
        };

        const user = {
            login: STUB_LOGIN,
            password: '123',
        };

        const actual = await authService.tryGetUserByLoginAndPassword(
            user.login,
            user.password
        );

        expect(actual).toMatchObject(expected);
    });
});
