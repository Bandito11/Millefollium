import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';

const { Filesystem } = Plugins;

getImageDirectory();

async function getImageDirectory() {
    let ret;
    try {
        ret = await Filesystem.readdir({
            path: 'images',
            directory: FilesystemDirectory.Documents
        });
    } catch (error) {
        try {
            ret = await Filesystem.mkdir({
                path: 'images',
                directory: FilesystemDirectory.Documents,
                recursive: false // like mkdir -p
            });
        } catch (error) {
            console.error('Unable to make directory', error);
        }
    }
    return ret;
}

export async function writeImageFile(opts: { data: string, name: string }) {
    try {
        await Filesystem.writeFile({
            path: `images/${opts.name}.png`,
            data: opts.data,
            directory: FilesystemDirectory.Documents,
            encoding: FilesystemEncoding.UTF8
        });
    } catch (e) {
        console.error('Unable to write file', e);
    }
}

export async function readImageFile(name) {
    let contents = await Filesystem.readFile({
        path: `images/${name}.png`,
        directory: FilesystemDirectory.Documents,
        encoding: FilesystemEncoding.UTF8
    });
    return contents;
}
