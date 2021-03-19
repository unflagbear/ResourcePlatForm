import React,{useState} from 'react'
import data from '@/utils/classify/classify.json'
import {modify} from '@/utils/classify/modify'
import {Menu,Button,Layout,Card,Tag,Divider} from 'antd'
import {
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
  } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const SelectFilter = ({setSelect,next})=>{
    const [seletctedMenu,setSelectedMenu] = useState('知识产权')
    const classifyData = modify(data.科技服务资源)
    const components = []
    const sub = []
    Object.keys(classifyData).forEach(key => {
        components.push(<Menu.Item key={key} value={key}>{key}</Menu.Item>)
    })
    Object.keys(classifyData).forEach(key => {
        const items = []
        Object.keys(classifyData[key]).forEach((num,item)=>{
            const sub_title=[]
            if(typeof classifyData[key][num] === "object"){
                Object.keys(classifyData[key][num]).forEach(subitem=>{
                    sub_title.push(<Tag onClick={()=>{setSelect([key,num,subitem]);next()}} >{classifyData[key][num][subitem]}</Tag>)
                })
                items.push(<Card title={num} bordered={false} >{sub_title}</Card>)
            }else{
                items.push(
                    <>
                        <h3 onClick={()=>{setSelect([key,num]);next()}} style={{marginLeft:"25px",fontSize:"15px",marginTop:"10px"}} title={num} bordered={false} >{num}</h3>
                        <Divider/>
                    </>
                )
            }

            // console.log(classifyData[key][num])
        })
        sub[key]=items
    })
    const clickMenu=({item,key})=>{
        // console.log(sub)
        setSelectedMenu(key)
    }
    return(
        <>
        {/* <Layout> */}
            {/* <Sider style={{height:"100%"}}> */}
            <div style={{float:"left"}}>
                <Menu
                    style={{ width: 256 }}
                    defaultSelectedKeys={['知识产权']}
                    mode="inline"
                    // theme="dark"
                    onClick={clickMenu}
                    >
                    {components}
                </Menu>
            </div>
            {/* </Sider> */}
            {/* <Content style={{height:"100%"}}> */}
            <div style={{float:"left",width: 685 }}>
                {sub[seletctedMenu]}
            </div>
            {/* </Content> */}
        {/* </Layout> */}
        </>

    )
}

export default SelectFilter;