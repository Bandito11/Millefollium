import { Filesystem, FilesystemDirectory, FilesystemEncoding } from "@capacitor/core";

const directoryName = 'database';

createDirectory();

async function createDirectory() {
    Filesystem.mkdir({
        path: directoryName,
        directory: FilesystemDirectory.Documents,
        createIntermediateDirectories: false // like mkdir -p
    })
    .catch(e => console.error('Unable to make directory', e));
}

export function CapacitorFileLokiAdapter() { }

CapacitorFileLokiAdapter.prototype.loadDatabase = async function loadDatabase(dbname, callback) {
    try {
        const contents = await Filesystem.readFile({
            path: `${directoryName}/${dbname}.txt`,
            directory: FilesystemDirectory.Documents,
            encoding: FilesystemEncoding.UTF8
        });
        callback(contents.data);
    } catch (error) {
        callback(new Error(error));
    }

};

CapacitorFileLokiAdapter.prototype.saveDatabase = function saveDatabase(dbname, dbstring, callback) {
    Filesystem.writeFile({
        path: `${directoryName}/${dbname}.txt`,
        data: dbstring,
        directory: FilesystemDirectory.Documents,
        encoding: FilesystemEncoding.UTF8
    })
        .then(_ => callback(null))
        .catch(e => callback(new Error('Unable to write file' + e)));
};

CapacitorFileLokiAdapter.prototype.deleteDatabase = function deleteDatabase(dbname, callback) {

    Filesystem.deleteFile({
        path: `${directoryName}/${dbname}.txt`,
        directory: FilesystemDirectory.Documents
    })
        .then(_ => callback(null))
        .catch(error => callback(new Error(error)));
};
