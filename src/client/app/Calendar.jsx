import React from 'react';
import _ from 'underscore';
import moment from 'moment';
import Day from './Day.jsx';

class Calendar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    var days = _.chain(this.props.worklogs)
    .sortBy(i => {
      return i.worklog.updated;
    })
    .reverse()
    .groupBy(i => {
      return moment(i.worklog.updated).startOf('day').format('YYYY-MM-DD');
    })
    .map((worklogs, key) => {
      return (
        <Day key={key} date={key} worklogs={worklogs} baseUrl={this.props.baseUrl} />
      );
    }).value();

    return (
      <div className="row calendar">
        {days}
      </div>
    );
  }
}

export default Calendar;
