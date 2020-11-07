import { Filesystem, FilesystemDirectory, FilesystemEncoding } from "@capacitor/core";
import { IProfile } from "../interfaces";

const directoryName = `local`;
const dbName = `profile`;

createLocalDirectory();
async function createLocalDirectory() {
    try {
        await Filesystem.mkdir({
            path: directoryName,
            directory: FilesystemDirectory.Documents,
            recursive: false // like mkdir -p
        });
    } catch (error) {
        console.error(error);
    }
}

export async function deleteProfileLocal() {
    try {
        await Filesystem.deleteFile({
            path: `${directoryName}/${dbName}.txt`,
            directory: FilesystemDirectory.Documents
        });
    } catch (error) {
        console.error(error);
    }
}

export async function insertUpdateProfileLocal(profile: IProfile) {
    try {
        await Filesystem.writeFile({
            path: `${directoryName}/${dbName}.txt`,
            data: JSON.stringify(profile),
            directory: FilesystemDirectory.Documents,
            encoding: FilesystemEncoding.UTF8
        });
    } catch (error) {
        console.error(error);
    }
}

export async function getProfileLocal() {
    try {
        const lokiDBContents = await Filesystem.readFile({
            path: `${directoryName}/${dbName}.txt`,
            directory: FilesystemDirectory.Documents,
            encoding: FilesystemEncoding.UTF8
        });
        const data = JSON.parse(lokiDBContents.data) as IProfile;
        return data;
    } catch (error) {
        console.error(error);
    }
}
