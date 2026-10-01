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

export const validateDate = (date: string): string | null => {
    if (!date || typeof date !== 'string') return null;

    const trimmed = date.trim();
    if (!trimmed) return null;

    const p = trimmed.split('T');
    if (p.length !== 2 || !p[0] || !p[1]) return null;

    const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
    const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(\.\d{3})?Z$/;

    if (!DATE_REGEX.test(p[0])) return null;
    if (!TIME_REGEX.test(p[1])) return null;

    const d = new Date(trimmed);
    if (Number.isNaN(d.getTime())) return null;

    const [yStr, mStr, dStr] = p[0].split('-');
    const y = Number(yStr);
    const m = Number(mStr);
    const day = Number(dStr);

    if (
        d.getUTCFullYear() !== y ||
        d.getUTCMonth() + 1 !== m ||
        d.getUTCDate() !== day
    ) {
        return null;
    }

    return d.toISOString();
};

export const validateBool = (bool: boolean): boolean | null => {
    if (typeof bool !== 'boolean') return null;
    return bool;
};