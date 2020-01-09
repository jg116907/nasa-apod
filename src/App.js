import React,{ Component } from 'react';
import ViewerTemplate from './components/ViewerTemplate';
import SpaceNavigator from './components/SpaceNavigator';
import Viewer from './components/Viewer';
import moment from 'moment';
import * as api from './lib/api';

class App extends Component {
  state = {
    loading: false,
    maxDate: null, // 오늘 date가 maxdate가 된다.
    date: null,
    url: null,
    mediaType: null,
  }
  // ------ api로 데이터 받아오기
  getAPOD = async (date) => { // 비동기 작업 처리
    if (this.state.loading) return; // 이미 요청 중이면 무시
    // loading 상태 시작
    this.setState({
      loading: true
    });
    try{
      const response = await api.getAPOD(date);
      console.log(response);
      // 새로운 이름으로 값을 지정
      // response.data 안에 있는 media_type 이란 값을 mediaType으로 부르겠다는 의미
      const { date: retrievedDate, url, media_type: mediaType } = response.data; 
      // 만약에 maxDate가 없으면 지금 받은 date로 지정
      if(!this.state.maxDate) {
        this.setState({
          maxDate: retrievedDate
        })
      }
      // 전달받은 데이터 넣어주기
      this.setState({
        date: retrievedDate,
        mediaType,
        url
      });
    } catch(e) {
      console.log(e);
    }
    // 로딩 상태 종료
    this.setState({
      loading: false
    });
  }
  // ------ 이미지 넘기기
  handlePrev = () => {
    const { date } = this.state;
    const prevDate = moment(date).subtract(1,'days').format('YYYY-MM-DD');
    console.log(prevDate);
    this.getAPOD(prevDate);
  }
  handleNext = () => {
    const { date, maxDate } = this.state;
    if (date === maxDate) return;
    
    const nextDate = moment(date).add(1,'days').format('YYYY-MM-DD');
    this.getAPOD(nextDate);
  }
  componentDidMount() {
    this.getAPOD();
  }
  render() {
    const { url, mediaType, loading } = this.state;
    const { handlePrev, handleNext } = this;
    return (
      <ViewerTemplate
        spaceNavigator={<SpaceNavigator onPrev={handlePrev} onNext={handleNext}/>}
        viewer={(
          <Viewer
            url={url}
            mediaType={mediaType}
            loading={loading}
          />
        )}
      />
    );
  }
}

export default App;
