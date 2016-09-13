var Jira = require('./jira.js');

var username = '';
var password = '';

var jira = new Jira(username, password);
jira.getWorklogs(-7, function(data) {
  console.log('getWorklogs');
  console.log(data);
});
