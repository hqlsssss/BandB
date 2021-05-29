import React, { useState, useEffect } from 'react';
import {Button} from 'antd-mobile'
import {timer} from '@/utils'
export default function(props){
  const [state, setState] = useState()
  const handleOrder = (id)=>{
    props?.btnClick(id)
  }
  const renderButton = ()=>{
    // order里面没有id
    if(!props.order?.id){
      console.log('order里面没有id')
      return <Button className='info-btn' type='warning' onClick={()=>handleOrder()}>预订</Button>
    }

    // 已经有订单，未支付
    if(props.order?.isPayed === 0){
      return <Button className='info-btn' type='ghost' onClick={()=>handleOrder(props.order.id)}>取消预订</Button>
    }

    // 已经支付
    if(props.order?.isPayed === 1){
      return <Button className='info-btn' type='ghost' >居住中</Button>
    }
  }

  useEffect(() => {

  }, [])

  return (
    <div className='info'>
      <div className='info-titile'>{props?.detail?.title}</div>
      <div className='info-msg'>简介:{props?.detail?.info}</div>
      <div className='info-price'>价格:{props?.detail?.price}</div>
      <div className='info-time'>发布时间：{timer(props?.detail?.publishTime)}</div>
      <div className='info-time'>开始时间：{timer(props?.detail?.startTime,'')}</div>
      <div className='info-time'>结束时间：{timer(props?.detail?.endTime,'')}</div>
      {renderButton()}
    </div>
  )
}