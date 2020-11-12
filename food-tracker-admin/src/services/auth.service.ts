import { login } from "./admin.db";

export async function loginIntoAPI({ email, password }) {
    try {
        await login({ email: email, password: password });
    } catch (error) {
        throw error;
    }
}

export async function logoutOfAPI() {
    try {
        const res = await logoutOfAPI();
        return res;
    } catch (error) {
        if (error === false) {
            return error;
        } else {
            throw error;
        }
    }
}