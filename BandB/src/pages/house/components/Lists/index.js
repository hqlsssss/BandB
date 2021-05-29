import React, { useState, useEffect } from 'react';
import {ShowLoading} from '@/components'
import {timer} from '@/utils';

export default function(props){
  const [state, setState] = useState()

  useEffect(() => {
    
  }, [])
  // console.log(props)
  return (
    
    <div className='comment'>
      <h1 className='comment-title'></h1>
      <div className='comment-lists'>
        {props?.lists?.map(item=>(
          <div className='comment-lists_item' key={item?.id}>
          <img alt='user' className='avatar' src={item?.user?.avatar}></img>
          <div className='right'>
            <div className='right-top'>
              <p>{item?.user?.username}</p>
              <p>{timer(item?.createTime)}</p>
            </div>
            <div className='right-bottom'>
             {item?.msg}
            </div>
          </div>
        </div>
        ))}
        <ShowLoading showLoading={props?.showLoading}></ShowLoading>
      </div>
    </div>
  )
}