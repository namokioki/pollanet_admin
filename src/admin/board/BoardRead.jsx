import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Card, Form, Row, Button, Col } from 'react-bootstrap'
import BoardCommentItem from './BoardCommentItem';

const BoardRead = ({ match,history }) => {
  const board_code=match.params.board_code;
  const [board, setBoard]= useState('');
  const [comments, setComments]= useState([]);

  const callRead = async ()=>{
    const result = await axios.get(`/board/read/${board_code}`)
    setBoard(result.data);
  }

  const callComment =async ()=> {
    const result = await axios.get(`/comment/list/${board_code}`)
    setComments(result.data);
  }
  const onClickDelete = async ()=>{
    if(!window.confirm('게시글을 삭제하시겠습니까?')) return;
    await axios.post(`/board/delete/${board_code}`);
    alert('삭제되었습니다.')
    history.go(-1)
  }
    useEffect(() => {
      callRead();
      callComment();
  }, []);
  if(!board) return <h1>데이터를 불러오는 중입니다!</h1>
  return (
    <div>
      <div id="userlist">
        <h1 className='title'></h1>
        <Card className='my-3 p-3' style={{ textAlign: 'left' }}>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label column sm="2">작성자</Form.Label>
              <Col sm="4">
                <Form.Control
                  value={board.b_user_id}
                  placeholder="id"
                  name="b_user_id"
                />
              </Col>

              <Form.Label column sm="2">카테고리</Form.Label>
              <Col sm="4">
                <Form.Control
                  value={board.b_category}
                  placeholder="category"
                  name="b_category"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label column sm="2">제목</Form.Label>
              <Col sm="10">
                <Form.Control
                  value={board.b_title}
                  placeholder="미션 제목을 입력하세요"
                  name="b_title" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label column sm="2">내용</Form.Label>
              <Col sm="10">
                <Form.Control
                  value={board.b_content}
                  placeholder="미션 내용을 입력하세요"
                  as="textarea"
                  name="b_content"
                  style={{height:"300px"}}/>
              </Col>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={onClickDelete} style={{ float: 'right', marginLeft: '10px' }}>
              삭제하기
            </Button>
            <Button variant="primary" type="submit" style={{ float: 'right', marginLeft: '10px' }}>
              취소
            </Button>
          </Form>
        </Card>
        <div>
          <Card className='my-3 p-3'>
            댓글 수 : 
          </Card>
          <div>
            {comments.length === 0 ?
            <Card className='my-3 p-3'>작성된 댓글이 없습니다.</Card>
            :
            comments.map(comment=>
            <BoardCommentItem key={comment.comment_code} comment={comment}/>  
            )}
          </div>
        </div>
      </div>
    </div>

  )
}

export default BoardRead