import { queryHomePageData} from '@/services/pagedata';

const HomePageData = {
    namespace: 'homePageData',
    state: {
      homeData: {}
    },
    effects: {
        *getHomeData({payload},{call,put}){
            const response = yield call(queryHomePageData,payload);
            yield put ({
                type:'getHomeList',
                payload: response
            })
        }
    },
    reducers: {
        getHomeList(state,{payload}){
            return {...state,homeData: payload.data}
        }
    }
}
export default HomePageData;