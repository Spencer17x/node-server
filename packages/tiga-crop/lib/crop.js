const sharp = require('sharp');
const request = require('request');
// const url = 'http://tvax1.sinaimg.cn/crop.0.0.1242.1242.1024/667b56ecly8fvnd4pd0adj20yi0yiq65.jpg';
const path = require('path');

const roundedCorners = Buffer.from(
  '<svg><rect x="0" y="0" width="100" height="100" rx="50" ry="50"/></svg>'
);

/**
 * 发送网络请求，获取图片body，得到一个buffer对象
 * @param url
 * @return {Promise<unknown>}
 */
const getBody = url => new Promise((resolve, reject) => {
  request({url, encoding: null}, (e, res, body) => {
    if (e) {
      return reject(e);
    } else if (200 <= res.statusCode && res.statusCode < 300) {
      return resolve(body);
    } else {
      return reject(new Error(`Unexpected response status ${res.statusCode}`));
    }
  });
});

/**
 * 处理网络图片
 * @param url
 * @param outputFile
 * @param source 图片来源network/local
 * @returns {Promise<unknown>}
 */
async function startPicCrop(inputFile, outputFile, source) {
  const input = ['local'].includes(source) ? inputFile : await getBody(path);
  const fileOut = path.resolve(outputFile); // 图片处理之后所保存的地址
  const bufferImage = await sharp(input).resize(200, 200).composite([{
    input: roundedCorners,
    blend: 'dest-in'
  }]).jpeg().toBuffer();
  return new Promise((resolve, reject) => {
    return sharp(bufferImage).toFile(fileOut, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  })
}

module.exports = {
	startPicCrop
};