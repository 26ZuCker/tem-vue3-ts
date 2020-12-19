const myApp = require('./app');
const hackApp = require('./hack');
const chalk = require('chalk');

myApp.listen(3000, () => {
  console.log(chalk.green('3000'));
});
hackApp.listen(4000, () => {
  console.log(chalk.red('4000'));
});
