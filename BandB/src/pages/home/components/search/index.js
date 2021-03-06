import React, { useState, useEffect,memo} from 'react';
import { Picker, List, Calendar, Button,Toast } from 'antd-mobile'
import dayjs from 'dayjs'
import {history} from 'umi'

function Search(props) {
  const [selectedCity, setSelectedCity] = useState(['10001'])
  const [times, setTimes] = useState('可选时间')
  const [dateShow, setDateShow] = useState(false)
  console.log('SEARCH');
  useEffect(() => {

  }, [])

  const handleChange = (value) => {
    setSelectedCity(value)
  }

  const handleDate = () => {
    setDateShow(!dateShow)
  }

  const handleDateConfirm = (startTime, endTime) => {
    setDateShow(!dateShow)
    setTimes(dayjs(startTime).format('YYYY-MM-DD') + '~' + dayjs(endTime).format('YYYY-MM-DD'))
  }

  const handleClick = ()=>{
    if(times.includes('~')){
      history.push({
        pathname:'/search',
        query:{
          code:selectedCity,
          startTime:times.split('~')[0],
          endTime:times.split('~')[1]
        }
      })
    }else{
      Toast.fail('请选择时间')
    }
    
  }
  return (
    <div className='search'>
      {/* 可选城市 */}
      <div className='search-addr'>
        {!props.citysLoading && <Picker
          title='城市'
          data={props.citys}
          value={selectedCity}
          cascade={false}
          cols={1}
          onChange={handleChange}
        >
          <List.Item>可选城市</List.Item>
        </Picker>}

      </div>
      {/* 可选时间 */}
      <div className='search-time' onClick={handleDate}>
        <p className='search.time_left'>出租时间</p>
        <p className='search.time_right'>{times}</p>
      </div>
      {/* 点击按钮 */}
      <Button type='warning' size='large' onClick={handleClick}>搜索民宿</Button>
      <Calendar
        visible={dateShow}
        onCancel={handleDate}
        onConfirm={handleDateConfirm}>

      </Calendar>
    </div>
  )
}

function areEqual(prevProps,nextProps){
  console.log(prevProps,nextProps);
  if(prevProps.citys === nextProps.citys && prevProps.citysLoading === nextProps.citysLoading){
    return true
  }else{
    return false
  }
}
export default memo(Search,areEqual)