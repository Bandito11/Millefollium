import { remove, get, insertUpdate } from '../database/user-profile';
import { IProfile } from '../interfaces/IProfile';

export async function createUpdateProfile(profile: IProfile) {
  try {
    const result = await insertUpdate(profile);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteProfile(profile: IProfile) {
  try {
    const result = await remove(profile);
    return result;
  } catch (error) {
    throw error;
  }
}

export function getProfile() {
  try {
    const result = get();
    return result;
  } catch (error) {
    throw error;
  }
}
