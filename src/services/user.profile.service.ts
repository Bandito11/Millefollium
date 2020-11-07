import { IProfile } from "../interfaces";
import { deleteProfileLocal, getProfileLocal, insertUpdateProfileLocal } from "./user.profile.local";

export async function createProfile(profile: IProfile) {
    try {
        await insertUpdateProfileLocal(profile);
        return true;
    } catch (error) {
        console.error(error);
    }
}

export async function insertUpdateProfile(profile: IProfile) {
    try {
        await insertUpdateProfileLocal(profile);
        return true;
    } catch (error) {
        console.error(error);
    }
}

export async function deleteProfile() {
    try {
        await deleteProfileLocal();
        return true;
    } catch (error) {
        console.error(error);
    }
}

export async function getProfile() {
    try {
        const result = await getProfileLocal();
        return result;
    } catch (error) {
        return {
            gender: 'male',
            age: null,
            weight: null,
            height: null,
            neck: null,
            waist: null,
            weighLoss: null
        };
    }
}