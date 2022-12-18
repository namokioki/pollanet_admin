import React from 'react'
import MissionList from './MissionList'
import MissionRead from './MissionRead'
import MissionInsert from './MissionInsert'
import { ListGroup } from 'react-bootstrap'
import { Route } from 'react-router-dom'

const MissionPage = () => {
  return (
    <div id='user'>
      <h1 className='title'>미션 목록</h1>
      <div className='u_page'>
        <div className='u_nav'>
          <h3 className='nav_title'>미션 관리</h3>
          <ListGroup>
            <ListGroup.Item action href="/admin/mission/listTotal">미션목록</ListGroup.Item>
            <ListGroup.Item action href="/admin/mission/insert">미션등록</ListGroup.Item>
          </ListGroup>
        </div>
      </div>
      <Route path="/admin/mission/listTotal" component={MissionList} />
      <Route path="/admin/mission/read/:mission_code" component={MissionRead} />
      <Route path="/admin/mission/insert" component={MissionInsert} />
    </div>
  )
}

export default MissionPage
