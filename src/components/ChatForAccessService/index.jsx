import React from 'react';
import '@chatui/core/es/styles/index.less';
// 引入组件
import Chat, { Bubble, useMessages } from '@chatui/core';
// 引入样式
import '@chatui/core/dist/index.css';
// import button from './components/Button'
// import { Avatar } from '@chatui/core'

const initialMessages = [
  {
    type: 'text',
    content: { text: '您好~我是您的贴心小助手，我能帮您查专利、专家、仪器设备' },
    user: { avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg' },
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

  function handleSend(type, val) {
    if (type === 'text' && val.trim()) {
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });

      setTyping(true);
      let url = `http://10.108.210.65:8452/nlu_api/dialog_api/`
      let conversation_id = 55555555
      let user_utterance = val

      fetch(url+'?conversation_id='+conversation_id+'&user_utterance='+user_utterance,{
        method:'GET',
        mode: 'cors',
        referrerPolicy: 'unsafe-url',
        headers:{
          'Access-Control-Allow-Origin':"*",
          'Accept-Encoding': 'gzip, deflate',
          'Accept-Language': 'en,zh-TW;q=0.9,zh;q=0.8,en-US;q=0.7,zh-CN;q=0.6',
          'Cache-Control': 'max-age=0',
          'Connection': 'keep-alive',
          'Host': '10.108.209.238:8452',
          'Upgrade-Insecure-Requests': 1,
          'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
        },
      })
      .then(res => res.json())
      .then(data => data.response)
      .then(bot_utterance => {
        for (let x in bot_utterance)
        {
          appendMsg({
          type: 'text',
          content: { text: bot_utterance[x] },
          })
          // console.log(bot_utterance[x])
        }
        // console.log(bot_utterance)
      })
      .catch(function(e) {
        console.log('fetch fail', JSON.stringify(e));
      })
    }
  }

  function handleQuickReplyClick(item) {
    handleSend('text', item.name);
  }

  function renderMessageContent(msg) {
    const { content } = msg;
    return <Bubble content={content.text} />;
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


