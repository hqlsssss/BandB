import React, { useState, useEffect } from 'react';
import {Button} from 'antd-mobile'
import {timer} from '@/utils'
export default function(props){
  const [state, setState] = useState()
  
  const renderPay = ()=>{
    switch (props.type) {
      case 0:
        return <Button type='warning' size='small'>去支付</Button>
      case 1:
        return <Button size='small'>已完成</Button>
      default:
        break;
    }
  }
  useEffect(() => {

  }, [])

  return (
    <div className='order-item'>
      <img alt='order' src={props?.house?.imgs[0]?.url}></img>
      <div className='center'>
        <div className='title'>
          {props?.house?.name}
        </div>
        <div className='price'>
          {props?.house?.price}
        </div>
        <div className='time'>
          {timer(props?.createTime,'day')}
        </div>
      </div>
      <div className='pay'>
        {
          renderPay()
        }
      </div>
    </div>
  )
}