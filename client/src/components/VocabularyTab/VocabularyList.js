import React, { Fragment } from 'react'
import { List, Divider, Spin, Pagination } from 'antd'
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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
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
})

export const VocabularyList = connect(mapState, { getVocabularies })(VocabularyListComponent)
