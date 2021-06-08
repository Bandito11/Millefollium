import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { logger } from './logger';

const folder = 'data';
const DIRECTORY = Directory.Data;

export function FileLokiAdapter() {}

FileLokiAdapter.prototype.loadDatabase = async function (
  dbName: string,
  callback: Function
) {
  try {
    callback(await getDatabaseFile({ dbName: dbName }));
  } catch (error) {
    callback(error);
  }
};

FileLokiAdapter.prototype.saveDatabase = async function (
  dbName: string,
  dbString: string,
  callback: Function
) {
  try {
    await Filesystem.writeFile({
      path: `${folder}/${dbName}`,
      data: dbString,
      directory: DIRECTORY,
      encoding: Encoding.UTF8,
    });
    callback(null);
  } catch (error) {
    logger(error);
    callback(error);
  }
};

FileLokiAdapter.prototype.deleteDatabase =
  async function deleteDatabase(dbName: string, callback: Function) {
    try {
      await Filesystem.deleteFile({
        path: `${folder}/${dbName}`,
        directory: DIRECTORY,
      });
      callback(null);
    } catch (error) {
      logger(error);
      callback(error);
    }
  };

async function getDatabaseFile(dbName) {
  try {
    const res = await Filesystem.readFile({
      directory: DIRECTORY,
      path: `${folder}/${dbName}`,
      encoding: Encoding.UTF8,
    });
    return res.data;
  } catch (error) {
    try {
      await Filesystem.mkdir({
        directory: DIRECTORY,
        path: folder,
      });
      return null;
    } catch (e) {
      logger(error);
      logger(e);
    }
  }
}
