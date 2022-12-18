import React from 'react'
import axios from 'axios';
import qs from 'qs';
import { Card, Form, Button, Table, Badge } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import UserReportItem from './UserReportItem';
import '../Paging.css';
import Pagination from 'react-js-pagination';
import { withRouter } from 'react-router-dom';

const UserReportList = ({ location,history}) => {
  const search = qs.parse(location.search, { ignoreQueryPrefix: true })
  const page = !search.page ? 1 : parseInt(search.page)
  const searchWord = !search.word ? '' : search.word;
  const [total, setTotal] = useState(0);

  const num = 10;
  const [users, setUsers] = useState([]);
   const [word, setWord]= useState(searchWord);

  const callAPI = async () => {
    const result = await axios.get(`/user/userBlackListWeb?search=${word}&page=${page}&num=${num}`);
    console.log(num);
    console.log(page);
    setUsers(result.data.BlackList);
    setTotal(result.data.blackTotal);
  }
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      history.push(`/admin/user/userBlackList?search=${e.target.value}&page=${page}&num=${num}`)
    }
    history.push(`/admin/user/userBlackList?search=${e.target.value}&page=${page}&num=${num}`)
  }
const onChangePage = (e) => {
    history.push(`/admin/user/userBlackList?search=${word}&page=${e}&num=${num}`);
  }

  useEffect(() => {
    callAPI();
  },[location,history]);

  if (!users) return <h1>Loading...</h1>

  return (
    <div id='userlist'>
      <Card className='p-2 my-3' style={{ width: '100%' }}>
        <Form style={{ float: 'left' }}>
          {/* <Form.Group as={Col} controlId="formGridState" style={{ float: 'right' }}>
            <Form.Select defaultValue="카테고리">
              <option>신고순</option>
              <option>이름순</option>
              <option>댓글순</option>
              <option>추천순</option>
            </Form.Select>
          </Form.Group> */}
          <Button variant="dark" style={{ float: 'right', marginRight: '10px' }}  onClick={onKeyDown}> Search</Button>
          <Form.Control
            style={{ width: "30%" }}
            id="search_box"
            type="search"
            placeholder="유저이름"
            className="me-2"
             onChange={(e) => setWord(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Search" />
          <Button variant="light" style={{ float: 'right', marginRight: '10px' }}>
            유저수 <Badge bg="primary">{total}</Badge>
            <span className="visually-hidden">unread messages</span>
          </Button>
        </Form>
      </Card>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>아이디</th>
            <th>닉네임</th>
            <th>이름</th>
            <th>가입일</th>
            <th>회원정지</th>
            <th>탈퇴회원</th>
            <th>유저정보</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <UserReportItem key={user.user_id} user={user}/>
          )}
        </tbody>
      </Table>
      <Pagination
        activePage={ page }
        itemsCountPerPage={num}
        totalItemsCount={ total }
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={onChangePage} />
    </div>
  )
}

export default withRouter (UserReportList)
