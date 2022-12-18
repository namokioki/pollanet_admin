import React, { useEffect, useState } from 'react'
import { Card, Form, Button, Table,Nav, Col, Badge } from 'react-bootstrap';
import axios from 'axios';
import qs from 'qs';
import BoardItem from './BoardItem';
import '../Paging.css';
import Pagination from 'react-js-pagination';
import { withRouter } from 'react-router-dom';

const AddMissionList = ({ location,history }) => {
    const search = qs.parse(location.search, { ignoreQueryPrefix: true })
  const page = !search.page ? 1 : parseInt(search.page)
  const searchWord = !search.word ? '' : search.word;
  const num = 10;
  const [boards, setBoards] = useState([]);
  const [total, setTotal] = useState(0);
  const [chkItems, setChkItems] = useState([]);
  const [word, setWord]= useState(searchWord);

  const callBoard =async()=>{
    const resulte = await axios.get(`/board/list?search=${word}&b_category=3&page=${page}&num=${num}`)
    setBoards(resulte.data.list);
    setTotal(resulte.data.total);
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

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      history.push(`/admin/board/missionlist?search=${e.target.value}&b_category=3&page=${page}&num=${num}`)
    }
    history.push(`/admin/board/missionlist?search=${e.target.value}&b_category=3&page=${page}&num=${num}`)
  }

  const onChangePage = (e) => {
    history.push(`/admin/board/missionlist?search=${word}&b_category=3&page=${e}&num=${num}`);
  }

  useEffect(() => {
    callBoard();
  }, [location,history]);

  if (!boards) return <h1>Loading...</h1>
  return (
    <div id='userlist'>
      <Card className='p-2 my-3' style={{ width: '100%' }}>
        <Form style={{ float: 'left' }}>
          <Button variant="dark" style={{ float: 'left' }}> 삭제</Button>
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
           게시글수  <Badge bg="primary">{total}</Badge>
            <span className="visually-hidden">unread messages</span>
          </Button>
        </Form>
      </Card>
      <Table striped bordered hover>
        <thead>
          <tr >
            <th><input type="checkbox" /></th>
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

export default withRouter (AddMissionList)