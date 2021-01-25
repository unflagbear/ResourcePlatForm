import React, { useEffect } from 'react';
import { connect } from 'umi';

import Home from '../../../components/Home';

const HomePage = ({ dispatch, homePageData: { homeData = {} } }) => {
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'homePageData/getHomeData',
        payload: {
          current: 0,
          limit: 8,
        },
      });
    }
  }, []);
  return <Home homeData={homeData} />;
};
export default connect(({ homePageData }) => ({
  homePageData,
}))(HomePage);
