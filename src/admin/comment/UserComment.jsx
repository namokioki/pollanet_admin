import Table from 'react-bootstrap/Table';
import { Card, Form, Button, Nav, Col, Badge } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import qs from 'qs';
import '../Paging.css';
import Pagination from 'react-js-pagination';
import { withRouter } from 'react-router-dom';
import UserCommentItem from './UserCommentItem';

const UserComment = ({ location,history }) => {
  const search = qs.parse(location.search, { ignoreQueryPrefix: true })
  console.log(search)
  const page = !search.page ? 1 : parseInt(search.page)
  const searchWord = !search.word ? '' : search.word;

  const num = 10;
  const [comments, setComments] = useState();
  const [total, setTotal] = useState(0);
  const [chkItems, setChkItems] = useState([]);
  const [word, setWord]= useState(searchWord);

  const callAPI = async () => {
    const result = await axios.get(`/comment/allList?page=${page}&num=${num}`);
    setComments(result.data.list);
    setTotal(result.data.total);
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
      const commentDel = { comment_code: chkItem }
      await axios.post(`/comment/delete/${chkItem}`, commentDel)
    })
    setChkItems([]);
    history.push(`/admin/comment/list`)
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      history.push(`/admin/comment/list?m_keyword=${e.target.value}&page=${page}&num=${num}`)
    }
    history.push(`/admin/comment/list?m_keyword=${e.target.value}&page=${page}&num=${num}`)
  }

  const onChangePage = (e) => {
    history.push(`/admin/comment/list?m_keyword=${word}&page=${e}&num=${num}`);
  }

  useEffect(() => {
    callAPI();
  }, [location,history]);

  if (!comments) return <h1>Loading...</h1>
  return (
    <div id='userlist'>
    <Card className='p-2 my-3' style={{ width: '100%' }}>
      <Form style={{ float: 'left' }}>
        <Button variant="dark" style={{ float: 'left' }} onClick={onClickDel}> 삭제</Button>
        <Form.Group as={Col} controlId="formGridState" style={{ float: 'right' }}>
        </Form.Group>
        <Button variant="dark" style={{ float: 'right', marginRight: '10px' }}  onClick={onKeyDown}> Search</Button>
        
        <Form.Control
          style={{ width: "50%" }}
          id="search_box"
          type="search"
          placeholder="Search"
          className="me-2"
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={onKeyDown}
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
      totalItemsCount={total }
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={onChangePage} />
  </div>
  )
}

export default withRouter (UserComment)