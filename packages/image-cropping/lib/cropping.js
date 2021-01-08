const sharp = require('sharp');
const request = require('request');
const url = 'http://tvax1.sinaimg.cn/crop.0.0.1242.1242.1024/667b56ecly8fvnd4pd0adj20yi0yiq65.jpg';
const path = require('path');

// 网络请求
const networkImagePath = '../network-images/network-1.jpg';
const localImagePath = '../local-images/local-1.jpg';

const roundedCorners = Buffer.from(
	'<svg><rect x="0" y="0" width="100" height="100" rx="50" ry="50"/></svg>'
);

/**
 * 发送网络请求，获取图片body，得到一个buffer对象
 * @param url
 * @return {Promise<unknown>}
 */
const getBody = url => new Promise((resolve, reject) => {
	request({ url, encoding: null }, (e, res, body) => {
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
 * 程序启动入口
 * @param type - 图片资源的来源，一般为网络请求或者本地图片
 * @return {Promise<void>}
 */
async function startCropping(type = 'local') {
	const saveImagePathMap = {
		network: networkImagePath,
		local: localImagePath
	}
	const saveImagePath = saveImagePathMap[type]; // 图片处理成功后保存到的地址
	const fileOut = path.resolve(__dirname, saveImagePath);
	const input = await getBody(url);
	const bufferImage = await sharp(input).resize(200, 200).composite([{
		input: roundedCorners,
		blend: 'dest-in'
	}]).jpeg().toBuffer();
	await sharp(bufferImage).toFile(fileOut, (err, info) => {
		if (err) {
			console.log('err', err);
		} else {
			console.log('info', info)
		}
	});
}

module.exports = startCropping;