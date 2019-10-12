import React from 'react';
import { connect } from 'react-redux'
import { DatePicker } from 'antd'
import moment from 'moment'

class VocabularyFilterComponent extends React.Component {
  onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }
  
  onOk = (value) => {
    console.log('onOk: ', value);
  }

  render() {
    const dateFormat = 'YYYY-MM-DD';
    return (
      <div style={{ padding: 20 }}>
        <h1>Word filter</h1>
        <DatePicker.RangePicker
          showTime={{ format: 'HH:mm' }}
          defaultValue={[moment('2015-06-06', dateFormat), moment('2015-06-06', dateFormat)]}
          ranges={{
            Today: [moment(), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
          }}
          format="YYYY-MM-DD HH:mm"
          placeholder={['Start Time', 'End Time']}
          onChange={this.onChange}
          onOk={this.onOk}
        />
      </div>
    );
  }
}

export const VocabularyFilter = connect(state => ({ user: state.user }))(VocabularyFilterComponent)
