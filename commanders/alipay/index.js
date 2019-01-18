
exports.name = 'alipay';
exports.usage = '[command] [options]';
exports.desc = 'tools for the alipay miniprogram project';

exports.register = function (commander) {
  commander
    .option('-r, --root [root]', 'specify project root')
    .action(function (...args) {
      cml.utils.checkProjectConfig();
      /* eslint-disable */
      //提高cml -h命令速度 
      cml.log.startBuilding();

      const inquirer = require('inquirer');   
      const utils = require('../utils.js'); 
      /* eslint-disable */  

      
      // 不能删除
      var options = args.pop(); // eslint-disable-line  

      var cmd = args.shift();
      if (cmd) {
        handlerCmd(cmd);
      } else {
        let questions = [{
          type: 'list',
          name: 'type',
          message: 'Which do you want to do?',
          choices: [
            'dev',
            'build'
          ]
        }]
        inquirer.prompt(questions).then(answers => {
          handlerCmd(answers.type)
        })
      }

      function handlerCmd (cmd) {
        cml.media = cmd;
        utils.startReleaseOne(cmd, 'alipay');
      }

    })

  commander.on('--help', function() {
    var cmd = `
  Commands:
    dev      develop the project for alipay miniprogram
    build    build the project for alipay miniprogram
  Examples:
    cml alipay dev
    cml alipay build
    `
    console.log(cmd)
  })

}

