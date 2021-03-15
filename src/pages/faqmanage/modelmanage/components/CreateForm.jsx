import React from 'react';
import { Modal } from 'antd';

const CreateForm = (props) => {
  const { modalVisible, onCancel } = props;
  return (
    <Modal
      destroyOnClose
      title="创建新的回答分类"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default CreateForm;
