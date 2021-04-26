import React, {useEffect} from "react";
import {Form, List} from "antd";
import {FormItem} from "@chatui/core";
import {connect} from "umi";

const DemandList = ({dispatch,listAnddemand:{list=[]}}) =>{
  useEffect(() => {
    dispatch({
      type: 'listAnddemand/list',
      payload: {},
    });
  }, []);
  return(
    <>
      <div>
        <h3>需求列表</h3>
        <Form>
          <FormItem>
            <List
              itemLayout="horizontal"
              dataSource={list}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={<a href={item.url}>{item.name}</a>}
                    description={item.mail}
                  />
                </List.Item>
              )}
            />
          </FormItem>
        </Form>
      </div>

    </>
  );
}
export default connect(({ listAnddemand, loading }) => ({
  listAnddemand,
  loading: loading.models.platformAndlist,
}))(DemandList);
