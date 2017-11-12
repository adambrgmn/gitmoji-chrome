/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { promisify } = require('util');
const AdmZip = require('adm-zip');
const globby = require('globby');
const manifest = require('../public/manifest.json');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function readKey() {
  try {
    const keyPath = path.resolve('key.pem');
    const key = await readFile(keyPath);
    return key;
  } catch (e) {
    throw new Error('key.pem must be present in project root');
  }
}

async function getDirContent(dir) {
  const files = await globby(`${dir}/**/*.*`);

  return Promise.all(
    files.map(p => p.replace('build/', '')).map(async file => {
      const filePath = path.resolve(dir, file);
      const content = await readFile(filePath);
      return { content, file };
    }),
  );
}

async function zip() {
  const pkgName = manifest.name.toLowerCase();

  try {
    const zipFile = new AdmZip();
    const key = await readKey();
    const files = await getDirContent('build');

    zipFile.addFile('key.pem', key);
    files.forEach(file => zipFile.addFile(file.file, file.content));

    const zipBuffer = zipFile.toBuffer();
    await writeFile(`${pkgName}.zip`, zipBuffer);

    console.log(chalk.green(`Everything zipped up in ${pkgName}.zip`));
  } catch (e) {
    console.error(chalk.red(e));
  }
}

zip();
