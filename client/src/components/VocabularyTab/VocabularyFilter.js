import React from 'react';
import { connect } from 'react-redux'
import { DatePicker } from 'antd'
import moment from 'moment'
import { getVocabularies } from '../../redux/actions'
import { TimeHelper } from '../../helpers/time-helper'

class VocabularyFilterComponent extends React.Component {
  onChange = ([fromDate, toDate]) => {
    const defaultTimeState = TimeHelper.getDefaultTimeState()
    this.props.getVocabularies({
      fromDate: fromDate ? fromDate.valueOf() : defaultTimeState.fromDate,
      toDate: toDate ? toDate.valueOf() : defaultTimeState.toDate,
      page: 1
    })
  }
  
  render() {
    const { fromDate, toDate } = this.props
    console.log({ fromDate, toDate })
    const dateFormat = 'DD/MM/YYYY';
    const startDate = new Date(fromDate).toLocaleDateString('en-GB')
    const endDate = new Date(toDate).toLocaleDateString('en-GB')
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 20 }}>
        <DatePicker.RangePicker
          style={{ marginRight: 10 }}
          defaultValue={[
            moment(startDate, dateFormat),
            moment(endDate, dateFormat)
          ]}
          ranges={{
            Today: [moment(), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
          }}
          format={dateFormat}
          placeholder={['Start Time', 'End Time']}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

const mapState = state => ({ fromDate: state.VOCABULARY.fromDate, toDate: state.VOCABULARY.toDate  })

export const VocabularyFilter = connect(mapState, { getVocabularies })(VocabularyFilterComponent)
