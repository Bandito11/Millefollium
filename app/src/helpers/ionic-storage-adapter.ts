import { Storage } from '@ionic/storage';

const store = new Storage();

await store.create();

export function IonicStorageAdapter() {}

IonicStorageAdapter.prototype.loadDatabase = async function (
  dbName: string,
  callback: Function
) {
  const data = await store.get(dbName);
  callback(data);
};

IonicStorageAdapter.prototype.saveDatabase = async function (
  dbName: string,
  dbString: string,
  callback: Function
) {
  await store.set(dbName, dbString);
  callback(null);
};

IonicStorageAdapter.prototype.deleteDatabase = async function deleteDatabase(
  dbName: string,
  callback: Function
) {
  await store.remove(dbName);
  callback(null);
};
