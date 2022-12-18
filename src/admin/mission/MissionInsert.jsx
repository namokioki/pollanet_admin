import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Card, Form, Row,Button, Col } from 'react-bootstrap'

const MissionInsert = ({history}) => {
  const writer = sessionStorage.getItem('id');
  const [form, setForm] = useState({
    m_user_id: sessionStorage.getItem('id'),
    m_start_Date: '',
    m_target: '20',
    m_result: '30',
    m_get_point: '20',
    m_sort: 'd',
    m_title: '우유를 먹고 남은 종이팩 재활용 해요',
    m_info: '종이팩만 따로 잘 묶어서 종이류 수거함에 배출하기!',
    m_image: null,
    m_content_image:null,
    m_info_image:null,
  })

const {  m_start_Date, m_last_Date, m_category, m_image,
  m_title, m_info, m_content, m_content_image, m_target, m_result,
  m_get_point, m_user_id, m_sort,m_info_image } = form;

const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

 const onChangeFile = (e) => {
    setForm({
      ...form,
      m_image: e.target.files[0],
      m_content_image: e.target.files[0],
      m_info_image: e.target.files[0]
    })
  }
  const onClick =()=>{
    alert(writer)
  }

const onSubmit = async (e) => {
    e.preventDefault();
    if (!window.confirm('등록하실래요?')) return;
    const formData = new FormData();
    formData.append("m_user_id", writer);
    formData.append("m_start_Date", m_start_Date);
    formData.append("m_title", m_title);
    formData.append("m_info", m_info);
    formData.append("m_image", m_image);
    formData.append("m_content_image", m_content_image);
    formData.append("m_info_image", m_info_image);

    await axios.post('/mission/insert', formData)
    alert('등록!')
    history.push('/admin/mission/listTotal');
  }

  return (
    <div>
      <div id="userlist">
        <h1 className='title'>미션 등록</h1>
        <Card className='my-3 p-3' style={{textAlign : 'left'}}>

          <Form onSubmit={onSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>작성자</Form.Label>
                <Form.Control 
                type="red" 
                value={writer}
                name="m_user_id"
                onChange={onChange}
                placeholder={sessionStorage.getItem('id')}
                readOnly
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>목표인원</Form.Label>
                <Form.Control 
                type="0" 
                placeholder="0" 
                value={m_target}
                name="m_target"
                onChange={onChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>참여인원</Form.Label>
                <Form.Control 
                type="0" 
                placeholder="0" 
                value={m_result}
                name="m_result"
                onChange={onChange}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
             

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>포인트</Form.Label>
                <Form.Control 
                type="0" 
                placeholder="0" 
                value={m_get_point}
                name="m_get_point"
                onChange={onChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>주간/일간</Form.Label>
                <Form.Control 
                type="" 
                placeholder="" 
                value={m_sort}
                name="m_sort"
                onChange={onChange}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>제목</Form.Label>
              <Form.Control 
              placeholder="미션 제목을 입력하세요" 
              value={m_title}
                name="m_title"
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>내용 2</Form.Label>
              <Form.Control 
              placeholder="미션 내용을 입력하세요" 
              type='textarea' 
              value={m_info}
                name="m_info"
                onChange={onChange}
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>배너 이미지</Form.Label>
                <Form.Control 
                type="file"
                onChange={onChangeFile} 
                name="m_image" 
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>모바일 이미지</Form.Label>
                <Form.Control 
                type="file"
                onChange={onChangeFile} 
                name="m_content_image" 
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>정보 이미지</Form.Label>
                <Form.Control 
                type="file"
                onChange={onChangeFile} 
                name="m_info_image" 
                />
              </Form.Group>

            </Row>
            <Button variant="primary" type="submit" style={{float : 'right', marginLeft : '10px'}}>
              등록하기
            </Button>
            <Button variant="primary" type="submit" style={{float : 'right', marginLeft : '10px'}}>
              취소
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default MissionInsert
