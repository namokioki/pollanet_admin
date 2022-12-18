import React from 'react'
import Table from 'react-bootstrap/Table';
import { Card, Form, Button, Badge } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import UserItem from './UserItem';
import '../Paging.css';
import Pagination from 'react-js-pagination';
import { withRouter } from 'react-router-dom';

const UserList = ({ location,history }) => {
  const search = qs.parse(location.search, { ignoreQueryPrefix: true })
  const page = !search.page ? 1 : parseInt(search.page)
  const searchWord = !search.word ? '' : search.word;
  
  const num = 10;
  const [users, setUsers] = useState();
  const [total, setTotal] = useState(0);
  const [chkItems, setChkItems] = useState([]);
  const [word, setWord]= useState(searchWord);

  const callAPI = async () => {
    const result = await axios.get(`/user/userStatusWeb?search=${word}&page=${page}&num=${num}`);
    console.log(word)
    setUsers(result.data.userList);
    setTotal(result.data.total);
  }

  const onAllCheck = (checked) => {
    if (checked) {
      const all = [];
      users.forEach(users => all.push(users.user_id));
      setChkItems(all);
    } else {
      setChkItems([]);
    }
  }

  const onSingleCheck = (user_id, checked) => {
    if (checked) {
      setChkItems(chkItems.concat(user_id));
    } else {
      setChkItems(chkItems.filter(item => item !== user_id));
    }
  }

  const onClickDel = () => {
    if (chkItems.length === 0) {
      alert('탈퇴 유저를 선택하세요')
      return;
    }
    if (!window.confirm(`${chkItems.length}명의 회원을 삭제하시겠습니까?`)) return;
    chkItems.forEach(async (chkItem) => {
      console.log(chkItem)
      const userDel = { user_id: chkItem }
      await axios.post(`/user/adminUserDel/${chkItem}`, userDel)
    })
    setChkItems([]);
    callAPI();
    history.push(`/admin/user/userStatusWeb?search=${word}&page=${page}&num=${num}`)
  }

  const onClickReport = () => {
    if (chkItems.length === 0) {
      alert('신고 유저를 선택하세요')
      return;
    }
    if (!window.confirm(`${chkItems.length}명의 회원을 정지하시겠습니까?`)) return;
    chkItems.forEach(async (chkItem) => {
      console.log(chkItem)
      const userReport = { user_id: chkItem }
      await axios.post(`/user/adminUserBlack/${chkItem}`, userReport)
    })
    setChkItems([]);
    callAPI();
    history.push(`/admin/user/userStatusWeb?search=${word}&page=${page}&num=${num}`)
  }
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      history.push(`/admin/user/userStatusWeb?search=${e.target.value}&page=${page}&num=${num}`)
    }
    history.push(`/admin/user/userStatusWeb?search=${e.target.value}&page=${page}&num=${num}`)
  }

  const onChangePage = (e) => {
    history.push(`/admin/user/userStatusWeb?search=${word}&page=${e}&num=${num}`);
  }
  useEffect(() => {
    callAPI();
  }, [location,history]);

  if (!users) return <h1>Loading...</h1>

  return (
    <div id='userlist'>
      <Card className='p-2 my-3' style={{ width: '100%' }}>
        <Form style={{ float: 'left' }}>
          <Button variant="dark" style={{ float: 'left' }} onClick={onClickDel}>회원탈퇴</Button>
          <Button variant="dark" style={{ float: 'left', marginLeft: "10px" }} onClick={onClickReport}>회원정지</Button>
          {/* <Form.Group as={Col} controlId="formGridState" style={{ float: 'right' }}>
            <Form.Select defaultValue="카테고리">
              <option>신고순</option>
              <option>이름순</option>
              <option>댓글순</option>
              <option>추천순</option>
            </Form.Select>
          </Form.Group> */}
          <Button variant="dark" style={{ float: 'right', marginRight: '10px' }} onClick={onKeyDown}> Search</Button>
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
            <th>
              <input type="checkbox"
                checked={chkItems.length === users.length ? true : false}
                onChange={(e) => onAllCheck(e.target.checked)} />
            </th>
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
            <UserItem key={user.user_id} user={user} chkItems={chkItems} onSingleCheck={onSingleCheck} />
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

export default withRouter (UserList)
