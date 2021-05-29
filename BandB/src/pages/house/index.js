import React, { useState, useEffect } from 'react';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Info from './components/Info'
import Lists from './components/Lists'
import { useStoreHook } from 'think-react-store'
import { useObserverHook } from '@/hooks'
import { CommonEnum } from '@/enums'
import {useLocation} from 'umi'
import './index.less'
export default function (props) {
  const { house: { order,hasOrderAsync,addOrderAsync,delOrderAsync,detail, getDetailAsync, getCommentsAsync ,comments,reloadComments,reloadCommentsNum,showLoading,resetData} } = useStoreHook()
  const {query} = useLocation()
  // 监听loading是否展示出来
  // 触发reload修改分页
  // 监听reload重新请求接口
  // 拼装数据
  useObserverHook('#' + CommonEnum.LOADING_ID, (entries) => {
    if (comments && comments.length && showLoading && entries[0].isIntersecting) {
      reloadComments()
    }
  }, [comments,showLoading])

  useEffect(() => {
    getDetailAsync({
      id:query?.id
    })
  }, [])

  useEffect(() => {
    getCommentsAsync({
      id:query?.id
    })
  }, [reloadCommentsNum])

  useEffect(() => {
    hasOrderAsync({
      id:query?.id
    })
  }, [])

  useEffect(() => {
    return ()=>{
      resetData({
        detail:{}
      })
    }
  }, [])
  

  const handleBtnClick = (id)=>{
    if(!id){
      addOrderAsync({
        id:query?.id
      })
    }else{
      delOrderAsync({
        id:query?.id
      })
    }
  }

  return (
    <div className='house-page'>
      {/* banner */}
      <Banner banner={detail?.banner}></Banner>
      {/* 房屋信息 */}
      <Info detail={detail?.info} order={order} btnClick={handleBtnClick}></Info>
      {/* 评论列表 */}
      <Lists lists={comments} showLoading={showLoading}></Lists>
      {/* footer */}
      <Footer></Footer>
    </div>
  )
}