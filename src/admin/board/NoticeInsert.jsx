import axios from 'axios'
import React, { useState } from 'react'
import { Card, Form, Row, Button, Col } from 'react-bootstrap'

const NoticeInsert = ({history}) => {
  const [form, setForm] = useState({
    b_user_id: 'eco002',
    b_category: '카테고리',
    b_title: 'test',
    b_content: 'test',
    file: null,
  })
  const { b_user_id, b_title, b_content, b_category, file } = form;
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const onChangeFile = (e) => {
    setForm({
      ...form,
      file: e.target.files[0],
    })
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!window.confirm('등록?')) return;
    const formData = new FormData();
    formData.append("b_user_id", b_user_id);
    formData.append("b_category", b_category);
    formData.append("b_title", b_title);
    formData.append("b_content", b_content);
    formData.append("file", file);
    await axios.post('/board/insertWeb', formData)
    alert('등록!')
    history.push('/admin/board/noticeList');
  }
  return (
    <div>
      <div id="userlist">
        <h1 className='title'>공지사항 등록</h1>
        <Card className='my-3 p-3' style={{ textAlign: 'left' }}>

          <Form onSubmit={onSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label column sm="2">작성자</Form.Label>
              <Col sm="4">
                <Form.Control
                  value={b_user_id}
                  placeholder="id"
                  onChange={onChange}
                  name="b_user_id"
                />
              </Col>

              <Form.Label column sm="2">카테고리</Form.Label>
              <Col sm="4">
                <Form.Control
                  value={b_category}
                  placeholder="category"
                  onChange={onChange}
                  name="b_category"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label column sm="2">제목</Form.Label>
              <Col sm="10">
                <Form.Control
                  value={b_title}
                  placeholder="미션 제목을 입력하세요"
                  onChange={onChange}
                  name="b_title" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label column sm="2">내용</Form.Label>
              <Col sm="10">
                <Form.Control
                  value={b_content}
                  placeholder="미션 내용을 입력하세요"
                  as="textarea"
                  onChange={onChange}
                  name="b_content" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label column sm="2">이미지</Form.Label>
              <Col sm="10">
              <Form.Control type="file" onChange={onChangeFile} name="file" style={{ width: "50%" }} />
              </Col>
            </Form.Group>

            <Button variant="primary" type="submit" style={{ float: 'right', marginLeft: '10px' }}>
              등록하기
            </Button>
            <Button variant="primary" type="submit" style={{ float: 'right', marginLeft: '10px' }}>
              취소
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default NoticeInsert
