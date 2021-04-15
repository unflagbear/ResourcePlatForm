import React from 'react';
import { Row, Col,Image } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import defaultImg from '@/assets/defaultImg.svg'

import { getChildrenToRender } from './utils';
import {history} from'umi'

class Content5 extends React.PureComponent {

  getChildrenToRender = (data,expertlist) =>
    data.map((item) => {
      const {name} = item
      const index = name.charAt(name.length-1)
      if(!expertlist){
        return null;
      }
      return (
        <Col key={item.name} {...item}>
          <a {...item.children.wrapper}>
            <span {...item.children.img}>
            <Image
            height="100%"
            alt={expertlist[index].title}
            src={expertlist[index].imgLink}
            fallback={defaultImg}
           
          />
            </span>
            <p {...item.children.content}  
            onClick={()=>{history.push({
              pathname: '/details_resource',
              query: {
                productID:expertlist[index].id,
              },
            })}}>{expertlist[index].name}</p>
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
