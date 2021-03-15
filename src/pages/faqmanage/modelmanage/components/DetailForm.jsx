import React from 'react';
import { Modal } from 'antd';

const DetailForm = (props) => {
  const { modalVisible, onCancel } = props;
  return (
    <Modal
    width="100%"
      destroyOnClose
      title="相关分类问题"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default DetailForm;
