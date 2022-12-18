import Table from 'react-bootstrap/Table';
import { Card, Form, Button, Nav, Col, Badge } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import qs from 'qs';
import MissionItem from './MissionItem';
import '../Paging.css';
import Pagination from 'react-js-pagination';
import { withRouter } from 'react-router-dom';

const MissionList = ({ location,history }) => {
  const search = qs.parse(location.search, { ignoreQueryPrefix: true })
  const page = !search.page ? 1 : parseInt(search.page)
  const searchWord = !search.word ? '' : search.word;

  const num = 10;
  const [missions, setMissions] = useState();
  const [total, setTotal] = useState(0);
  const [chkItems, setChkItems] = useState([]);
  const [word, setWord]= useState(searchWord);

  const callAPI = async () => {
    const result = await axios.get(`/mission/listTotal?m_keyword=${word}&m_start=${page}&m_number=${num}`);
    setMissions(result.data.list);
    setTotal(result.data.total);
  }

 

  const onAllCheck = (checked) => {
    if (checked) {
      const all = [];
      missions.forEach(missions => all.push(missions.mission_code));
      setChkItems(all);
    } else {
      setChkItems([]);
    }
  }

  const onSingleCheck = (mission_code, checked) => {
    if (checked) {
      setChkItems(chkItems.concat(mission_code));
    } else {
      setChkItems(chkItems.filter(item => item !== mission_code));
    }
  }

  const onClickDel = () => {
    if (chkItems.length === 0) {
      alert('삭제할 미션을 선택하세요')
      return;
    }
    if (!window.confirm(`${chkItems.length}개의 미션을 삭제하시겠습니까?`)) return;
    chkItems.forEach(async (chkItem) => {
      console.log(chkItem)
      const missionDel = { mission_code: chkItem }
      await axios.post(`/mission/delete/${chkItem}`, missionDel)
    })
    setChkItems([]);
    callAPI();
    history.push(`/admin/mission/listTotal?m_keyword=${word}&m_start=${page}&m_number=${num}`);
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      history.push(`/admin/mission/listTotal?m_keyword=${e.target.value}&page=${page}&num=${num}`)
    }
    history.push(`/admin/mission/listTotal?m_keyword=${e.target.value}&page=${page}&num=${num}`)
  }

  const onChangePage = (e) => {
    history.push(`/admin/mission/listTotal?m_keyword=${word}&m_start=${e}&m_number=${num}`);
  }

  useEffect(() => {
    callAPI();
  }, [location,history]);

  if (!missions) return <h1>Loading...</h1>
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
            미션수 <Badge bg="primary">{total}</Badge>
            <span className="visually-hidden">messages</span>
          </Button>
        </Form>
      </Card>
      <Table striped bordered hover>
        <thead>
          <tr >
            <th>

          <input type="checkbox"
                checked={chkItems.length === missions.length ? true : false}
                onChange={(e) => onAllCheck(e.target.checked)} />
            </th>
            <th>No.</th>
            <th>카테고리</th>
            <th>주간/일간</th>
            <th>제목</th>
            <th>목표인원</th>
            <th>참여인원</th>
            <th>포인트</th>
            <th>미션상세정보</th>
          </tr>
        </thead>
        <tbody>
          {missions.map(mission =>
            <MissionItem key={mission.mission_code} mission={mission} chkItems={chkItems} onSingleCheck={onSingleCheck} />
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

export default withRouter (MissionList)
