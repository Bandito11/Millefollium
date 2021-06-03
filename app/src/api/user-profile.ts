import { Filesystem, FilesystemDirectory, FilesystemEncoding } from "@capacitor/core";
import { IProfile } from "../interfaces/IProfile";

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
        throw new Error(error);
    }
}

export async function deleteProfileLocal() {
    try {
        await Filesystem.deleteFile({
            path: `${directoryName}/${dbName}.txt`,
            directory: FilesystemDirectory.Documents
        });
    } catch (error) {
        throw new Error(error);
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
        throw new Error(error);
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
        throw new Error(error);
    }
}
