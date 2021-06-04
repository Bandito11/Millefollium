import { IProfile } from '../interfaces/IProfile';
import { profileColl, profileView } from './loki-db';

export function remove(profile: IProfile) {
  const result = profileColl.findOne(profile);
  if (result) {
    const removed = profileColl.remove(result);
    return removed;
  } else {
    throw new Error(`Profile couldn't be found in database.`);
  }
}

export function insertUpdate(profile: IProfile) {
  const result = profileColl.findOne(profile);
  if (result) {
    const record = profileColl.update({
      ...result,
      ...profile,
    });
    return { record: record, message: `Profile was updated.` };
  } else {
    const record = profileColl.insertOne(profile);
    return { record: record, message: `Profile was added!` };
  }
}

export function get() {
  profileView.removeFilters();
  const result = profileView.data();
  if (result.length !== 1) {
    throw new Error(
      `There were too many value for profile in database. Please verify validity of the database.`
    );
  }
  return result[0];
}
