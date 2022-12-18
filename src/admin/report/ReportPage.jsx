import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { Route, withRouter } from 'react-router-dom';
import ReportInsert from './ReportInsert';
import ReportList from './ReportList';


const ReportPage = () => {
  return (
    <div id='user'>
    <h1 className='title'>신고 관리</h1>
    <div className='u_page'>
        <div className='u_nav'>
            <h3 className='nav_title'>신고관리</h3>
            <ListGroup>
                <ListGroup.Item action href="/admin/report/list">신고목록</ListGroup.Item>
                <ListGroup.Item action href="/admin/report/insert">유저신고목록</ListGroup.Item>
            </ListGroup>
        </div>
    </div>
    <Route path="/admin/report/list" component={ReportList}/>
    <Route path="/admin/report/insert" component={ReportInsert} />
</div>
  )
}

export default withRouter (ReportPage)