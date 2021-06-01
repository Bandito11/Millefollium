import { checkIfLoggedInFirebase, loginFirebase, logoutFirebase } from "./admin.db";

export async function loginIntoAPI({ email, password }) {
    try {
        await loginFirebase({ email: email, password: password });
    } catch (error) {
        throw error;
    }
}

export async function logoutOfAPI() {
    try {
        const res = await logoutFirebase();
        return res;
    } catch (error) {
        if (error === false) {
            return error;
        } else {
            throw error;
        }
    }
}

export async function checkIfLoggedIn() {
    return checkIfLoggedInFirebase();
}