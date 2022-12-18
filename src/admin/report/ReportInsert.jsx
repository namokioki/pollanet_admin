import React, { useEffect, useState } from 'react'
import { Card, Form, Button, Table, Nav, Col, Badge } from 'react-bootstrap';
import axios from 'axios';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import '../Paging.css';
import Pagination from 'react-js-pagination';
import ReportInsertItem from './ReportInsertItem';

const ReportInsert = ({ location,history }) => {
 
    const search = qs.parse(location.search, { ignoreQueryPrefix: true })
    const page = !search.page ? 1 : parseInt(search.page)
    const num = 10;
    const [boards, setBoards] = useState([]);
    const [total, setTotal] = useState(0);
    const [chkItems, setChkItems] = useState([]);
  
    
    const callBoard = async () => {
      const result = await axios.get(`/board/reportlist?page=${page}&num=${num}`)
      setBoards(result.data.list);
      setTotal(result.data.total);
      console.log(boards);
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
      history.push(`/admin/report/insert?page=${page}&num=${num}`);
    }
  
    
  
    const onKeyDown = (e) => {
      if (e.keyCode === 13) {
        history.push(`/admin/report/insert?page=${page}&num=${num}`)
      }
    }
  
    const onChangePage = (e) => {
      history.push(`/admin/report/insert?page=${e}&num=${num}`);
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
            <Form.Group as={Col} controlId="formGridState" style={{ float: 'right' }}>
            </Form.Group>
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
              <ReportInsertItem key={board.board_code} board={board} chkItems={chkItems} onSingleCheck={onSingleCheck} />
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

export default withRouter (ReportInsert)