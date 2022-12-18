import React from 'react'
import UserList from './UserList'
import ListGroup from 'react-bootstrap/ListGroup';
import UserRead from './UserRead';
import UserReportList from './UserReportList';
import { Route } from 'react-router-dom';

const UserPage = () => {
    return (
        <div id='user'>
            <h1 className='title'>유저 목록</h1>
            <div className='u_page'>
                <div className='u_nav'>
                    <h3 className='nav_title'>유저관리</h3>
                    <ListGroup>
                        <ListGroup.Item action href="/admin/user/userStatusWeb">유저목록</ListGroup.Item>
                        <ListGroup.Item action href="/admin/user/userBlackList">신고유저관리</ListGroup.Item>
                    </ListGroup>
                </div>
            </div>
            <Route path="/admin/user/userStatusWeb" component={UserList} exact/>
            <Route path="/admin/user/userBlackList" component={UserReportList} exact/>
            <Route path="/admin/user/userReadSt/:user_id" component={UserRead}/>
        </div>
    )
}

export default UserPage
