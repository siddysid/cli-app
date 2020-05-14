#!/usr/bin/env node
const program = require('commander');
const { prompt } = require('inquirer'); // require inquirerjs library
// Require logic.js file and extract controller functions using JS destructuring assignment
const { addContact, getContact, updateContact, } = require('./logic');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

clear();

console.log(
  chalk.yellow(
    figlet.textSync('ClI -APP', { horizontalLayout: 'full' })
  )
);

const questions = [
  {
    type : 'input',
    name : 'firstname',
    message : 'Enter firstname ...'
  },
  {
    type : 'input',
    name : 'lastname',
    message : 'Enter lastname ...'
  },
  {
    type : 'input',
    name : 'phone',
    message : 'Enter phone number ...'
  },
  {
    type : 'input',
    name : 'email',
    message : 'Enter email address ...'
  }
];


program
  .version('0.0.1')
  .description('Contact management system');

program
.command('addContact') // No need of specifying arguments here
  .alias('a')
  .description('Add a contact')
  .action(() => {
    prompt(questions).then(answers =>
      addContact(answers));
  });

program
  .command('updateContact <_id>')
  .alias('u')
  .description('Update contact')
  .action(_id => {
    prompt(questions).then((answers) =>
      updateContact(_id, answers));
  });

program
  .command('getContact <name>')
  .alias('r')
  .description('Get contact')
  .action(name => getContact(name));

// Assert that a VALID command is provided
if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
  program.outputHelp();
  process.exit();
}
program.parse(process.argv)
