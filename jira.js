var moment = require('moment');

var Jira = function(baseUrl, user, password) {
  var Client = require('node-rest-client').Client;

  var authOptions = {
    user: user,
    password: password
  };

  this.client = new Client(authOptions);

  this.client.registerMethod('getWorklogUpdated', baseUrl + '/rest/api/2/worklog/updated', 'GET');
  this.client.registerMethod('getWorklogList', baseUrl + '/rest/api/2/worklog/list', 'POST');
  this.client.registerMethod('getIssue', baseUrl + '/rest/api/2/issue/${id}', 'GET');
  this.client.registerMethod('getAllProjects', baseUrl + '/rest/api/2/project/', 'GET');
};

Jira.prototype.getAllProjects = function(callback){
  this.client.methods.getAllProjects(function(data){
    callback(data);
  });
};

Jira.prototype.getWorklogs = function(daysOffset, callback) {
  var args = {
    parameters: {
      since: (moment().subtract(daysOffset, 'days').unix() * 1000)
    }
  };

  this.client.methods.getWorklogUpdated(args, (worklogs) => {
    var ids = worklogs.values.map(value => { return value.worklogId; });

    var args2 = {
      data: {
        ids: ids
      },
      headers: {
        'Content-Type': 'application/json'
      }
    };

    this.client.methods.getWorklogList(args2, function(worklogList) {
      callback(worklogList);
    });
  });
};

  Jira.prototype.getIssue = function(issueId) {
    return new Promise(resolve => {
      this.client.methods.getIssue({path: {id: issueId}}, function(issue){
        resolve(issue);
      });
    });
  };

module.exports = Jira;
