import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup';
import BaordList from './BaordList';
import AddMissionList from './AddMissionList';
import ReportBoardList from './ReportBoardList';
import NoticeList from './NoticeList';
import NoticeInsert from './NoticeInsert';
import BoardRead from './BoardRead';
import UserBoardList from './UserBoardList';
const BoardPage = () => {
  return (
    <div id='user'>
      <h1 className='title'>게시글 목록</h1>
      <div className='u_page'>
        <div className='u_nav'>
          <h3 className='nav_title'>게시글 관리</h3>
          <ListGroup>
            <ListGroup.Item action href="/admin/board/list">자유 게시판</ListGroup.Item>
            <ListGroup.Item action href="/admin/board/missionlist">미션추가 게시글</ListGroup.Item>
            <ListGroup.Item action href="/admin/board/reportlist">유저신고 게시글</ListGroup.Item>
            <ListGroup.Item action href="/admin/board/noticeList">공지사항</ListGroup.Item>
            <ListGroup.Item action href="/admin/board/insertWeb">공지사항 등록</ListGroup.Item>
          </ListGroup>
        </div>
      </div>
      <Route path="/admin/board/list" component={BaordList} />
      <Route path="/admin/board/missionlist" component={AddMissionList}/>
      <Route path="/admin/board/reportlist" component={ReportBoardList}/>
      <Route path="/admin/board/noticeList" component={NoticeList}/>
      <Route path="/admin/board/insertWeb" component={NoticeInsert}/>
      <Route path="/admin/board/read/:board_code" component={BoardRead} />
      <Route path="/admin/board/userBoardList/:b_user_id" component={UserBoardList}/>
    </div>
  )
}

export default withRouter (BoardPage)