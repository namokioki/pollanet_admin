import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Card, Form, Button, Nav, Col, Table, Badge } from 'react-bootstrap';
import {withRouter } from 'react-router-dom';
import qs from 'qs';
import BoardItem from './BoardItem';
import '../Paging.css';
import Pagination from 'react-js-pagination';

const UserBoardList = ({ match,location,history }) => {
  const search = qs.parse(location.search, { ignoreQueryPrefix: true })
  const page = !search.page ? 1 : parseInt(search.page)


  const num = 10;
  const b_user_id = match.params.b_user_id;
  const [boards, setBoards] = useState([]);
  const [chkItems, setChkItems] = useState([]);
  const [total, setTotal] = useState(0);

  const callBoard = async () => {
    const result = await axios.get(`/board/userBoardList/${b_user_id}?page=${page}&num=${num}`);
    const newBoards = boards.concat(result.data);
    setBoards(newBoards);
    setBoards(result.data);
  }
    
  const onAllCheck = (checked) => {
    if (checked) {
      const all = [];
      boards.forEach(boards => all.push(boards.board_code));
      setChkItems(all);
    } else {
      setChkItems([]);
    }
  }

  const onSingleCheck = (board_code, checked) => {
    if (checked) {
      setChkItems(chkItems.concat(board_code));
    } else {
      setChkItems(chkItems.filter(item => item !== board_code));
    }
  }

  const onClickDel = () => {
    if (chkItems.length === 0) {
      alert('탈퇴 유저를 선택하세요')
      return;
    }
    if (!window.confirm(`${chkItems.length}개의 게시글을 삭제하시겠습니까?`)) return;
    chkItems.forEach(async (chkItem) => {
      console.log(chkItem)
      const boardDel = { user_id: chkItem }
      await axios.post(`/board/delete/${chkItem}`, boardDel)
    })
    setChkItems([]);
    callBoard();
  }

  const onChangePage = (e) => {
    history.push(`/admin/board/userBoardList/${b_user_id}?&page=${e}&num=${num}`);
  }

  useEffect(() => {
    callBoard();
  }, [page,location,history]);

  if (!boards) return <h1>Loading...</h1>
  return (
    <div id='userlist'>
      <h1>{b_user_id}의 게시글 목록</h1>
    <Card className='p-2 my-3' style={{ width: '100%' }}>
      <Form style={{ float: 'left' }}>
        <Button variant="dark" style={{ float: 'left' }} onClick={onClickDel}> 삭제</Button>
        <Form.Group as={Col} controlId="formGridState" style={{ float: 'right' }}>
        </Form.Group>
        <Button variant="dark" style={{ float: 'right', marginRight: '10px' }} > Search</Button>
        <Form.Control
          style={{ width: "50%" }}
          id="search_box"
          type="search"
          placeholder="Search"
          className="me-2"

          aria-label="Search" />
          <Button variant="light" style={{ float: 'right', marginRight: '10px' }}>
            게시글수 <Badge bg="primary">{total}</Badge>
            <span className="visually-hidden">unread messages</span>
          </Button>
      </Form>
    </Card>
    <Table striped bordered hover>
      <thead>
        <tr >
        <th>
          <input type="checkbox"
            checked={chkItems.length === boards.length ? true : false}
            onChange={(e) => onAllCheck(e.target.checked)} />
        </th>
          <th>No.</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
          <th>삭제</th>
          <th>신고</th>
          <th>댓글</th>
          <th>추천수</th>
        </tr>
      </thead>
      <tbody>
        {boards.map(board =>
          <BoardItem key={board.board_code} board={board} chkItems={chkItems} onSingleCheck={onSingleCheck} />
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

export default withRouter(UserBoardList)