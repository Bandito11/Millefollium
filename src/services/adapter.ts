import { CapacitorDataStorageSqlite } from 'capacitor-data-storage-sqlite';

/**
 * A loki persistence adapter which persists to web browser's local storage object
 * @constructor CapacitorStorageAdapter
 */
export function CapacitorStorageAdapter() { }

/**
 * loadDatabase() - Load data from IonicStorage
 * @param {string} dbname - the name of the database to load
 * @param {function} callback - the callback to handle the result
 * @memberof CapacitorStorageAdapter
 */
CapacitorStorageAdapter.prototype.loadDatabase = function loadDatabase(dbname, callback) {
    CapacitorDataStorageSqlite.get({ key: dbname })
        .then(data => {
            callback(data.value);
        });
};

/**
 * saveDatabase() - save data to IonicStorage, will throw an error if the file can't be saved
 * might want to expand this to avoid dataloss on partial save
 * @param {string} dbname - the filename of the database to load
 * @param {function} callback - the callback to handle the result
 * @memberof CapacitorStorageAdapter
 */
CapacitorStorageAdapter.prototype.saveDatabase = function saveDatabase(dbname, dbstring, callback) {
    CapacitorDataStorageSqlite.set({ key: dbname, value: dbstring });
    callback(null);
};

/**
 * deleteDatabase() - delete the database from IonicStorage, will throw an error if it
 * can't be deleted
 * @param {string} dbname - the filename of the database to delete
 * @param {function} callback - the callback to handle the result
 * @memberof CapacitorStorageAdapter
 */
CapacitorStorageAdapter.prototype.deleteDatabase = function deleteDatabase(dbname, callback) {
    CapacitorDataStorageSqlite.remove({ key: dbname });
    callback(null);
};
