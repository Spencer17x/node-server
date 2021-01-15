const program = require('commander');
const pkg = require('../package.json');
const { askQuestions } = require('./question');
const { startPicCrop } = require('./crop');
const ora = require('ora');

program.version(pkg.version).usage('<command> [options]');

program
	.option('-u, --update', 'update to the latest version');

/**
 * 更新命令的版本
 */
program
	.command('update <version>')
	.description('update to the specified version')
	.action(version => {
		console.log(version, '这部分功能我也没写...待开发');
	});

/**
 * 将图片处理之后放到指定路径
 */
program
	.command('start')
	.description('star working on the image')
	.action(() => {
		let spinner;
		askQuestions().then(answers => {
			const { source, path, name, format } = answers;
			spinner = ora('开始处理...');
			spinner.start();
			return startPicCrop(path, `${name}.${format}`, source);
		}).then(() => {
			return spinner.succeed('处理成功');
		}).catch(err => {
			return spinner.fail(`处理失败：${err.toString()}`);
		});
	});


program.parse(process.argv);