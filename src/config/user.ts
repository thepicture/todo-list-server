import { STUB_PASSWORD_HASH } from 'config';

import { User } from 'models/User';

export const STUB_LOGIN = 'responsible';

export const STUB_USER: User = {
    id: 1,
    firstName: 'Иван',
    lastName: 'Иванов',
    patronymic: 'Иванович',
    login: 'responsible',
    passwordHash: STUB_PASSWORD_HASH,
    directorId: 2,
    director: {
        id: 2,
        firstName: 'Пётр',
        lastName: 'Петров',
        patronymic: 'Петрович',
        login: 'director',
        directorId: null,
    },
};
