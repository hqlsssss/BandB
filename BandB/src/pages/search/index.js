import React, { useState, useEffect } from 'react';
import { SearchBar, ActivityIndicator } from 'antd-mobile'
import { useHttpHook, useObserverHook ,useImgHook} from '@/hooks'
import {ShowLoading} from '@/components'
import {CommonEnum} from '@/enums'
import {useLocation} from 'umi'
import './index.less'
export default function (props) {
  const {query} = useLocation()
  console.log(query);
  const [houseName, setHouseName] = useState('')
  const [page, setPage] = useState(CommonEnum.PAGE)
  const [houseLists,setHouseLists] = useState([])
  const [showLoading,setShowLoading] = useState(true)
  const [houseSubmitName,sethouseSubmitName] = useState('')
  const [houses, loading] = useHttpHook({
    url: '/house/search',
    body: {
      ...page,
      houseName,
      code:query?.code,
      startTime:query?.startTime+' 00:00:00',
      endTime:query?.endTime+' 23:59:59',
    },
    watch: [page.pageNum,houseSubmitName]
  })


  useImgHook('.item-img',(entries)=>{},null)
  
  // 监听loading是否展示出来
  // 修改分页数据
  // 监听分页数据的修改，发送接口，请求下一页的数据
  // 监听loading的变化，拼装数据
  useObserverHook('#'+CommonEnum.LOADING_ID, (entries) => {
    if (!loading && entries[0].isIntersecting) {
      setPage({
        ...page,
        pageNum: page.pageNum + 1
      })
    }
  }, null)

  const handleChange = (value) => {
    setHouseName(value)
  }
  const handleCancel = () => {
    setHouseName('')
    sethouseSubmitName('')
    setPage({
      pageSize:8,
      pageNum:1
    })
    setHouseLists([])
  }
  const handleSubmit = (value) => {
    setHouseName(value)
    sethouseSubmitName(value)
    setPage({
      pageSize:8,
      pageNum:1
    })
    setHouseLists([])
  }

  useEffect(() => {
    if(!loading && houses){
      if(houses.length){
        setHouseLists([...houseLists,...houses])
        if(houses.length < page.pageSize){
          setShowLoading(false)
        }
      }else{
        setShowLoading(false)
      }
    }
  }, [loading])
  return (
    <div className='search-page'>
      {/* 顶部搜索栏 */}
      <SearchBar
        placeholder='搜索民宿'
        value={houseName}
        onChange={handleChange}
        onCancel={handleCancel}
        onSubmit={handleSubmit}>
      </SearchBar>
      {!houseLists.length
        ? <ActivityIndicator toast></ActivityIndicator>
        : <div className='result'>
          {houseLists.map(item => (
            <div className='item' key={item.id}>
              <img alt='img' className='item-img' src={require('../../assets/blank.png')} data-src={item?.imgs[0]?.url}></img>
              <div className='item-right'>
                <div className='title'>{item.name}</div>
                <div className='price'>{item.price}</div>
              </div>
            </div>
          ))}
        </div>}
      <ShowLoading showLoading={showLoading}></ShowLoading>
    </div>
  )
}