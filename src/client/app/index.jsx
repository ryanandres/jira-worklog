import React from 'react';
import ReactDOM from 'react-dom';
import LoginBox from './LoginBox.jsx';
import Calendar from './Calendar.jsx';
import moment from 'moment';
import { createStore } from 'redux'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            worklogs: [],
            lastUpdated: null
        };

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(baseUrl, user, password){
        this.setState({
            user: user,
            password: password
        });

        this.jira = new Jira(baseUrl, user, password);
        this.jira.getWorklogs(31, worklogs => {
            var promises = [];
            var detailedWorklogs = [];

            var promises = worklogs
            .filter(worklog => worklog.author.emailAddress === this.state.user)
            .map(worklog => {
                return this.jira.getIssue(worklog.issueId)
                .then(issue => ({ worklog: worklog, issue: issue }));
            });

            Promise.all(promises).then((detailedWorklogs) => {
                this.setState({
                    worklogs: detailedWorklogs,
                    lastUpdated: moment()
                });
            });
        });
    }

    render() {
        var worklogs = this.state.worklogs.map((worklog, index) => {
            return (
                <div key={index}>
                    {worklog.issue.key}
                    {worklog.issue.fields.summary}
                </div>
            );
        });

        var lastUpdated = <span><i>Last Updated: {this.state.lastUpdated != null ? this.state.lastUpdated.format("YYYY-MM-DD h:mm:ss A") : null}</i></span>;

            return (
                <div className="container-fluid">
                    <div className="row">
                        <hr />
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="pull-right">
                                {this.state.lastUpdated ? lastUpdated : null} <span><LoginBox onSubmit={this.handleLogin} /></span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <hr />
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <Calendar worklogs={this.state.worklogs} baseUrl={this.props.baseUrl} />
                        </div>
                    </div>
                </div>
            )
        }
    }

    export default App;

    ReactDOM.render(<App />, document.getElementById('app'));
