const { execFile } = require('child_process');
const gifsicle = require('gifsicle');
// const fs = require('fs-extra');
const fs = require('fs');
const path = require('path');

const RESIZE_WIDTH = "150";
const COLOR_NUM = "64";

const baseDir = path.resolve('./assets/images/works-thumbnail');
const inputFileDir = path.resolve(`${baseDir}/rawgif`);

fs.readdirSync(inputFileDir).forEach(file => {
  execFile(gifsicle,
    [
      '--resize-fit-width', RESIZE_WIDTH,
      '--colors', COLOR_NUM,
      'optimize=3',
      '-o', `${baseDir}/${file}`, // 出力先
      `${inputFileDir}/${file}` // 入力
    ],
    (err) => {
      console.log('minified!: ', file);
    }
  );
});