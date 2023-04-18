import bcrypt from 'bcrypt';
import { AuthResponseMessages } from 'config/auth';

import {
    ISessionUser,
    IUserRepository,
    IncorrectPasswordError,
} from 'models/User';

interface IAuthService {
    tryGetUserByLoginAndPassword: (
        login: string,
        password: string
    ) => Promise<ISessionUser>;
}

/**
 * Валидатор логина и пароля.
 */
export class AuthService implements IAuthService {
    userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Пытается получить пользователя по логину и паролю.
     * @param login логин.
     * @param password пароль.
     * @returns `true`, если реквизиты существуют, иначе `false`.
     */
    async tryGetUserByLoginAndPassword(
        login: string,
        password: string
    ): Promise<ISessionUser> {
        const user = await this.userRepository.findByLogin(login);

        const doPasswordMatch = bcrypt.compareSync(password, user.passwordHash);

        if (!doPasswordMatch) {
            throw new IncorrectPasswordError(
                AuthResponseMessages.INCORRECT_PASSWORD
            );
        }

        return {
            id: 1,
            firstName: 'Иван',
            lastName: 'Иванов',
            patronymic: 'Иванович',
            login: 'responsible',
            director: {
                id: 2,
                firstName: 'Пётр',
                lastName: 'Петров',
                patronymic: 'Петрович',
                login: 'director',
            },
        };
    }
}
