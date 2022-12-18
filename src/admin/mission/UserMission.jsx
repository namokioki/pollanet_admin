import React from 'react'
import { Card, Form, Button, Nav, Col, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
const UserMission = ({user_id}) => {
  return (
    <>
      <Card className='p-2 my-3' style={{ width: '100%' }}>
        <Form style={{ float: 'left' }}>
          <Button variant="dark" style={{ float: 'left' }}> 삭제</Button>
          <Form.Group as={Col} controlId="formGridState" style={{ float: 'right' }}>
            <Form.Select defaultValue="카테고리">
              <option>신고순</option>
              <option>이름순</option>
              <option>댓글순</option>
              <option>추천순</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Card>
      <Table>
        <thead>
          <tr >
            <th><input type="checkbox" /></th>
            <th>No.</th>
            <th className='ellipsis'>내용</th>
            <th>작성일</th>
            <th>신고수</th>
            <th>댓글 삭제</th>
          </tr>
        </thead>
        <tbody>
          <tr className="read_move">
            <td><input type="checkbox" /></td>
            <td>1</td>
            <td>제곧내</td>
            <td>22-10-30 23:13:22</td>
            <td>0</td>
            <td><button>댓글 삭제</button></td>
          </tr>
          <tr className="read_move">
            <td><input type="checkbox" /></td>
            <td>1</td>
            <td>제곧내</td>
            <td>22-10-30 23:13:22</td>
            <td>0</td>
            <td><button>댓글 삭제</button></td>
          </tr>
          <tr className="read_move">
            <td><input type="checkbox" /></td>
            <td>1</td>
            <td>제곧내</td>
            <td>22-10-30 23:13:22</td>
            <td>0</td>
            <td><button>댓글 삭제</button></td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

export default withRouter (UserMission)