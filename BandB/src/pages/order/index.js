import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd-mobile'
import Lists from './components/Lists'
import { useHttpHook, useObserverHook } from '@/hooks'
import { CommonEnum } from '@/enums'
import { Http } from '@/utils'
import { ErrorBoundary } from '@/components'
import { isEmail, isEmpty } from 'project-libs'
import './index.less'
export default function (props) {
  const [page, setPage] = useState(CommonEnum.PAGE)
  const [orders, setOrders] = useState([])
  const [showLoading, setShowLoading] = useState(true)
  const [type, setType] = useState(0)
  // const [orders] = useHttpHook({
  //   url:'/order/lists',
  //   body:{
  //     ...page,
  //   }
  // })

  const invokeHttp = async (pageNum) => {
    const result = await Http({
      url: '/orders/lists',
      body: {
        ...page,
        pageNum,
        type
      }
    })
    return result
  }
  const handleChange = (e) => {
    setType(e.sub)
    setPage(CommonEnum.PAGE)
    setOrders([])
    setShowLoading(true)
  }
  const fetchOrder = async (pageNum) => {
    const result = await invokeHttp(pageNum)
    if (!isEmpty(result) && result.length <= page.pageSize) {
      setOrders(result)
      setShowLoading(true)
    } else {
      setShowLoading(false)
    }
  }
  const tabs = [
    { title: '未支付', sub: 0 },
    { title: '已支付', sub: 1 },
  ]
  // 页面初始化请求接口
  // 监听loading组件是否展示出来
  // 修改page,pageNume+1，再次重新请求接口
  // 拼装数据,然后page
  useObserverHook('#' + CommonEnum.LOADING_ID, async (entries) => {
    console.log(entries);
    if (entries[0].isIntersecting) {
      const result = await invokeHttp(page.pageNum + 1)
      if (!isEmpty(result) && !isEmpty(result) && result.length === page.pageSize) {
        setOrders([...orders, ...result])
        setPage({
          ...page,
          pageNum: page.pageNum + 1
        })
        setShowLoading(true)
      } else {
        setShowLoading(false)
      }
    }
  }, null)
  useEffect(() => {
    fetchOrder(1)
    // 当type发生改变就发送网络请求
  }, [type])

  return (
    <ErrorBoundary>
      <div className='order-page'>
        <Tabs
          tabs={tabs}
          onChange={handleChange}>
          <div className='tab'>
            <Lists orders={orders} type={0} showLoading={showLoading}></Lists>
          </div>
          <div className='tab'>
            <Lists orders={orders} type={1} showLoading={showLoading}></Lists>
          </div>
        </Tabs>
      </div>
    </ErrorBoundary>

  )
}