import React, { useEffect,useState } from 'react';
import { connect } from 'umi';

import Home from '../../../components/Home';
import {getCommend,getUser} from './service'

const HomePage = ({ dispatch, homePageData: { homeData = {} } }) => {
  const [equipmentData,setEquipmentData]=useState([])
  const [expertData,setExpertData]=useState([])
  // var equipmentData = []
  // var expertData= []
  const [userId, setUserId] = useState(0)
  // const [userCpy, setUserCpy] = useState(0)
  const getUserInfo=async()=>{
    await getUser(
    ).then((res) => {
      setUserId(res.data.userid)
      // setUserCpy(res.data.companyId)
    });
  }
  getUserInfo()
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
    var getData = async()=>{
      let value = {domain:1,uid:userId}
      await getCommend(
        value,
      ).then((res) => {
        setEquipmentData(res.result)
        // equipmentData = res.result
        console.log(equipmentData)
      });
      value = {domain:0,uid:userId}
      await getCommend(
        value,
      ).then((res) => {
        setExpertData(res.result)
        // expertData = res.result
        console.log(expertData)
      });
    }
    getData()
  }, [userId]);
  return <Home homeData={homeData} equipmentData={equipmentData} expertData={expertData}/>;
};
export default connect(({ homePageData }) => ({
  homePageData,
}))(HomePage);
