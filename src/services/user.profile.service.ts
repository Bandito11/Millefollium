import { IProfile } from "../interfaces";
import { deleteProfileLocal, getProfileLocal, insertUpdateProfileLocal } from "./user.profile.local";

export async function createProfile(profile: IProfile) {
    try {
        await insertUpdateProfileLocal(profile);
        return true;
    } catch (error) {
        throw new Error(error);
    }
}

export async function insertUpdateProfile(profile: IProfile) {
    try {
        await insertUpdateProfileLocal(profile);
        return true;
    } catch (error) {
        throw new Error(error);
    }
}

export async function deleteProfile() {
    try {
        await deleteProfileLocal();
        return true;
    } catch (error) {
       throw new Error(error);
    }
}

export async function getProfile() {
    try {
        const result = await getProfileLocal();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}