import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { Row, Col,Image,Typography } from 'antd';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import expert from '@/assets/expert.svg'
import { getChildrenToRender } from './utils';
import {history} from 'umi'
const { Paragraph } = Typography;

class Teams2 extends React.PureComponent {
  getBlockChildren = (data,expertlist) =>
    data.map((item, i) => {
      const { titleWrapper, image, ...$item } = item;
      const name = expertlist?expertlist[i].name:"加载中";
      const img = expertlist?expertlist[i].picpath:expert
      const specialty = expertlist?expertlist[i].specialty:"Loading"
      const workUnit = expertlist?expertlist[i].workunit:"加载中"
      const position = expertlist?expertlist[i].position:"加载中"
      return (
        <Col key={i.toString()} {...$item} onClick={()=>{history.push({
          pathname: '/details_experts',
          query: {
            productID:expertlist[i].id,
          },
        });}}>
          <Row>
            <Col span={7} 
            >
              <div {...image}>
              <Image
            height="100%"
            alt={name}
            src={img}
            fallback={expert}
          />
              </div>
            </Col>
            <Col span={17}>
              <QueueAnim {...titleWrapper} type="bottom">
                <a {...titleWrapper.children}>
                  <h1 name="title" className="teams2-title" >{name}</h1>
                  <div name="content" className="teams2-job" >公司：{workUnit||null}</div>
                  <div name="content1" className="teams2-content" ><Paragraph ellipsis>{specialty || null}</Paragraph></div>
                </a>
              </QueueAnim>
            </Col>
          </Row>
        </Col>
      );
    });

  render() {
    const { ...props } = this.props;
    const { dataSource,expertlist } = props;
    delete props.dataSource;
    delete props.isMobile;
    const listChildren = this.getBlockChildren(dataSource.block.children,expertlist);
    return (
      <div {...props} {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <div {...dataSource.titleWrapper}>
            {dataSource.titleWrapper.children.map(getChildrenToRender)}
          </div>
          <OverPack {...dataSource.OverPack}>
            <QueueAnim type="bottom" key="tween" leaveReverse>
              <QueueAnim
                type="bottom"
                key="block"
                {...dataSource.block}
                component={Row}
              >
                {listChildren}
              </QueueAnim>
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    );
  }
}

export default Teams2;
