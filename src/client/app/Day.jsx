import React from 'react';
import moment from 'moment';
import _ from 'underscore';

class Day extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        var totalHoursSeconds = _.reduce(this.props.worklogs, (hours, item) => {
            return hours + item.worklog.timeSpentSeconds;
        }, 0);

        var totalHours = moment.duration(totalHoursSeconds * 1000).asHours();

        var rows = this.props.worklogs.map((item, index) => {
            return (
                <tr key={index}>
                    <td>
                        {item.issue.fields.parent != null ? <div><span className="label label-info">{item.issue.fields.parent.key}</span> <span><a href={this.props.baseUrl + '/browse/' + item.issue.fields.parent.key} target="_blank">{item.issue.fields.parent.fields.summary}</a></span></div> : null}
                        <span className="label label-info">{item.issue.key}</span> <span><a href={this.props.baseUrl + '/browse/' + item.issue.key} target="_blank">{item.issue.fields.summary}</a></span>
                    </td>
                    <td><span className="badge">{item.worklog.timeSpent}</span></td>
                    <td>{item.issue.fields.status.name}</td>
                </tr>
            );
        });

        var table = (
            <table className="table table-hover table-com">
                <thead>
                    <tr>
                        <th>Summary</th>
                        <th>Logged Hours</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );

    return (
        <div className="col-xs-12">
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <span>{moment(this.props.date, 'YYYY-MM-DD').format('YYYY-MM-DD, dddd')}</span> <span className="badge">{totalHours}h</span>
                </div>
                <div className="panel-body">
                    {table}
                </div>
            </div>
        </div>
    );
}
}

export default Day;
