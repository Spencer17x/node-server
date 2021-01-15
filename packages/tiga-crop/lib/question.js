const inquirer = require('inquirer');

const baseQuestions = [
  {
    name: 'source', type: 'list', message: '请选择图片获取的方式', choices: ['network', 'local'],
  },
  {
    name: 'name', type: 'input', message: '请输入处理后图片的名字', validate(input) {
      const done = this.async();
      if (input === '') {
        done('输入不能为空哦~~~');
        return;
      }
      done(null, true);
    },
  },
  {
    name: 'format', type: 'list', message: '请输入处理后图片的格式', choices: ['jpeg', 'jpg', 'png']
  }
];

const pathQuestion = {
  name: 'path', type: 'input', validate(input) {
    const done = this.async();
    if (input === '') {
      done('输入不能为空哦~~~');
      return;
    }
    done(null, true);
  }
};

const askQuestions = () => {
  const answers = {};
  return inquirer.prompt(baseQuestions).then(answer => {
    Object.assign(answers, answer);
    answer.source === 'local' ?
      Object.assign(pathQuestion, {
        message: '请输入图片名称',
      }) : answer.source === 'network' ?
      Object.assign(pathQuestion, {
        message: '请输入图片url地址',
      }) : '';
    return inquirer.prompt([pathQuestion]);
  }).then(answer => Object.assign(answers, answer));
}

module.exports = {
  askQuestions
}