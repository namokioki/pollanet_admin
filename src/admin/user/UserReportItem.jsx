import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserReportItem = ({ user }) => {
    const { user_id, name, nickName, tel, email, character_sort,
        address, admin_Code, register_Date, attendance,
        attendance_Date, user_del, user_black } = user;
    return (
        <tr>
            <td style={{ width: '200px' }}>{user_id}</td>
            <td style={{ width: '200px' }}>{nickName}</td>
            <td style={{ width: '200px' }}>{name}</td>
            <td style={{ width: '300px' }}>{register_Date}</td>
            <td style={{ width: '100px' }}>{user_black}</td>
            <td style={{ width: '100px' }}>{user_del}</td>
            <td><Button> <Link to={`/admin/user/userReadSt/${user_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>유저정보보기</Link></Button></td>
        </tr>
    )
}

export default UserReportItem