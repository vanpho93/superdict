import React from 'react';
import { connect } from 'react-redux'
import { DatePicker, Button } from 'antd'
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
    const dateFormat = 'DD/MM/YYYY';
    const startDate = new Date(Date.now() - 7 * 86400000).toLocaleDateString('en-GB')
    const endDate = new Date().toLocaleDateString('en-GB')
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 20 }}>
        <DatePicker.RangePicker
          style={{ marginRight: 10 }}
          showTime={{ format: 'HH:mm' }}
          defaultValue={[moment(startDate, dateFormat), moment(endDate, dateFormat)]}
          ranges={{
            Today: [moment(), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
          }}
          format={dateFormat}
          placeholder={['Start Time', 'End Time']}
          onChange={this.onChange}
          onOk={this.onOk}
        />
        <Button>Apply</Button>
      </div>
    );
  }
}

export const VocabularyFilter = connect(state => ({ user: state.user }))(VocabularyFilterComponent)
