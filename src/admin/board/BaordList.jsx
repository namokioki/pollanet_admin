import React, { useEffect, useState } from 'react'
import { Card, Form, Button, Table, Nav, Col, Badge } from 'react-bootstrap';
import axios from 'axios';
import qs from 'qs';
import BoardItem from './BoardItem';
import { withRouter } from 'react-router-dom';
import '../Paging.css';
import Pagination from 'react-js-pagination';

const BaordList = ({ location,history }) => {
  const search = qs.parse(location.search, { ignoreQueryPrefix: true })
  const page = !search.page ? 1 : parseInt(search.page)
  const searchWord = !search.word ? '' : search.word;
  const num = 10;
  const [boards, setBoards] = useState([]);
  const [total, setTotal] = useState(0);
  const [chkItems, setChkItems] = useState([]);
  const [word, setWord]= useState(searchWord);
  
  const callBoard = async () => {
    const result = await axios.get(`/board/list?search=${word}&b_category=1&page=${page}&num=${num}`)
    setBoards(result.data.list);
    setTotal(result.data.total);
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
      alert('삭제할 게시글을 선택하세요')
      return;
    }
    if (!window.confirm(`${chkItems.length}개의 게시글을 삭제하시겠습니까?`)) return;
    chkItems.forEach(async (chkItem) => {
      console.log(chkItem)
      const boardDel = { board_code: chkItem }
      await axios.post(`/board/delete/${chkItem}`, boardDel)
    })
    setChkItems([]);
    callBoard();
    history.push(`/admin/board/list?search=${word}&b_category=1&page=${page}&num=${num}`);
  }

  const onClickReport = () => {
    if (chkItems.length === 0) {
      alert('신고할 게시글을 선택하세요')
      return;
    }
    if (!window.confirm(`${chkItems.length}개의 게시글을 신고하시겠습니까?`)) return;
    chkItems.forEach(async (chkItem) => {
      console.log(chkItem)
      const boardReport = { board_code: chkItem }
      await axios.post(`/board/report/${chkItem}`, boardReport)
    })
    setChkItems([]);
    callBoard();
    history.push(`/admin/board/list?search=${word}&b_category=1&page=${page}&num=${num}`);
  }
  

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      history.push(`/admin/board/list?search=${e.target.value}&b_category=1&page=${page}&num=${num}`)
    }
  }

  const onChangePage = (e) => {
    history.push(`/admin/board/list?search=${word}&b_category=1&page=${e}&num=${num}`);
  }

  useEffect(() => {
    callBoard();
  }, [location,history]);

  if (!boards) return <h1>Loading...</h1>
  return (
    <div id='userlist'>
      <Card className='p-2 my-3' style={{ width: '100%' }}>
        <Form style={{ float: 'left' }}>
          <Button variant="dark" style={{ float: 'left' }} onClick={onClickDel}> 삭제</Button>
          <Button variant="dark" style={{ float: 'left' }} onClick={onClickReport}> 신고</Button>
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
        totalItemsCount={total }
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={onChangePage} />
    </div>
  )
}

export default withRouter(BaordList)