export class AuthResponseMessages {
    static LOGIN_NOT_FOUND = (login: string) =>
        `пользователя с логином ${login} не существует`;
    static INCORRECT_PASSWORD = 'неверный пароль';
}
