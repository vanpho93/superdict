import React, { Fragment } from 'react'
import { List, Divider, Spin, Pagination, Radio } from 'antd'
import { connect } from 'react-redux'
import { getVocabularies } from '../../redux/actions'
import { VocabularyItem } from './VocabularyItem'

const VocabularyListComponent = (props) => {
  if (props.loading) return <Divider style={{ marginTop: 300 }}><Spin size="large" /></Divider>
  return (
    <Fragment>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={props.vocabularies}
        renderItem={item => <VocabularyItem vocabulary={item} />}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Radio.Group value={props.pageSize} onChange={e => props.getVocabularies({ pageSize: e.target.value })}>
          <Radio.Button value={10}>10</Radio.Button>
          <Radio.Button value={20}>20</Radio.Button>
          <Radio.Button value={30}>30</Radio.Button>
          <Radio.Button value={50}>50</Radio.Button>
        </Radio.Group>
        <Pagination
          onChange={(page) => props.getVocabularies({ page })}
          defaultCurrent={props.page}
          total={props.total}
        />
      </div>

    </Fragment>
  )
}

const mapState = state => ({
  loading: state.VOCABULARY.loading,
  vocabularies: state.VOCABULARY.vocabularies,
  page: state.VOCABULARY.page,
  total: state.VOCABULARY.total,
  pageSize: state.VOCABULARY.pageSize,
})

export const VocabularyList = connect(mapState, { getVocabularies })(VocabularyListComponent)
