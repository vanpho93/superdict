import React, { Fragment } from 'react'
import { List, Divider, Spin, Pagination } from 'antd'
import { connect } from 'react-redux'
import { VocabularyItem } from './VocabularyItem'

const VocabularyListComponent = (props) => {
  if (props.isLoading) return <Divider style={{ marginTop: 300 }}><Spin size="large" /></Divider>
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
          onShowSizeChange={() => console.log('x')}
          defaultCurrent={3}
          total={500}
        />
      </div>
    </Fragment>
  )
}

export const VocabularyList = connect(state => ({ isLoading: state.loading.vocabulary, vocabularies: state.vocabularies }))(VocabularyListComponent)
