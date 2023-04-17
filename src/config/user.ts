import { STUB_PASSWORD_HASH } from 'config';

import { IUser } from 'models/User';

export const STUB_LOGIN = 'responsible';

export const STUB_USER: IUser = {
    id: 1,
    firstName: 'Иван',
    lastName: 'Иванов',
    patronymic: 'Иванович',
    login: 'responsible',
    passwordHash: STUB_PASSWORD_HASH,
    director: {
        id: 2,
        firstName: 'Пётр',
        lastName: 'Петров',
        patronymic: 'Петрович',
        login: 'director',
    },
};
