import React, { Component } from 'react';
import {history} from 'umi'
import { TabBar } from 'antd-mobile'
import { BsHouseDoorFill, BsHouseDoor, BsBagFill, BsBag, BsPersonFill, BsPerson, BsHouse } from 'react-icons/bs'
import PropTypes from 'prop-types'
import './index.less'

export default class MenuBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          titile: '首页',
          selectedIcon: <BsHouseDoorFill style={{ fontSize: '1.5rem' }} />,
          icon: <BsHouseDoor style={{ fontSize: '1.5rem' }}></BsHouseDoor>,
          link: '/'
        },
        {
          titile: '订单',
          selectedIcon: <BsBagFill style={{ fontSize: '1.5rem' }} />,
          icon: <BsBag style={{ fontSize: '1.5rem' }}></BsBag>,
          link: '/order'
        },
        {
          titile: '我的',
          selectedIcon: <BsPersonFill style={{ fontSize: '1.5rem' }} />,
          icon: <BsPerson style={{ fontSize: '1.5rem' }}></BsPerson>,
          link: '/user'
        }
      ]
    };
  }

  render() {
    const { show, pathname} = this.props
    console.log(this.props)
    return (
      <div className='menu-bar'>
        <TabBar hidden={!show}>
          {this.state.items.map(item => (
            <TabBar.Item
              key={item.link}
              titile={item.titile}
              icon={item.icon}
              selectedIcon={item.selectedIcon}
              selected = {pathname === item.link}
              onPress={() => history.push(item.link)} 
            />
          ))}
        </TabBar>
      </div>
    )
  }
}

MenuBar.defaultProps = {
  show: false,
  pathname: ''
}

MenuBar.propTypes = {
  show: PropTypes.bool,
  pathname: PropTypes.string
}