import { SessionUser, User, UserRepository } from 'models/User';

/**
 * Предоставляет методы для работы с пользователями.
 */
export class UserService {
    userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Получает список задач.
     * @returns список задач.
     */
    getResponsibleUserByDirectorId(directorId: number): Promise<SessionUser[]> {
        return this.userRepository.getResponsibleUserByDirectorId(directorId);
    }
}
