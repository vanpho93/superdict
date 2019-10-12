import { List, Avatar, Icon, Divider, Spin } from 'antd'
import React from 'react'
import { connect } from 'react-redux'

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const VocabularyListComponent = (props) => {
  if (props.isLoading) return <Divider style={{ marginTop: 300 }}><Spin size="large" /></Divider>
  return <List
  itemLayout="vertical"
  size="large"
  dataSource={props.vocabularies}
  renderItem={item => (
    <List.Item
      key={item.title}
      actions={[
        <IconText type="star-o" text="156" key="list-vertical-star-o" />,
        <IconText type="like-o" text="156" key="list-vertical-like-o" />,
        <IconText type="message" text="2" key="list-vertical-message" />,
      ]}
      extra={
        <img
          width={272}
          alt="logo"
          src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
        />
      }
    >
      <List.Item.Meta
        avatar={<Avatar src={item.avatar} />}
        title={<a href={item.href}>{item.word}</a>}
        description={item.pronunciation}
      />
      {item.content}
    </List.Item>
  )}
/>
}

export const VocabularyList = connect(state => ({ isLoading: state.loading.vocabulary, vocabularies: state.vocabularies }))(VocabularyListComponent)
