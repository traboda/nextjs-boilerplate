// eslint-disable-next-line import/no-anonymous-default-export
export default {
    get: (key: string) => localStorage[key],
    put: (key: string, value: string) => localStorage[key] = value,
    has: (key: string) => key in localStorage,
    remove: (key: string) => localStorage.removeItem(key),
};