import bcrypt from 'bcrypt';
import { AuthResponseMessages } from 'config/auth';

import {
    IUserRepository,
    IncorrectPasswordError,
    SessionUser,
    UserRepository,
} from 'models/User';

/**
 * Валидатор логина и пароля.
 */
export class AuthService {
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
    ): Promise<SessionUser> {
        const user = await this.userRepository.findByLogin(login);

        const doPasswordMatch = bcrypt.compareSync(password, user.passwordHash);

        if (!doPasswordMatch) {
            throw new IncorrectPasswordError(
                AuthResponseMessages.INCORRECT_PASSWORD
            );
        }

        return user;
    }
}
