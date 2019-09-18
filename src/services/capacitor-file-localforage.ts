import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';

const { Filesystem } = Plugins;

import localforage from 'localforage';

const directoryName = 'database';

//Create custom driver for localforage
const capacitorFileDriver = {
    _driver: 'capacitorFileDriver',
    _initStorage: async function (options) {
        const self = this;
        const dbInfo = {};
        if (options) {
            for (var i in options) {
                dbInfo[i] = options[i];
            }
        }

        self._dbInfo = dbInfo;

        try {
            await Filesystem.mkdir({
                path: directoryName,
                directory: FilesystemDirectory.Documents,
                createIntermediateDirectories: false // like mkdir -p
            });
        } catch (e) {
            console.error('Unable to make directory', e);
        }
    },
    clear: async function (callback): Promise<any> {
        try {
            let result = await Filesystem.rmdir({
                path: directoryName,
                directory: FilesystemDirectory.Documents
            });
            callback(result)
        } catch (e) {
            callback(e);
        }
    },
    getItem: async function (key): Promise<any> {
        try {
            let contents = await Filesystem.readFile({
                path: `${directoryName}/${key}.txt`,
                directory: FilesystemDirectory.Documents,
                encoding: FilesystemEncoding.UTF8
            });
            return Promise.resolve(contents.data);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    iterate: async function (iteratorCallback, successCallback): Promise<any> {
        try {
            let result = await Filesystem.readdir({
                path: directoryName,
                directory: FilesystemDirectory.Documents
            });
            if (result.files.length === 0) {
                iteratorCallback(undefined);
            } else {
                let iterationNumber = 0;
                let value = '';
                let key = '';
                for (const fileName of result.files) {
                    let contents = await Filesystem.readFile({
                        path: `${directoryName}/${fileName}`,
                        directory: FilesystemDirectory.Documents,
                        encoding: FilesystemEncoding.UTF8
                    });
                    iterationNumber++;
                    iteratorCallback(contents.data, fileName, iterationNumber);
                    key = fileName;
                    value = contents.data;
                };
                successCallback(value, key, iterationNumber);
            }
        } catch (e) {
            iteratorCallback(undefined);
        }

    },
    key: async function (n, callback): Promise<any> {
        try {
            let result = await Filesystem.readdir({
                path: directoryName,
                directory: FilesystemDirectory.Documents
            });
            callback(result.files[n]);
        } catch (e) {
            callback('Unable to read dir', e);
        }
    },
    keys: async function (callback): Promise<any> {
        try {
            let result = await Filesystem.readdir({
                path: directoryName,
                directory: FilesystemDirectory.Documents
            });
            callback(result.files);
        } catch (e) {
            callback('Unable to read dir', e);
        }

    },
    length: async function (callback): Promise<any> {
        try {
            let result = await Filesystem.readdir({
                path: directoryName,
                directory: FilesystemDirectory.Documents
            });
            callback(result.files.length);
        } catch (e) {
            callback('Unable to read dir', e);
        }
    },
    removeItem: async function (key): Promise<any> {
        try {
            const result = await Filesystem.deleteFile({
                path: `${directoryName}/${key}.txt`,
                directory: FilesystemDirectory.Documents
            });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    setItem: async function (key, value): Promise<any> {
        try {
            const result = await Filesystem.writeFile({
                path: `${directoryName}/${key}.txt`,
                data: value,
                directory: FilesystemDirectory.Documents,
                encoding: FilesystemEncoding.UTF8
            });
            return Promise.resolve(result);
        } catch (e) {
            return Promise.reject('Unable to write file' + e);
        }
    }
}

localforage.defineDriver(capacitorFileDriver);

localforage.config({
    driver: ['capacitorFileDriver', localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE]
});

export const capacitorStorage = {
    set: localforage.setItem,
    get: localforage.getItem,
    remove: localforage.removeItem,
    key: localforage.key,
    keys: localforage.keys,
    length: localforage.length,
    clear: localforage.clear,
    iterate: localforage.iterate
};
