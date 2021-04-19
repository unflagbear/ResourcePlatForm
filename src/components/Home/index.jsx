/* eslint no-undef: 0 */
/* eslint arrow-parens: 0 */
import React from 'react';
import { enquireScreen } from 'enquire-js';

// import Nav2 from './Nav2';
import Banner0 from './Banner0';
import Feature8 from './Feature8';
import Feature6 from './Feature6';
import Content5 from './Content5';
import Feature7 from './Feature7';
import Teams2 from './Teams2';
// import Footer0 from './Footer0';

import {
  // Nav21DataSource,
  Banner00DataSource,
  Feature80DataSource,
  Feature60DataSource,
  Content50DataSource,
  Feature70DataSource,
  Teams20DataSource,
  // Footer00DataSource,
} from './data.source';

// import './less/antMotionStyle.less';

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const { location = {} } = typeof window !== 'undefined' ? window : {};

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
      show: !location.port, // 如果不是 dva 2.0 请删除
    };
  }

  componentDidMount() {
    // 适配手机屏幕;
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
    // dva 2.0 样式在组件渲染之后动态加载，导致滚动组件不生效；线上不影响；
    /* 如果不是 dva 2.0 请删除 start */
    if (location.port) {
      // 样式 build 时间在 200-300ms 之间;
      setTimeout(() => {
        this.setState({
          show: true,
        });
      }, 500);
    }
    /* 如果不是 dva 2.0 请删除 end */
  }

  render() {
    const {homeData}=this.props
    const {companyNum,equipmentNum,expertNum,equipmentList,companies,experts}=homeData
    const children = [
      // <Nav2
      //   id="Nav2_1"
      //   key="Nav2_1"
      //   dataSource={Nav21DataSource}
      //   isMobile={this.state.isMobile}
      // />,
      <Banner0
        id="Banner0_0"
        key="Banner0_0"
        dataSource={Banner00DataSource}
        isMobile={this.state.isMobile}
      />,
      
      <Feature6
        id="Feature6_0"
        key="Feature6_0"
        dataSource={Feature60DataSource}
        numData= {[107081,25160,57095,158,683]}
        isMobile={this.state.isMobile}
      />,
      <Content5
        id="Content5_0"
        key="Content5_0"
        expertlist={equipmentList}
        dataSource={Content50DataSource}
        isMobile={this.state.isMobile}
      />,
      <Feature7
        id="Feature7_0"
        key="Feature7_0"
        companylist = {companies}
        dataSource={Feature70DataSource}
        isMobile={this.state.isMobile}
      />,
      <Teams2
        id="Teams2_0"
        key="Teams2_0"
        expertlist = {experts}
        dataSource={Teams20DataSource}
        isMobile={this.state.isMobile}
      />,<Feature8
      id="Feature8_0"
      key="Feature8_0"
      dataSource={Feature80DataSource}
      isMobile={this.state.isMobile}
    />,
      // <Footer0
      //   id="Footer0_0"
      //   key="Footer0_0"
      //   dataSource={Footer00DataSource}
      //   isMobile={this.state.isMobile}
      // />,
    ];
    return (
      <div style={{margin:"-24px"}}
        className="templates-wrapper"
        ref={(d) => {
          this.dom = d;
        }}
      >
        {/* 如果不是 dva 2.0 替换成 {children} start */}
        {this.state.show && children}
        {/* 如果不是 dva 2.0 替换成 {children} end */}
      </div>
    );
  }
}
