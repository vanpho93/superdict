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
    const dateFormat = 'YYYY-MM-DD';
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 20 }}>
        <DatePicker.RangePicker
          style={{ marginRight: 10 }}
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
        <Button>Apply</Button>
      </div>
    );
  }
}

export const VocabularyFilter = connect(state => ({ user: state.user }))(VocabularyFilterComponent)
