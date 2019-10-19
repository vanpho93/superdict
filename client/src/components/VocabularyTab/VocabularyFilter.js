import React from 'react';
import { connect } from 'react-redux'
import { DatePicker, Radio, Checkbox, Button } from 'antd'
import moment from 'moment'
import { getVocabularies, changeViewMode, addVocabulary, removeVocabulary, clearExam } from '../../redux/actions'
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

  toggleAll = (event) => {
    this.props.vocabularies.forEach(vocabulary => {
      if (event.target.checked) return this.props.addVocabulary(vocabulary)
      this.props.removeVocabulary(vocabulary)
    })
  }

  render() {
    const { fromDate, toDate } = this.props
    const dateFormat = 'DD/MM/YYYY';
    const startDate = new Date(fromDate).toLocaleDateString('en-GB')
    const endDate = new Date(toDate).toLocaleDateString('en-GB')
    return (
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 20, flexWrap: 'wrap', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
          <Radio.Group value={this.props.mode} onChange={e => this.props.changeViewMode(e.target.value)}>
            <Radio.Button value="large">Large</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="small">Small</Radio.Button>
          </Radio.Group>
          <Button onClick={this.props.clearExam}>Clear</Button>
          <Checkbox onChange={this.toggleAll} />
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  vocabularies: state.VOCABULARY.vocabularies,
  fromDate: state.VOCABULARY.fromDate,
  toDate: state.VOCABULARY.toDate,
  mode: state.VOCABULARY.mode,
  pageSize: state.VOCABULARY.pageSize,
})

const actions = {
  getVocabularies,
  changeViewMode,
  addVocabulary,
  removeVocabulary,
  clearExam,
}

export const VocabularyFilter = connect(mapState, actions)(VocabularyFilterComponent)
