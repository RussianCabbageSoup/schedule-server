export const validateString = (str: string, trimmed = true): string | null => {
    if (!str || typeof str !== 'string' || !str.trim()) return null;
    if (trimmed) return str.trim();
    return str;
};

interface ValidatorResponse {
    message: string;
    isPass: boolean;
    password: string;
};

export const validatePassword = (str: string): ValidatorResponse => {
    const response = { message: 'OK', isPass: false, password: str };
    const setError = (msg: string) => ({ ...response, message: msg });

    if (!str || typeof str !== 'string' || !str.trim()) {
        return setError('Пароль не может быть пустым');
    }

    if (str.length < 8) return setError('Минимум 8 символов');

    return { ...response, isPass: true };
};