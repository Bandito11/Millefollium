import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';


getImageDirectory();

async function getImageDirectory() {
    let ret;
    try {
        ret = await Filesystem.readdir({
            path: 'images',
            directory: Directory.Documents
        });
    } catch (error) {
        try {
            ret = await Filesystem.mkdir({
                path: 'images',
                directory: Directory.Documents,
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
            directory: Directory.Documents,
            encoding: Encoding.UTF8
        });
    } catch (e) {
        console.error('Unable to write file', e);
    }
}

export async function readImageFile(name) {
    let contents = await Filesystem.readFile({
        path: `images/${name}.png`,
        directory: Directory.Documents,
        encoding: Encoding.UTF8
    });
    return contents;
}
