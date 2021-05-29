import React, { useState, useEffect,memo } from 'react';
import { history } from "umi";
function Hot(props) {

  useEffect(() => {

  }, [])
  const handleClick = (id)=>{
    history.push({
      pathname:'/house',
      query:{
        id
      }
    })
  }
  return (
    <div>
      <h1>最热民宿</h1>
      <div className='hot-lists'>
        {props?.houses?.map(item => (
          <div className='hot-lists-item' key={item.id} onClick={()=>{handleClick(item.id)}}>
            <img className='img' alt='img' src={item?.imgs[0]?.url}></img>
            <div className='title'>{item.title}</div>
            <div className='info'>{item.info}</div>
            <div className='price'>￥{item.price}</div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default memo(Hot)