import React,{useState} from 'react'
import { Form } from 'antd';


import data from '@/utils/classify/classify.json'
import {modify} from '@/utils/classify/modify'

import TagSelect from '../TagSelect'
import StandardFormRow from '../StandardFormRow';

const FormItem = Form.Item;
export default function SubSelection(){
    const [selectKey,setSelectKey] = useState([])
    const classifyData = modify(data.科技服务资源)
    const components = [];
    
    Object.keys(classifyData).forEach(key => {
        components.push(<TagSelect.Option key={key} value={key}>{key}</TagSelect.Option>)
    })
    const changeHandler=(checkedTags)=>{
        if(!checkedTags){
            return
        }
        const allSub=[]
        for(let i=0;i<checkedTags.length; i+=1){
            const subOption=[]
            Object.keys(classifyData[checkedTags[i]]).forEach(sub_key=>{
                subOption.push(<TagSelect.Option key={sub_key} value={sub_key}>{sub_key}</TagSelect.Option>)
            })
            allSub.push(<StandardFormRow
                title={checkedTags[i]}
                style={{
                  paddingBottom: 11,
                }}
              >
                <FormItem name="category">
                  <TagSelect expandable>
                    {subOption}
                  </TagSelect>
                </FormItem>
              </StandardFormRow>)
        }
        setSelectKey(allSub)
    }
    return(
        <>
        <StandardFormRow
            title="所属类目"
            block
            style={{
              paddingBottom: 11,
            }}
          >
            <FormItem name="category">
              <TagSelect expandable onChange={changeHandler}>
                {components}
              </TagSelect>
            </FormItem>
          </StandardFormRow>
          {selectKey}
        </>
    )
}