import React,{useState,useEffect} from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { Row, Col,Card,Skeleton,Avatar,Typography,Popover   } from 'antd';
import{history} from 'umi'
import company from '@/assets/company.svg'
import { getChildrenToRender } from './utils';

const { Paragraph } = Typography;
const { Meta } = Card;
function Feature7(props) {
  const [isLoading,setIsLoading] = useState(true)
  const { dataSource, isMobile,companylist, ...tagProps } = props;
  const { blockWrapper, titleWrapper } = dataSource;
  useEffect(()=>{
    companylist?setIsLoading(false):setIsLoading(true)
  },[companylist])
  const childrenToRender = blockWrapper.children.map((item, i) => {
    const data = isLoading?{}:(
      <div>
        <p>{companylist[i].businessscope}</p>
      </div>
    );
    const title = isLoading?"加载中":companylist[i].name
    const context = isLoading?"Loading":companylist[i].businessscope
    return(
      <Col {...item} key={i.toString()} onClick={()=>{history.push({
        pathname: '/details_company',
        query: {
          productID:companylist[i].id,
        },
      });}}>
        <Popover content={data} title={title} style={{width:"200px"}}>
          <a {...item.children}>
            
            <Skeleton loading={isLoading} avatar active>
            <Meta
                  avatar={
                    <Avatar src={company} />
                  }
                  title={title} 
                  description={<Paragraph ellipsis>{context}</Paragraph>}
                />
              </Skeleton>
          
          </a>
        </Popover>
      </Col>
      )
    });
  return (
    <div {...tagProps} {...dataSource.wrapper}>
      <div {...dataSource.page}>
        <div {...dataSource.titleWrapper}>
          {titleWrapper.children.map(getChildrenToRender)}
        </div>
        <OverPack {...dataSource.OverPack}>
          <QueueAnim
            key="queue"
            type="bottom"
            leaveReverse
            interval={50}
            component={Row}
            {...blockWrapper}
          >
            {childrenToRender}
          </QueueAnim>
        </OverPack>
      </div>
    </div>
  );
}

export default Feature7;
