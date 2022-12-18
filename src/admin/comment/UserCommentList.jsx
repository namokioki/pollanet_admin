import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Card, Form, Button, Nav, Col, Table, Badge } from 'react-bootstrap';
import {withRouter } from 'react-router-dom';
import qs from 'qs';
import '../Paging.css';
import Pagination from 'react-js-pagination';
import UserCommentItem from './UserCommentItem';

const UserCommentList = ({ match,location,history }) => {
    const c_user_id = match.params.c_user_id;
    const search = qs.parse(location.search, { ignoreQueryPrefix: true })
  const page = !search.page ? 1 : parseInt(search.page)

  const num = 10;
  const [comments, setComments] = useState([]);
  const [chkItems, setChkItems] = useState([]);
  const [total, setTotal] = useState(10);

  const callComment = async () => {
    const result = await axios.get(`/comment/uclist?c_user_id=${c_user_id}&page=${page}&num=${num}`);
    const newComments = comments.concat(result.data);
    setComments(newComments);
    setComments(result.data);
  }
    
  const onAllCheck = (checked) => {
    if (checked) {
      const all = [];
      comments.forEach(comments => all.push(comments.comment_code));
      setChkItems(all);
    } else {
      setChkItems([]);
    }
  }

  const onSingleCheck = (comment_code, checked) => {
    if (checked) {
      setChkItems(chkItems.concat(comment_code));
    } else {
      setChkItems(chkItems.filter(item => item !== comment_code));
    }
  }

  const onClickDel = () => {
    if (chkItems.length === 0) {
      alert('삭제할 댓글을 선택하세요')
      return;
    }
    if (!window.confirm(`${chkItems.length}개의 댓글을 삭제하시겠습니까?`)) return;
    chkItems.forEach(async (chkItem) => {
      console.log(chkItem)
      const commentDel = { c_user_id: chkItem }
      await axios.post(`/comment/delete/${chkItem}`, commentDel)
    })
    setChkItems([]);
    callComment();
    history.push(`/admin/comment/uclist?c_user_id=${c_user_id}&page=${page}&num=${num}`);
  }

  const onChangePage = (e) => {
    history.push(`/admin/comment/uclist?c_user_id=${c_user_id}&page=${e}&num=${num}`);
  }

  useEffect(() => {
    callComment();
  }, [page,location,history]);

  if (!comments) return <h1>Loading...</h1>
  return (
    <div id='userlist'>
      <h1>{c_user_id}의 댓글 목록</h1>
      <Card className='p-2 my-3' style={{ width: '100%' }}>
      <Form style={{ float: 'left' }}>
        <Button variant="dark" style={{ float: 'left' }} onClick={onClickDel}> 삭제</Button>
        <Form.Group as={Col} controlId="formGridState" style={{ float: 'right' }}>
        </Form.Group>
        <Button variant="dark" style={{ float: 'right', marginRight: '10px' }}> Search</Button>
        
        <Form.Control
          style={{ width: "50%" }}
          id="search_box"
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search" />
      <Button variant="light" style={{ float: 'right', marginRight: '10px' }}>
          댓글수 <Badge bg="primary">{total}</Badge>
          <span className="visually-hidden">messages</span>
        </Button>
      </Form>
    </Card>
    <Table striped bordered hover>
      <thead>
        <tr >
          <th>

        <input type="checkbox"
              checked={chkItems.length === comments.length ? true : false}
              onChange={(e) => onAllCheck(e.target.checked)} />
          </th>
          <th>No.</th>
          <th>작성자</th>
          <th>작성일자</th>
          <th>댓글</th>
          <th>삭제</th>
          <th>조회수</th>
          <th>수정일자</th>
          <th>게시글번호</th>
          <th>분류</th>
        </tr>
      </thead>
      <tbody>
        {comments.map(comment =>
          <UserCommentItem key={comment.comment_code} comment={comment} chkItems={chkItems} onSingleCheck={onSingleCheck} />
        )}
      </tbody>
    </Table>
    <Pagination
        activePage={ page }
        itemsCountPerPage={num}
        totalItemsCount={total}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={onChangePage} />
  </div>
  )
}

export default withRouter (UserCommentList)