import { getFirebaseCurrentUser } from "../api/food-tracker.firebase";
import { deleteProfileLocal, getProfileLocal, insertUpdateProfileLocal } from "../api/user-profile";
import { IProfile } from "../interfaces/IProfile";

export async function createProfile(profile: IProfile) {
    try {
        await insertUpdateProfileLocal(profile);
        return true;
    } catch (error) {
        throw error
    }
}

export async function insertUpdateProfile(profile: IProfile) {
    try {
        await insertUpdateProfileLocal(profile);
        return true;
    } catch (error) {
        throw error
    }
}

export async function deleteProfile() {
    try {
        await deleteProfileLocal();
        return true;
    } catch (error) {
        throw error
    }
}

export async function getProfile() {
    try {
        const result = await getProfileLocal();
        return result;
    } catch (error) {
        throw error
    }
}

export async function getCurrentUserId() {
    return getFirebaseCurrentUser();
}