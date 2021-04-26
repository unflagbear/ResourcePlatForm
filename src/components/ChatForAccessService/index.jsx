import React,{useState} from 'react';
import '@chatui/core/es/styles/index.less';
import './index.css'
// 引入组件
import Chat, { Bubble, useMessages,Card,  CardText,List, ListItem } from '@chatui/core';
// 引入样式
import '@chatui/core/dist/index.css';
// import button from './components/Button'
// import { Avatar } from '@chatui/core'
import logo from '../../assets/031-perseus.svg';
import {history} from 'umi'

const initialMessages = [
  {
    type: 'text',
    content: { text: '您好~我是您的贴心小助手，我能帮您查专利、专家、仪器设备' },
    user: { avatar: logo },
  }
];

const defaultQuickReplies = [
  {
    // icon: 'message',
    name: '联系人工服务',
    // isNew: true,
    isHighlight: true,
  },
  {
    name: '找专利',
    // isNew: true,
  },
  {
    name: '找专家',
    // isHighlight: true,
  },
  {
    name: '找仪器设备',
  },
];

const ChatForAccessService = () => {
  const { messages, appendMsg, setTyping } = useMessages(initialMessages);
  const [hover,setHover] = useState(false)
  const [conversationId,setConversationId] = useState(-1)
  function handleSend(type, val) {
    if (type === 'text' && val.trim()) {
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });

      setTyping(true);
      let url = `http://10.112.205.250:8453/dialog_api/v3/`
      // let conversation_id = 55555555
      let user_utterance = val
      let requesUrl=""
      if(conversationId != -1){
        requesUrl =  url+'?conversation_id='+conversationId+'&user_utterance='+user_utterance
      }else{
         requesUrl =  url+'?user_utterance='+user_utterance
      }
      fetch(requesUrl,{
        method:'GET',
        mode: 'cors',
        referrerPolicy: 'unsafe-url',
        headers:{
          'Access-Control-Allow-Origin':"*",
          'Accept-Encoding': 'gzip, deflate',
          'Accept-Language': 'en,zh-TW;q=0.9,zh;q=0.8,en-US;q=0.7,zh-CN;q=0.6',
          'Cache-Control': 'max-age=0',
          'Connection': 'keep-alive',
          'Host': '10.108.209.238:8453',
          'Upgrade-Insecure-Requests': 1,
          'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
        },
      })
      .then(res =>res.json())
     .then((data) => {
       console.log(data)
       const puleData =  data.result.response_content
       if(conversationId == -1){
         setConversationId(data.result.conversation_id)
       }
       switch(data.result.response_type){
         case "plain_text":{
           data.result.response_content.map((item)=>
              appendMsg({
                type: 'text',
                content: { text: item },
                user: { avatar: logo }
              })
           )
           break
         }
         case "options":{
          appendMsg({
            type: 'text',
            content: { text: puleData.heading },
            user: { avatar: logo }
          })
          appendMsg({
            type: 'options',
            content: { text: puleData.options },
            user: { avatar: logo }
          })
           break
         }case "resource_item":{
          appendMsg({
            type: 'text',
            content: { text: puleData.heading },
            user: { avatar: logo }
          })
          appendMsg({
            type: 'resource_item',
            content: { text: puleData.resource_items },
            user: { avatar: logo }
          })
          break
        }
         default:{
           console.log("default")
         }
       }
      })
      .catch(function(e) {
        console.log('fetch fail', JSON.stringify(e));
      })
    }
  }

  function handleQuickReplyClick(item) {
    handleSend('text', item.name);
  }
  function handlePush(item){
    console.log(item)
    // history.push({
    //   pathname: '/details_patent',
    //   query: {
    //     id:item,
    //   },
    // })
  }
  function renderMessageContent(msg) {
    const { content,type } = msg;
    switch(type){
      case "text":{
        return <Bubble content={content.text} />
      }
      case "options":{
        let linkStyle;
        if (hover) {
          linkStyle = {color: 'red'}
        } else {
          linkStyle = {color: 'blue'}
        }

        return (
            <List bordered={true} className="useClick"  >
              {
                content.text.map((item)=>
                  <ListItem   content={item}  onClick={()=>{handleSend("text",item)}} />
                )
              }

            </List>
        )
      }
      case "resource_item":{
        return(
          <List bordered={true} className="useClick"  >
              {
                content.text.map((item)=>
                  <ListItem  key={item.id}  content={item.id + item.resource_name}  onClick={()=>{handlePush(item)}} />
                )
              }

            </List>
        )
      }
      default:{
        return <Bubble content="请重新输入" />
      }
    }

  }

  return (
    <Chat
      navbar={{ title: '科技资源与服务智能客服' }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      quickReplies={defaultQuickReplies}
      onQuickReplyClick={handleQuickReplyClick}
      onSend={handleSend}
    />
  );
};

export default ChatForAccessService;


