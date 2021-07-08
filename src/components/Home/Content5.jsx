import React from 'react';
import { Row, Col,Image } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import defaultImg from '@/assets/defaultImg.svg'

import { getChildrenToRender } from './utils';
import {history} from'umi'
import {UpdateLog} from './service'

class Content5 extends React.PureComponent {

  getChildrenToRender = (data,expertlist) =>
    data.map((item) => {
      const {name} = item
      const index = name.charAt(name.length-1)
      if(!expertlist){
        return null;
      }
      return (
        <Col key={item.name} {...item} 
          onClick={async()=>{history.push({
            pathname: '/details_resource',
            query: {
              productID:expertlist[index].id,
            },
          })
          let value={domain:1,uid:2,iid: expertlist[index].id,cpy:0}
          await UpdateLog(
            value,
          ).then((res) => {
            //console.log(res)
          });
          }}>
          <a {...item.children.wrapper}>
            {/* <span {...item.children.img}>
            <Image
            height="100%"
            alt={expertlist[index].title}
            src={expertlist[index].imgLink}
            fallback={defaultImg}
          />
            </span> */}
            {/* <span>{expertlist[index].title}<br></br><br></br>位于：{expertlist[index].place}</span> */}
            
            <p style={{fontSize:'18px'}}><b>{expertlist[index].name}</b></p>
            <p>设备型号：{expertlist[index].model}</p>
            <p>位置：{expertlist[index].place}</p>
            <p>产自：{expertlist[index].makein}</p>
            {/* <p {...item.children.content}  
            onClick={async()=>{history.push({
              pathname: '/details_resource',
              query: {
                productID:expertlist[index].id,
              },
            })
            let value={domain:1,uid:2,iid: expertlist[index].id,cpy:0}
            await UpdateLog(
              value,
            ).then((res) => {
              //console.log(res)
            });
            }}>{expertlist[index].name}</p> */}
          </a>
        </Col>
      );
    });

  render() {
    const { ...props } = this.props;
    const { dataSource,expertlist } = props;
    delete props.dataSource;
    delete props.isMobile;
    const childrenToRender = this.getChildrenToRender(
      dataSource.block.children,expertlist
    );
    return (
      <div {...props} {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <div key="title" {...dataSource.titleWrapper}>
            {dataSource.titleWrapper.children.map(getChildrenToRender)}
          </div>
          <OverPack
            className={`content-template ${props.className}`}
            {...dataSource.OverPack}
          >
            <TweenOneGroup
              component={Row}
              key="ul"
              enter={{
                y: '+=30',
                opacity: 0,
                type: 'from',
                ease: 'easeInOutQuad',
              }}
              leave={{ y: '+=30', opacity: 0, ease: 'easeInOutQuad' }}
              {...dataSource.block}
            >
              {childrenToRender}
            </TweenOneGroup>
          </OverPack>
        </div>
      </div>
    );
  }
}

export default Content5;
