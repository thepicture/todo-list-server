export class AuthResponseMessages {
    static LOGIN_NOT_FOUND = (login: string) =>
        Boolean(login)
            ? `пользователя с логином ${login} не существует`
            : `логин не указан`;
    static INCORRECT_PASSWORD = 'неверный пароль';
}
