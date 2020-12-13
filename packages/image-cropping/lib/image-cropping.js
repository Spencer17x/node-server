const sharp = require('sharp');
const request = require('request');
const url = 'http://tvax1.sinaimg.cn/crop.0.0.1242.1242.1024/667b56ecly8fvnd4pd0adj20yi0yiq65.jpg';
const path = require('path');

const roundedCorners = Buffer.from(
	'<svg><rect x="0" y="0" width="100" height="100" rx="50" ry="50"/></svg>'
);

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

async function start() {
	const fileOut = path.resolve(__dirname, '../images/1.jpg');
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

start();