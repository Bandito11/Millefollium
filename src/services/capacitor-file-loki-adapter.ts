import { Filesystem, FilesystemDirectory, FilesystemEncoding } from "@capacitor/core";

let directoryName = 'database';

async function createDirectory() {
    try {
        await Filesystem.mkdir({
            path: directoryName,
            directory: FilesystemDirectory.Documents,
            createIntermediateDirectories: false // like mkdir -p
        });
    } catch (e) {
        console.error('Unable to make directory', e);
    }
}

createDirectory();

export function CapacitorFileLokiAdapter() { }

CapacitorFileLokiAdapter.prototype.loadDatabase = async function loadDatabase(dbname, callback) {
    try {
        let contents = await Filesystem.readFile({
            path: `${directoryName}/${dbname}.txt`,
            directory: FilesystemDirectory.Documents,
            encoding: FilesystemEncoding.UTF8
        });
        callback(contents.data);
    } catch (error) {
        callback(new Error(error));
    }

};


CapacitorFileLokiAdapter.prototype.saveDatabase = async function saveDatabase(dbname, dbstring, callback) {
    try {
        await Filesystem.writeFile({
            path: `${directoryName}/${dbname}.txt`,
            data: dbstring,
            directory: FilesystemDirectory.Documents,
            encoding: FilesystemEncoding.UTF8
        });
        callback(null);
    } catch (e) {
        callback(new Error('Unable to write file' + e));
    }
};

CapacitorFileLokiAdapter.prototype.deleteDatabase = async function deleteDatabase(dbname, callback) {
    try {
        await Filesystem.deleteFile({
            path: `${directoryName}/${dbname}.txt`,
            directory: FilesystemDirectory.Documents
        });
        callback(null);
    } catch (error) {
        callback(new Error(error));
    }
};
